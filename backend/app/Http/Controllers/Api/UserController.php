<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function index()
    {
        return UserResource::collection(User::with("customer")->get());
    }

    public function store(StoreUserRequest $request)
    {
        $image_64 = $request->photo_url;
        if ($image_64 != null) {
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


            $image = str_replace($replace, '', $image_64);

            $image = str_replace(' ', '+', $image);

            $imageName = Str::random(10) . '.' . $extension;

            Storage::disk('public')->put('/fotos/' . $imageName, base64_decode($image));
        } else {
            $imageName = $image_64;
        }
        $request->photo_url = $imageName;

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->validated()['password']);
        $user->type = $request->type;
        $user->blocked = $request->blocked;
        $user->photo_url = $imageName;

        $user->save();

        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        $image_64 = $request->photo_url;
        if ($image_64 != null) {
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


            $image = str_replace($replace, '', $image_64);

            $image = str_replace(' ', '+', $image);

            $imageName = Str::random(10) . '.' . $extension;

            Storage::disk('public')->put('/fotos/' . $imageName, base64_decode($image));

            $user->photo_url = $imageName;

            $user->save();
        }


        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        if ($user->type == "C") {
            $user->customer()->delete();
        }
        $user->delete();

        return new UserResource($user);
    }

    public function blockUser(User $user)
    {
        $user->blocked = !$user->blocked;
        $user->save();
         
        return new UserResource($user);
    }

    public function show_me(Request $request)
    {
        $user = User::findOrFail($request->user()->id);

        return new UserResource($user);
    }
}
