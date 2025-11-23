<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    
    <!-- Favicon -->
    @php
            $faviconExtensions = ['png', 'jpg', 'jpeg', 'ico'];
            $faviconPath = null;
            foreach ($faviconExtensions as $ext) {
                $candidate = "storage/branding/favicon.$ext";
                if (file_exists(public_path($candidate))) {
                    $faviconPath = asset($candidate);
                    break;
                }
            }
            if (!$faviconPath) {
                $faviconPath = asset('favicon.ico');
            }
        @endphp
        <link rel="icon" type="image/x-icon" href="{{ $faviconPath }}" />
    
    <link href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 480px;
            margin: 80px auto;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.07);
            padding: 40px 32px;
            text-align: center;
        }
        .error-code {
            font-size: 72px;
            font-weight: 700;
            color: #6366f1;
            margin-bottom: 8px;
        }
        .error-title {
            font-size: 28px;
            font-weight: 700;
            color: #222;
            margin-bottom: 12px;
        }
        .error-desc {
            font-size: 16px;
            color: #555;
            margin-bottom: 32px;
        }
        .btn {
            display: inline-block;
            padding: 12px 32px;
            background: #6366f1;
            color: #fff;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #4f46e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-code">404</div>
        <div class="error-title">Page Not Found</div>
        <div class="error-desc">Sorry, the page you are looking for does not exist or has been moved.</div>
        <a href="{{ url('/') }}" class="btn">Go Home</a>
    </div>
</body>
</html>
