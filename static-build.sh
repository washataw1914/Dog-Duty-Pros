#!/bin/bash

# Dog Duty Pros Static Build Script
# This script creates a static build that can be deployed to SiteGround shared hosting

echo "Starting static build process..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the client application
echo "Building client application..."
npm run build

# Step 3: Create a static deployment directory
echo "Creating static deployment directory..."
mkdir -p static-build
cp -r dist/client/* static-build/

# Step 4: Create .htaccess file for SPA routing with Apache
echo "Creating .htaccess for SPA routing..."
cat > static-build/.htaccess << EOF
# Enable rewrite engine
RewriteEngine On

# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html

# GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/x-javascript "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>
EOF

# Step 5: Create a proxy configuration for API requests
echo "Creating proxy configuration for API..."
cat > static-build/api-proxy.php << EOF
<?php
// API proxy for Dog Duty Pros
// This script forwards API requests to your Node.js server

// API server details
\$api_url = 'https://api.dogduty.biz'; // Change this to your actual API domain

// Get the request path
\$request_uri = \$_SERVER['REQUEST_URI'];
\$path = parse_url(\$request_uri, PHP_URL_PATH);

// Only proxy requests to /api
if (strpos(\$path, '/api/') === 0) {
    // Forward the request to the API server
    \$url = \$api_url . \$path;
    
    // Get the request method
    \$method = \$_SERVER['REQUEST_METHOD'];
    
    // Initialize cURL
    \$ch = curl_init();
    
    // Set cURL options
    curl_setopt(\$ch, CURLOPT_URL, \$url);
    curl_setopt(\$ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(\$ch, CURLOPT_CUSTOMREQUEST, \$method);
    
    // Handle request body for POST, PUT, etc.
    if (\$method == 'POST' || \$method == 'PUT' || \$method == 'PATCH') {
        \$input = file_get_contents('php://input');
        if (\$input) {
            curl_setopt(\$ch, CURLOPT_POSTFIELDS, \$input);
        }
    }
    
    // Forward all headers
    \$headers = [];
    foreach (getallheaders() as \$name => \$value) {
        if (\$name != 'Host') {
            \$headers[] = "\$name: \$value";
        }
    }
    curl_setopt(\$ch, CURLOPT_HTTPHEADER, \$headers);
    
    // Execute cURL request
    \$response = curl_exec(\$ch);
    \$http_code = curl_getinfo(\$ch, CURLINFO_HTTP_CODE);
    
    // Forward the response headers
    \$header_size = curl_getinfo(\$ch, CURLINFO_HEADER_SIZE);
    \$header = substr(\$response, 0, \$header_size);
    \$body = substr(\$response, \$header_size);
    
    // Close cURL
    curl_close(\$ch);
    
    // Set the response code
    http_response_code(\$http_code);
    
    // Output the response
    echo \$response;
    exit;
}
?>
EOF

# Step 6: Create a zip archive for easier upload
echo "Creating zip archive for upload..."
cd static-build
zip -r ../dogdutypros-static.zip *
cd ..

echo "Static build created: dogdutypros-static.zip"
echo ""
echo "Instructions for SiteGround static deployment:"
echo "1. Upload the dogdutypros-static.zip file to your SiteGround hosting"
echo "2. Extract the archive to your public_html directory (or preferred subdirectory)"
echo "3. Set up your separate Node.js API server for handling backend requests"
echo "4. Update the 'api_url' in api-proxy.php to point to your actual API server"
echo ""
echo "Static build complete!"