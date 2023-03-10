<?php

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Models\Order;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('users/me', [UserController::class, 'show_me']);

    Route::delete('users/{user}', [UserController::class, "destroy"]);
    Route::patch('users/blockUser/{user}', [UserController::class, 'blockUser']);
    Route::apiResource('users', UserController::class, ['names' => 'users']);

    Route::get('customers/me/{customer}', [CustomerController::class, 'show_me']);

    Route::get('orders/ordersByCustomer/{user}', [OrderController::class, 'getOrdersByCustomer']);
    Route::get('orders/delivered', [OrderController::class, 'deliveryHistory']);

    Route::delete('products/{product}', [ProductController::class, "destroy"]);
});

Route::apiResource('products', ProductController::class, ['names' => 'products']);

Route::apiResource('customers', CustomerController::class, ['names' => 'customers']);
Route::post('users', [UserController::class, 'store']);


Route::get("orders/preparingOrReady", [OrderController::class, "getOrdersPreparingOrReady"]);
Route::patch('orders/{order}/updateEstadoDaOrder', [OrderController::class, "updateEstadoDaOrder"]);
Route::patch('orders/{order}/updateEstadoDosProdutos', [OrderController::class, "updateEstadoDosProdutos"]);
Route::apiResource('orders', OrderController::class, ['names' => 'orders']);
Route::post("orders/payments", [OrderController::class, "payments"]);
