#!/bin/bash
# Cleanup old JavaScript files that conflict with TypeScript

echo "🧹 Cleaning up old JavaScript files..."

# Remove old .js files
rm -f resources/js/app.js
echo "✓ Removed resources/js/app.js"

rm -f resources/js/bootstrap.js
echo "✓ Removed resources/js/bootstrap.js"

# Remove old .jsx files
rm -f resources/js/Layouts/Layout.jsx
echo "✓ Removed resources/js/Layouts/Layout.jsx"

rm -f resources/js/Pages/Welcome.jsx
echo "✓ Removed resources/js/Pages/Welcome.jsx"

echo ""
echo "🔨 Rebuilding..."
npm run build

echo ""
echo "🧹 Clearing caches..."
php artisan cache:clear
php artisan view:clear
php artisan config:clear

echo ""
echo "✅ Done! Your project is cleaned up."
echo "🚀 Run: npm run dev"
echo "📱 Then visit: http://localhost:8000"
