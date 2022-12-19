<?php

namespace App\Http\Requests;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentTypeEnum;
use App\Enums\ProductStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class StoreOrderRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if ($this->payment_type == "VISA")
            $payment_reference = 'digits:16';
        elseif ($this->payment_type == "MBWAY")
            $payment_reference = 'digits:9';
        else
            $payment_reference = 'email';



        return [
            'status' => ['required'],
            'customer_id' => ['nullable', 'numeric', 'exists:customers,id'],
            'total_price' => ['required', 'numeric'],
            //'total_paid' => ['required', 'numeric'],
            'total_paid_with_points' => ['required', 'numeric'],
            'points_gained' => ['required', 'numeric'],
            'points_used_to_pay' => ['required', 'numeric'],
            'payment_type' => ['required'],
            'payment_reference' => ['required',  $payment_reference],
            'date' => ['required', 'after_or_equal:today()'],
            'custom' => ['nullable', 'json'],
            'delivered_by' => ['required_if:status,D', 'exists:users,id'],
            'products' => ['required', 'array'],
            'products.*.order_local_number' => ['required'],
            'products.*.product_id' => ['required', 'numeric', 'exists:products,id'],
            'products.*.status' => ['required'],
            'products.*.price' => ['required', 'numeric'],
            'products.*.preparation_by' => ['required_if:products.*.status, ', ' exists:users,id'],
            'products.*.notes' => ['nullable'],
            'products.*.custom' => ['nullable', 'json']
        ];
    }
}
