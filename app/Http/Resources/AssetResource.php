<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
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
            'amount' => $this->amount,
            'locked_amount' => $this->locked_amount,
            'total' => bcadd($this->amount, $this->locked_amount, 8),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
