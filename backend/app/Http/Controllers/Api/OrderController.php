<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{

    public function __construct(private OrderService $orderService)
    {
    }

    public function index()
    {
        return OrderResource::collection(Order::all());
    }

    public function getOrdersPreparingOrReady()
    {
        return OrderResource::collection(Order::with("products")->whereNotIn("status", ["D", "C"])->get());
        //Preparing : P
        //Ready :     R
        //Delivered:  D
        //Cancelled:  C
    }

    public function getLastOrder()
    {
        return Order::with("products")->whereNotIn("status", ["D", "C"])->orderBy('id', 'desc')->first();
    }

    public function getOrdersByCustomer(User $user)
    {
        return OrderResource::collection(Order::with("products")->where("customer_id", $user->customer->id)->get());
    }

    public function deliveryHistory()
    {
        return OrderResource::collection(Order::with("products")->where("status", ["D"])->orderBy('id', 'desc')->get());
    }


    public function store(StoreOrderRequest $request)
    {

        $lastOrder = $this->getLastOrder();

        if ($lastOrder == null || $lastOrder->ticket_number == 99)
            $ticketNumber = 1;
        else
            $ticketNumber = $lastOrder->ticket_number + 1;

        $data =  [
            "type" => strtolower($request->validated("payment_type")),
            'reference' => $request->validated("payment_reference"),
            'value' => $request->validated("total_price")
        ];

        $response = $this->payments($data);

        $order = null;
        if ($response["status"] == "valid") {

            if ($request->validated("customer_id") != null) {
                $customer = Customer::find($request->validated("customer_id"));

                $order = $customer->orders()->create([
                    "ticket_number" =>  $ticketNumber,
                    "status" => $request->validated("status"),
                    "customer_id" => $request->validated("customer_id"),
                    "total_price" => $request->validated("total_price"),
                    "total_paid" => $response["value"],
                    "total_paid_with_points" => $request->validated("total_paid_with_points"),
                    "points_gained" => $request->validated("points_gained"),
                    "points_used_to_pay" => $request->validated("points_used_to_pay"),
                    "payment_type" => $request->validated("payment_type"),
                    "payment_reference" => $request->validated("payment_reference"),
                    "date" => $request->validated("date")
                ]);
            } else {
                $order = new Order();
                $order->ticket_number =  $ticketNumber;
                $order->status = $request->validated("status");
                $order->customer_id = $request->validated("customer_id");
                $order->total_price =  $request->validated("total_price");
                $order->total_paid = $response["value"];
                $order->total_paid_with_points = $request->validated("total_paid_with_points");
                $order->points_gained = $request->validated("points_gained");
                $order->points_used_to_pay = $request->validated("points_used_to_pay");
                $order->payment_type = $request->validated("payment_type");
                $order->payment_reference = $request->validated("payment_reference");
                $order->date = $request->validated("date");

                $order->save();
            }


            if ($order) {
                foreach ($request->products as $key => $product) {
                    $order->products()->attach(
                        $product['product_id'],
                        [
                            "order_local_number" => $key,
                            "status" => $product['status'],
                            "notes" => $product['notes'],
                            "price" => $product['price']
                        ]
                    );
                }
            }
            return new OrderResource($order);
        } else {

            return response()->json([
                'message' => $response["message"],
                'order' => [],
                'status' => 422
            ], 422);
        }
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Request $request, Order $order)
    {
        //$order = $this->orderService->update($request->validated(), $order);

        return $request->all();
    }

    public function updateEstadoDaOrder(Request $request, Order $order)
    {
        if ($order->status == "C") {
            $data =  [
                "type" => strtolower($order->payment_type),
                'reference' => $order->payment_reference,
                'value' => 1.00 * $order->total_price
            ];

            $response = Http::post('https://dad-202223-payments-api.vercel.app/api/refunds', $data);

            if ($response["status"] != "valid") {
                return response()->json([
                    'message' => $response["message"],
                    'order' => [],
                    'status' => 422
                ], 422);
            }
        }

        foreach ($order->products as $key => $product) {
            $order->products()
                ->wherePivot('product_id', $product->product_id)
                ->updateExistingPivot($product->product_id, ["status" => $product->pivot->status], false);
        }

        $order->status = $request->status;
        $order->save();

        return new OrderResource($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response(null, 204);
    }

    public function payments($data)
    {
        $response = Http::post('https://dad-202223-payments-api.vercel.app/api/payments', $data);

        return $response;
    }
}
