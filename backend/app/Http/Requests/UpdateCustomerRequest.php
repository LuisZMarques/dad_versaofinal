<?php

namespace App\Http\Requests;

use App\Enums\PaymentTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateCustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email'],
            'name' => ['required'],
            'photo_url' => ['nullable'],
            'type' => ['required'],
            'blocked' => ['required'],
            'password' => ['sometimes'],
            'customer.phone' => ['required', 'digits:9'],
            'customer.nif' => ['required', 'digits:9'],
            'customer.default_payment_type' => ['required', 'string', 'in:VISA,PAYPAL,MBWAY'],
            'customer.default_payment_reference' => ['required'],
        ];
    }
}
