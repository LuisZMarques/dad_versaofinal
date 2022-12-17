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
    }


    public function store(StoreOrderRequest $request)
    {
        
        $order = $this->orderService->store($request->validated());
        
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
        return $request->all();
    }
}
