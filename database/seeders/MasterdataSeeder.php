<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\Section;
use Illuminate\Support\Facades\File;

class MasterdataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Product Categories
        $this->seedProductCategories();
        
        // Seed Products (after categories to get IDs)
        $this->seedProducts();
        
        // Seed Sections
        $this->seedSections();
    }

    /**
     * Seed product categories from JSON file
     */
    private function seedProductCategories(): void
    {
        $jsonPath = database_path('factories/product-categories.json');
        
        if (!File::exists($jsonPath)) {
            $this->command->error("Product categories JSON file not found at: {$jsonPath}");
            return;
        }

        $categories = json_decode(File::get($jsonPath), true);

        foreach ($categories as $category) {
            ProductCategory::create([
                'name'          => $category['name'],
                'image'         => $category['image'] ?? null,
                'slug'          => $category['slug'],
                'description'   => $category['description'],
                'metadata'      => $category['metadata'] ?? null,
            ]);
        }

        $this->command->info('Product categories seeded successfully!');
    }

    /**
     * Seed products from JSON file with category relationships
     */
    private function seedProducts(): void
    {
        $jsonPath = database_path('factories/products.json');
        
        if (!File::exists($jsonPath)) {
            $this->command->error("Products JSON file not found at: {$jsonPath}");
            return;
        }

        $products = json_decode(File::get($jsonPath), true);

        foreach ($products as $product) {
            // Skip empty objects
            if (empty($product) || !isset($product['name'])) {
                continue;
            }

            // Find category ID by name from metadata
            $categoryId = null;
            if (isset($product['metadata']['category'])) {
                $category = ProductCategory::where('name', $product['metadata']['category'])->first();
                $categoryId = $category?->id;
            }

            Product::create([
                'sku' => $product['sku'],
                'slug' => $product['slug'],
                'name' => $product['name'],
                'preview_image' => $product['preview_image'] ?? null,
                'description' => $product['description'],
                'price' => $product['price'],
                'product_category_id' => $categoryId,
                'metadata' => $product['metadata'] ?? null,
                'is_active' => true,
                'qty_unit' => 'pcs',
                'stock' => 0,
                'is_stock_tracked' => false,
            ]);
        }

        $this->command->info('Products seeded successfully!');
    }

    /**
     * Seed sections from JSON file
     */
    private function seedSections(): void
    {
        $jsonPath = database_path('factories/sections.json');
        
        if (!File::exists($jsonPath)) {
            $this->command->error("Sections JSON file not found at: {$jsonPath}");
            return;
        }

        $sections = json_decode(File::get($jsonPath), true);

        foreach ($sections as $section) {
            Section::create([
                'title' => $section['title'],
                'slug' => $section['name'],
                'template' => $section['template'],
                'content' => isset($section['content']) ? json_encode($section['content']) : null,
                'is_published' => true,
            ]);
        }

        $this->command->info('Sections seeded successfully!');
    }
}
