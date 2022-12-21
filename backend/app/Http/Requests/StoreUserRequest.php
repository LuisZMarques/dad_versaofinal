<?php

namespace App\Http\Requests;

use App\Enums\UserTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => [
                'required', 'string', 'max:255',
                Password::min(4)
                    ->mixedCase()
                    ->numbers()
            ],
            'type' => 'required|in:EM,EC,ED,C',
            'blocked' => 'required|integer|digits:1',
            'photo_url' => 'nullable|string',
            'custom' => 'nullable|json',
        ];
    }
}
