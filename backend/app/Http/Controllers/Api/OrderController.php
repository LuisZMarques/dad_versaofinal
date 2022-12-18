<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Product;
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
        return OrderResource::collection(Order::with("products")->whereNotIn("status",["D","C"])->get());
        //Preparing : P
        //Ready :     R
        //Delivered:  D
        //Cancelled:  C
    }

    public function getLastOrder(){
        return Order::orderBy('id','desc')->first();
    }


    public function store(Request $request)
    {

        $order= new Order();

       $order->ticket_number = $request->ticket_number;
       $order->status = $request->status;
       $order->customer_id = $request->customer_id;
       $order->total_price = $request->total_price;
       $order->total_paid = $request->total_paid;
       $order->total_paid_with_points = $request->total_paid_with_points;
       $order->points_gained = $request->points_gained;
       $order->points_used_to_pay = $request->points_used_to_pay;
       $order->payment_type = $request->payment_type;
       $order->payment_reference = $request->payment_reference;
       $order->date = $request->date;

       $order->save();

       


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

    public function payments(Request $request)
    {      

        $response = Http::post('https://dad-202223-payments-api.vercel.app/api/payments', [
            "type" => strtolower($request->type),
            'reference' => $request->reference,
            'value' => $request->value
        ]);
        return $response;
    }
}
