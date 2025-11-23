<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'slug',
        'qty_unit',
        'stock',
        'is_stock_tracked',
        'name',
        'price',
        'description',
        'product_category_id',
        'metadata',
        'preview_image',
        'is_active',
    ];

    protected $casts = [
        'stock' => 'integer',
        'is_stock_tracked' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'metadata' => 'json',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }
}
