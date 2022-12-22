<?php

namespace App\Http\Requests;

use App\Enums\PaymentTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
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
        /*         if ($this->customer['payment_type'] == "VISA")
            $payment_reference = 'digits:16';
        elseif ($this->customer['payment_type'] == "MBWAY")
            $payment_reference = 'digits:9';
        else
            $payment_reference = 'email'; */

        return [
            'email' => ['required', 'email'],
            'name' => ['required'],
            'photo_url' => ['nullable'],
            'type' => ['required'],
            'password' => ['sometimes'],
            'customer.phone' => ['required', 'digits:9'],
            'customer.nif' => ['required', 'digits:9'],
            'customer.default_payment_type' => ['required', 'string', 'in:VISA,PAYPAL,MBWAY'],
            'customer.default_payment_reference' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email necessário.',
            'name.required' => 'Nome necessário.',
            'customer.nif.required' => 'NIF necessário.',
            'customer.phone.digits' => 'Numero de telefone tem de ter 9 dígitos.',
            'customer.phone.required' => 'Numero de telefone necessário.',
            'customer.default_payment_type.required' => 'Tipo pagamento perferencial.',
            'customer.default_payment_reference.required' => 'Referencia pagamento perferencial.',
        ];
    }
}
