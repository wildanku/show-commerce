<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\ProductCategory;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Fetch sections from database
        $aboutUsSection = Section::where('slug', 'about-us')->first();
        $visionMissionSection = Section::where('slug', 'vision-mission')->first();
        $whyChooseUsSection = Section::where('slug', 'why-choose-us')->first();
        
        // Fetch product categories with limit for homepage
        $categories = ProductCategory::take(5)->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'image' => $category->metadata['image'] ?? $category->image ?? null,
            ];
        });
        
        // Fetch featured products (latest 6 products)
        $featuredProducts = Product::where('is_active', true)
            ->with('category')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'price' => $product->price,
                    'image' => $product->preview_image ?? null,
                    'category' => $product->category ? [
                        'name' => $product->category->name,
                        'slug' => $product->category->slug,
                    ] : null,
                ];
            });
            
        return Inertia::render('Home/Page', [
            'sections' => [
                'aboutUs' => $aboutUsSection ? json_decode($aboutUsSection->content, true) : null,
                'visionMission' => $visionMissionSection ? json_decode($visionMissionSection->content, true) : null,
                'whyChooseUs' => $whyChooseUsSection ? json_decode($whyChooseUsSection->content, true) : null,
            ],
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
