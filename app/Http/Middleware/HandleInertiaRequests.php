<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\ProductCategory;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'productCategories' => ProductCategory::orderBy('name')->get(['id', 'name', 'slug'])->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                ];
            }),
            'contactData' => [
                'company' => 'SPICESIDM CV.',
                'address' => 'Trevista Hills Kebayoran D23 Kota Depok, Jakarta Indonesia',
                'phones' => [
                    '+62 82338386226',
                    '+62 82243533405',
                ],
                'email' => 'info@spicesidm.com',
                'website' => 'www.spicesidm.com',
            ],
        ];
    }
}
