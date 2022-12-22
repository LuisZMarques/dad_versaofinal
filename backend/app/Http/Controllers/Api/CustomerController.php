<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    public function index()
    {
        return CustomerResource::collection(Customer::all());
    }

    public function store(StoreCustomerRequest $request)
    {

        $imageName = null;

        if ($request->photo_url) {
            $image_64 = $request->photo_url;

            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


            $image = str_replace($replace, '', $image_64);

            $image = str_replace(' ', '+', $image);

            $imageName = Str::random(10) . '.' . $extension;

            Storage::disk('public')->put('/fotos/' . $imageName, base64_decode($image));
        }

        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => bcrypt($request->validated('password')),
            'type' => $request->validated('type'),
            'blocked' => 0,
            'photo_url' => $imageName,
        ]);

        $user->customer()->create([
            'phone' => $request->validated('customer.phone'),
            'points' => 0,
            'nif' => $request->validated('customer.nif'),
            'default_payment_type' => $request->validated('customer.default_payment_type'),
            'default_payment_reference' => $request->validated('customer.default_payment_reference')
        ]);

        return new UserResource($user);
    }

    public function show(Customer $customer)
    {
        return new CustomerResource($customer->load('orders'));
    }

    /*public function getCustomer(Integer $id){
        return new Customer::where('user_id', $id);
    }*/

    public function show_me(Customer $customer)
    {
        return new CustomerResource($customer);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //$this->authorize('update', Customer::class);

        $customer->update([
            'phone' => $request->validated('customer.phone'),
            'nif' => $request->validated('customer.nif'),
            'default_payment_type' => $request->validated('customer.default_payment_type'),
            'default_payment_reference' => $request->validated('customer.default_payment_reference')
        ]);

        $customer->user()->update([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'type' => $request->validated('type'),
            'blocked' => $request->validated('blocked'),
        ]);

        if ($request->validated('password')) {

            $customer->user->password = bcrypt($request->validated('password'));

            $customer->user->save();
        }

        $imageName = null;

        if ($request->photo_url) {
            $image_64 = $request->photo_url;

            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


            $image = str_replace($replace, '', $image_64);

            $image = str_replace(' ', '+', $image);

            $imageName = Str::random(10) . '.' . $extension;

            Storage::disk('public')->put('/fotos/' . $imageName, base64_decode($image));

            $customer->user->photo_url = $imageName;

            $customer->user->save();
        }

        return new UserResource($customer->user);
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('delete', Customer::class);

        $customer->delete();

        return response(null, 204);
    }
}
