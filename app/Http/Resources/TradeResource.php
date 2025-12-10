<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'buy_order_id' => $this->buy_order_id,
            'sell_order_id' => $this->sell_order_id,
            'buyer_id' => $this->buyer_id,
            'seller_id' => $this->seller_id,
            'symbol' => $this->symbol,
            'price' => $this->price,
            'amount' => $this->amount,
            'commission' => $this->commission,
            'total' => bcmul($this->price, $this->amount, 2),
            'buyer' => new UserResource($this->whenLoaded('buyer')),
            'seller' => new UserResource($this->whenLoaded('seller')),
            'buy_order' => new OrderResource($this->whenLoaded('buyOrder')),
            'sell_order' => new OrderResource($this->whenLoaded('sellOrder')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
