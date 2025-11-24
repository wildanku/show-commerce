<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    /**
     * Display the about us page.
     */
    public function index()
    {
        // Fetch about-us section from database with metadata
        $aboutUsSection = Section::where('slug', 'about-us')->first();
        
        if ($aboutUsSection) {
            // The content field already contains all the about us data
            $aboutUs = json_decode($aboutUsSection->content, true);
            
            // Map the content to expected structure with fallback sections
            $aboutUs = array_merge($aboutUs, [
                'sections' => $this->getDefaultSections(),
            ]);
        } else {
            $aboutUs = $this->getFallbackAboutUsData();
        }
        
        return Inertia::render('AboutUs/Page', [
            'aboutUs' => $aboutUs,
        ]);
    }

    /**
     * Get default sections for about us page
     */
    private function getDefaultSections()
    {
        return [
            [
                'title' => 'About Us',
                'subtitle' => 'SPICESIDN C.V.',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
                'content' => [
                    'Spicesidn C.V. was officially established in December 2019 Our company is engaged in the export of Vanilla Beans and Indonesian Spices Distributors. Even though it is relatively new, we have professional and experienced human resources in their fields as well as good company management, so we are confident that we can provide the best service. Glimpse the best product quality to ensure our clients\' satisfaction.',
                    'We are here to help and support companies/individuals in the field of differentiating Vanilla Beans and Indonesian spices. With our work experience, of course, we will always try to maintain product quality and provide the best service to business partners and maintain the trust that has been given.',
                    'With the times and increasingly fierce competition, we will continue to innovate to provide the best solutions for all the needs of our business partners. With the support of all of the above, then we are very sure, SPICESIDN C.V. will develop into a reliable and successful company.',
                ],
            ],
            [
                'title' => 'Vision & Mission',
                'subtitle' => 'SPICESIDN C.V.',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
                'vision' => [
                    'title' => 'Company Vision',
                    'icon' => '💎',
                    'description' => 'To be a company that is trusted, independent, with international competitiveness, and the ability to meet client satisfaction with quality products and services.',
                ],
                'mission' => [
                    'title' => 'Company Mission',
                    'icon' => '💎',
                    'items' => [
                        'Providing the best service and maintaining the trust of business partners.',
                        'Making clients and business partners a top priority by providing quality goods or services.',
                        'Build a business that has a competitive advantage and is competent.',
                        'Maintain a code of ethics in every company business process.',
                    ],
                ],
            ],
            [
                'title' => 'The legality of the company',
                'subtitle' => 'SPICESIDN C.V.',
                'image' => 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
                'legal_documents' => [
                    [
                        'label' => 'Deed of Incorporation',
                        'value' => 'RA notary. Chandra Dewi Kusumawati. SH Number 23 Dated December 17, 2020',
                    ],
                    [
                        'label' => 'Ministry of Justice and Human Rights Decree',
                        'value' => 'No. AHU-0071087.AH.01.14.Tahun 2020',
                    ],
                    [
                        'label' => 'Certification of registration',
                        'value' => 'No. S-16876KT / WPJ.23 / KP.0103 / 2020',
                    ],
                    [
                        'label' => 'Taxpayer Identification Number (NPWP)',
                        'value' => 'No. 96,929,885.0-542,000',
                    ],
                    [
                        'label' => 'Business Identification Number (NIB)',
                        'value' => 'No. 0215010222923',
                    ],
                    [
                        'label' => 'No. Trading Business License (SIUP)',
                        'date' => 'December 22, 2020',
                        'value' => '202012-2212-5843-9966-931',
                    ],
                    [
                        'label' => 'Location permission',
                        'value' => 'JI Ngadirejo, RT 04 / Rw 06, Dusun Kencuran, Desa Sukoharjo, Kec. Ngaglik, Kab, Sleman Yogyakarta. Indonesia',
                    ],
                    [
                        'label' => 'Location Office',
                        'value' => 'TREVISTA HILLS KEBAYORAN, JAKARTA INDONESIA',
                    ],
                ],
            ],
        ];
    }

    /**
     * Get fallback about us data
     */
    private function getFallbackAboutUsData()
    {
        return [
            'title' => 'About Us',
            'subtitle' => 'SPICESIDN C.V.',
            'hero_image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
            'sections' => [
                [
                    'title' => 'About Us',
                    'subtitle' => 'SPICESIDN C.V.',
                    'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
                    'content' => [
                        'Spicesidn C.V. was officially established in December 2019 Our company is engaged in the export of Vanilla Beans and Indonesian Spices Distributors. Even though it is relatively new, we have professional and experienced human resources in their fields as well as good company management, so we are confident that we can provide the best service. Glimpse the best product quality to ensure our clients\' satisfaction.',
                        'We are here to help and support companies/individuals in the field of differentiating Vanilla Beans and Indonesian spices. With our work experience, of course, we will always try to maintain product quality and provide the best service to business partners and maintain the trust that has been given.',
                        'With the times and increasingly fierce competition, we will continue to innovate to provide the best solutions for all the needs of our business partners. With the support of all of the above, then we are very sure, SPICESIDN C.V. will develop into a reliable and successful company.',
                    ],
                ],
                [
                    'title' => 'Vision & Mission',
                    'subtitle' => 'SPICESIDN C.V.',
                    'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
                    'vision' => [
                        'title' => 'Company Vision',
                        'icon' => '💎',
                        'description' => 'To be a company that is trusted, independent, with international competitiveness, and the ability to meet client satisfaction with quality products and services.',
                    ],
                    'mission' => [
                        'title' => 'Company Mission',
                        'icon' => '💎',
                        'items' => [
                            'Providing the best service and maintaining the trust of business partners.',
                            'Making clients and business partners a top priority by providing quality goods or services.',
                            'Build a business that has a competitive advantage and is competent.',
                            'Maintain a code of ethics in every company business process.',
                        ],
                    ],
                ],
                [
                    'title' => 'The legality of the company',
                    'subtitle' => 'SPICESIDN C.V.',
                    'image' => 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
                    'legal_documents' => [
                        [
                            'label' => 'Deed of Incorporation',
                            'value' => 'RA notary. Chandra Dewi Kusumawati. SH Number 23 Dated December 17, 2020',
                        ],
                        [
                            'label' => 'Ministry of Justice and Human Rights Decree',
                            'value' => 'No. AHU-0071087.AH.01.14.Tahun 2020',
                        ],
                        [
                            'label' => 'Certification of registration',
                            'value' => 'No. S-16876KT / WPJ.23 / KP.0103 / 2020',
                        ],
                        [
                            'label' => 'Taxpayer Identification Number (NPWP)',
                            'value' => 'No. 96,929,885.0-542,000',
                        ],
                        [
                            'label' => 'Business Identification Number (NIB)',
                            'value' => 'No. 0215010222923',
                        ],
                        [
                            'label' => 'No. Trading Business License (SIUP)',
                            'date' => 'December 22, 2020',
                            'value' => '202012-2212-5843-9966-931',
                        ],
                        [
                            'label' => 'Location permission',
                            'value' => 'JI Ngadirejo, RT 04 / Rw 06, Dusun Kencuran, Desa Sukoharjo, Kec. Ngaglik, Kab, Sleman Yogyakarta. Indonesia',
                        ],
                        [
                            'label' => 'Location Office',
                            'value' => 'TREVISTA HILLS KEBAYORAN, JAKARTA INDONESIA',
                        ],
                    ],
                ],
            ],
        ];
    }
}
