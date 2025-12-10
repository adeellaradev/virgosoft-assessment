<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'symbol' => $this->symbol,
            'side' => $this->side,
            'price' => $this->price,
            'amount' => $this->amount,
            'status' => $this->status,
            'status_text' => $this->getStatusText(),
            'total' => bcmul($this->price, $this->amount, 2),
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function getStatusText(): string
    {
        return match($this->status) {
            1 => 'open',
            2 => 'filled',
            3 => 'cancelled',
            default => 'unknown',
        };
    }
}
