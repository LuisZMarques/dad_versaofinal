<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    public function store(Request $request)
    {
        //$this->authorize('create', Product::class);

        $image_64 = $request->photo_url;
        if($image_64 != null){
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


        $image = str_replace($replace, '', $image_64);

        $image = str_replace(' ', '+', $image);

        $imageName = Str::random(10) . '.' . $extension;

        Storage::disk('public')->put('/products/' . $imageName, base64_decode($image));

        $request->photo_url = $imageName;
        }
        $product = new Product();

        $product->name = $request->name;
        $product->type = $request->type;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->photo_url = $imageName;

        $product->save();

        return new ProductResource($product);
    }

    public function show(Product $product)
    {

        return new ProductResource($product->load('orders'));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        //$this->authorize('update', Product::class);

        //dd($request->all());

        $product->update($request->except("photo_url"));

        if ($request->photo_url) {
            $image_64 = $request->photo_url;

            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);


            $image = str_replace($replace, '', $image_64);

            $image = str_replace(' ', '+', $image);

            $imageName = Str::random(10) . '.' . $extension;

            Storage::disk('public')->put('/products/' . $imageName, base64_decode($image));

            $product->photo_url =  $imageName;

            $product->save();
        }

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', Product::class);

        $product->delete();

        return response(null, 204);
    }
}
