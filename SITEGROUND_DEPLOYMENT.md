# Deploying Dog Duty Pros to SiteGround

This guide provides comprehensive instructions for deploying the Dog Duty Pros application to SiteGround hosting. We'll cover both deployment options:

1. **Full-Stack Node.js Deployment** (Recommended for SiteGround GrowBig or GoGeek plans)
2. **Static Frontend with Separate API** (Suitable for StartUp plans or shared hosting)

## Option 1: Full-Stack Node.js Deployment

This option deploys both the React frontend and Node.js backend as a single application.

### Prerequisites

- SiteGround GrowBig or GoGeek hosting plan
- Domain configured in SiteGround
- Access to SiteGround's Site Tools
- SSH access to your hosting account

### Step 1: Prepare Your Application

1. Run the deployment script to create a deployment package:
   ```bash
   ./deploy.sh
   ```

2. This will create a `dogdutypros-deploy.tar.gz` file containing your application.

### Step 2: Set Up Node.js in SiteGround

1. Log in to SiteGround's Site Tools
2. Go to **Devs > Node.js Manager**
3. Click **Create Application**
4. Configure the Node.js application:
   - **Node.js Version**: Select 16.x or higher
   - **Application Root**: Select the directory where you'll upload the app (e.g., `/nodejs_apps/dogdutypros`)
   - **Application URL**: Select your domain
   - **Application Entry Point**: Set to `dist/index.js`
   - **Environment Variables**: Add all required environment variables from your `.env.example` file

### Step 3: Upload Your Application

1. Go to **Site > File Manager** in Site Tools
2. Navigate to the directory you specified as the Application Root
3. Upload the `dogdutypros-deploy.tar.gz` file
4. Extract the file using the File Manager's Extract option
5. Verify the files are properly extracted

### Step 4: Set Up the Database

1. Go to **Site > MySQL** in Site Tools
2. Create a new database and user
3. Note the database credentials (host, database name, username, password)
4. Update the Node.js application's environment variables with these credentials

### Step 5: Run the Database Setup

1. Connect to your site via SSH:
   ```bash
   ssh <username>@<siteground-server>.siteground.biz
   ```

2. Navigate to your application directory:
   ```bash
   cd /path/to/application/root
   ```

3. Run the database setup script:
   ```bash
   ./db-setup.sh
   ```

4. Follow the prompts to set up your database schema

### Step 6: Start Your Application

1. Return to **Devs > Node.js Manager** in Site Tools
2. Click the **Restart** button next to your application
3. Check the application logs for any startup errors

## Option 2: Static Frontend with Separate API

This option deploys the React frontend as static files and the Node.js API separately.

### Prerequisites

- Any SiteGround hosting plan (including StartUp)
- Domain configured in SiteGround
- Access to SiteGround's Site Tools

### Step 1: Prepare Your Static Frontend

1. Run the static build script:
   ```bash
   ./static-build.sh
   ```

2. This will create a `dogdutypros-static.zip` file containing your static frontend.

### Step 2: Upload Static Frontend

1. Go to **Site > File Manager** in Site Tools
2. Navigate to your public_html directory (or preferred subdirectory)
3. Upload the `dogdutypros-static.zip` file
4. Extract the files
5. Verify the .htaccess file was properly extracted (this handles SPA routing)

### Step 3: Set Up Node.js API on a Subdomain

1. Create a subdomain for your API (e.g., api.yourdomain.com)
2. Go to **Devs > Node.js Manager** in Site Tools
3. Click **Create Application**
4. Configure the Node.js application:
   - **Node.js Version**: Select 16.x or higher
   - **Application Root**: Select a directory for the API (e.g., `/nodejs_apps/dogdutypros-api`)
   - **Application URL**: Select your API subdomain
   - **Application Entry Point**: Set to `dist/index.js`
   - **Environment Variables**: Add all required environment variables

### Step 4: Prepare and Upload API

1. Follow the same steps as Option 1 to prepare the API:
   ```bash
   ./deploy.sh
   ```

2. Upload and extract the `dogdutypros-deploy.tar.gz` file to the API directory

### Step 5: Set Up the Database

1. Follow the same database setup steps as in Option 1

### Step 6: Update API Proxy Configuration

1. Edit the `api-proxy.php` file in your frontend directory
2. Update the `$api_url` variable to point to your API subdomain:
   ```php
   $api_url = 'https://api.yourdomain.com';
   ```

### Step 7: Start Your API Application

1. Go to **Devs > Node.js Manager** in Site Tools
2. Start your Node.js API application

## Setting Up Stripe Integration

After deployment, configure Stripe integration:

1. Follow the instructions in `stripe-setup.md`
2. Update your webhook endpoint URL to match your deployed application

## Testing Your Deployment

1. Visit your website to verify the frontend is working
2. Test the API endpoints to ensure backend functionality
3. Test the payment flow with Stripe test cards
4. Check the live chat functionality

## Troubleshooting

### Frontend Issues

- If routes don't work, check that the .htaccess file is correctly set up
- If API calls fail, verify the API proxy configuration
- Check browser console for JavaScript errors

### Backend Issues

- Check Node.js application logs in Site Tools
- Verify environment variables are correctly set
- Ensure the database connection is working

### Database Issues

- Verify database credentials
- Check that all migrations ran successfully
- Ensure database user has sufficient permissions

## Regular Maintenance

1. Set up regular database backups in SiteGround Site Tools
2. Configure SiteGround's free SSL
3. Set up SiteGround's Cloudflare CDN integration for better performance

For additional help, contact SiteGround support or refer to their [documentation](https://www.siteground.com/kb/).