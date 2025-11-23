<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'template',
        'content',
        'metadata',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'metadata' => 'json',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
