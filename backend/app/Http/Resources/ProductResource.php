<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'type'=>$this->type,
            'photo_url'=>$this->photo_url,
            'description'=>$this->description,
            'price'=>$this->price,
            'custom'=>$this->custom,
            'orders'=>OrderResource::collection($this->whenLoaded('orders'))
        ];
    }
}
