<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
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


    public function store(Request $request)
    {

        $lastOrder = $this->getLastOrder();

        if ($lastOrder == null || $lastOrder->id == 99)
            $ticketNumber = 1;
        else
            $ticketNumber = $lastOrder->id;

        $data =  [
            "type" => strtolower($request->payment_type),
            'reference' => $request->payment_reference,
            'value' => $request->total_price
        ];

        $response = $this->payments($data);

        $order = null;
        if ($response["status"] == "valid") {

            if ($request->customer_id != null) {
                $user = User::find($request->customer_id);

                $order = $user->customer->orders()->create([
                    "ticket_number" =>  $ticketNumber,
                    "status" => $request->status,
                    "customer_id" => $request->customer_id,
                    "total_price" => $request->total_price,
                    "total_paid" => $response["value"],
                    "total_paid_with_points" => $request->total_paid_with_points,
                    "points_gained" => $request->points_gained,
                    "points_used_to_pay" => $request->points_used_to_pay,
                    "payment_type" => $request->payment_type,
                    "payment_reference" => $request->payment_reference,
                    "date" => $request->date
                ]);
            } else {
                $order = new Order();
                $order->ticket_number =  $ticketNumber;
                $order->status = $request->status;
                $order->customer_id = $request->customer_id;
                $order->total_price = $request->total_price;
                $order->total_paid = $response["value"];
                $order->total_paid_with_points = $request->total_paid_with_points;
                $order->points_gained = $request->points_gained;
                $order->points_used_to_pay = $request->points_used_to_pay;
                $order->payment_type = $request->payment_type;
                $order->payment_reference = $request->payment_reference;
                $order->date = $request->date;

                $order->save();
            }
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
        $order->status = $request->status;

        $order->save();

        return $order;
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
