<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductCategory;
use App\Models\Product;

class ProductCategoryController extends Controller
{
    /**
     * Display the product category page
     */
    public function show($slug)
    {
        // Find the category by slug
        $category = ProductCategory::where('slug', $slug)->firstOrFail();

        // Get products for this category
        $products = Product::where('product_category_id', $category->id)
            ->where('is_active', true)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'price' => $product->price,
                    'image' => $product->metadata['image'] ?? null,
                ];
            });

        // Transform category data
        $categoryData = [
            'title' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'image' => $category->image ?? null,
            'sections' => $this->transformSections($category->metadata ?? []),
            'created_at' => $category->created_at->toISOString(),
            'updated_at' => $category->updated_at->toISOString(),
        ];
        // return response()->json($category->metadata);
        return Inertia::render('ProductCategory/Page', [
            'category' => $categoryData,
            'products' => $products,
        ]);
    }

    /**
     * Transform metadata sections to match the frontend structure
     */
    private function transformSections($sections)
    {
        $transformed = [];

        foreach ($sections as $section) {
            // Skip if type is not section or gallery
            if (!isset($section['type']) || !in_array($section['type'], ['section', 'gallery'])) {
                continue;
            }

            $transformed[] = [
                'type' => $section['type'],
                'title' => $section['title'] ?? '',
                'subtitle' => $section['subtitle'] ?? '',
                'items' => collect($section['items'] ?? [])->map(function ($item) {
                    return [
                        'title' => $item['title'] ?? $item['name'] ?? '',
                        'description' => $item['description'] ?? '',
                        'image' => $item['image'] ?? null,
                    ];
                })->toArray(),
            ];
        }

        return $transformed;
    }
}
