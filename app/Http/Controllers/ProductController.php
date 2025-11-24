<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filters and pagination.
     */
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)->with('category');

        // Search filter
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('product_category_id', $request->category);
        }

        // Get paginated products
        $products = $query->orderBy('name')
            ->paginate(12)
            ->through(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'description' => $product->description,
                    'image' => $product->preview_image ?? null,
                    'category' => $product->category ? [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                        'slug' => $product->category->slug,
                    ] : null,
                ];
            });

        // Get all categories for filter
        $categories = ProductCategory::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Product/Page', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search ?? '',
                'category' => $request->category ?? '',
            ],
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show($slug)
    {
        // Find product by slug with its category relationship
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with('category')
            ->firstOrFail();

        // Transform product data
        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'price' => $product->price,
            'description' => $product->description,
            'category' => $product->category ? $product->category->name : 'Uncategorized',
            'categorySlug' => $product->category ? $product->category->slug : null,
            'image' => $product->preview_image ?? null,
            'images' => $product->metadata['images'] ?? [],
            'specifications' => $this->parseSpecifications($product->metadata['specifications'] ?? []),
            'features' => $product->metadata['features'] ?? [],
        ];


        // Get related products from the same category
        $relatedProducts = [];
        if ($product->category) {
            $relatedProducts = Product::where('product_category_id', $product->category->id)
                ->where('is_active', true)
                ->where('id', '!=', $product->id)
                ->take(4)
                ->get()
                ->map(function ($relatedProduct) {
                    return [
                        'id' => $relatedProduct->id,
                        'slug' => $relatedProduct->slug,
                        'name' => $relatedProduct->name,
                        'price' => $relatedProduct->price,
                        'image' => $relatedProduct->metadata['image'] ?? null,
                        'category' => $relatedProduct->category ? $relatedProduct->category->name : 'Uncategorized',
                    ];
                })
                ->toArray();
        }

        return Inertia::render('Product/Detail', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Parse specifications from metadata or description
     */
    private function parseSpecifications($specifications)
    {
        if (is_array($specifications)) {
            // Convert associative array to label-value format
            $specs = [];
            foreach ($specifications as $key => $value) {
                $specs[] = [
                    'label' => ucfirst(preg_replace('/([A-Z])/', ' $1', $key)), // Convert camelCase to Title Case
                    'value' => $value,
                ];
            }
            return $specs;
        }

        // If specifications is a string (HTML description), parse it
        if (is_string($specifications)) {
            $specs = [];
            
            // Try to extract bullet points from HTML
            if (preg_match_all('/<li><strong>(.*?)<\/strong>:\s*(.*?)<\/li>/s', $specifications, $matches)) {
                for ($i = 0; $i < count($matches[1]); $i++) {
                    $specs[] = [
                        'label' => strip_tags($matches[1][$i]),
                        'value' => strip_tags($matches[2][$i]),
                    ];
                }
            }
            
            return $specs;
        }

        return [];
    }
}
