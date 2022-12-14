<?php

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\Api\UserController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::apiResource('users', UserController::class, ['names' => 'users']);
Route::apiResource('products', ProductController::class, ['names' => 'products']);

Route::apiResource('customers', CustomerController::class, ['names' => 'customers']);

Route::get("orders/preparingOrReady", [OrderController::class, "getOrdersPreparingOrReady"]);
Route::apiResource('orders', OrderController::class, ['names' => 'orders']);