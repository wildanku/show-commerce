<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contactData = [
            'company' => 'SPICESIDM CV.',
            'address' => 'Trevista Hills Kebayoran D23 Kota Depok, Jakarta Indonesia',
            'phones' => [
                '+62 82338386226',
                '+62 82243533405',
            ],
            'email' => 'info@spicesidm.com',
            'website' => 'www.spicesidm.com',
            'mapUrl' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7930.355681839907!2d106.7451943!3d-6.3710265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5007bccab19%3A0x1a17ad69d1489864!2sSPICESIDN%20CV!5e0!3m2!1sid!2sid!4v1763455928102!5m2!1sid!2sid',
        ];

        return Inertia::render('Contact/Page', [
            'contact' => $contactData,
        ]);
    }
}
