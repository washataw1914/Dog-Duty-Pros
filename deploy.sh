#!/bin/bash

# Dog Duty Pros Deployment Script for SiteGround
# This script builds the application and prepares it for deployment

echo "Starting deployment process..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the application
echo "Building application..."
npm run build

# Step 3: Create deployment package
echo "Creating deployment package..."
mkdir -p deploy
cp -r dist deploy/
cp package.json deploy/
cp .env.example deploy/.env.example
cp README.md deploy/

# Step 4: Install production dependencies only in the deploy folder
echo "Installing production dependencies..."
cd deploy
npm install --production
cd ..

# Step 5: Create archive for upload
echo "Creating deployment archive..."
tar -czf dogdutypros-deploy.tar.gz deploy/

echo "Deployment package created: dogdutypros-deploy.tar.gz"
echo ""
echo "Instructions for SiteGround deployment:"
echo "1. Upload the dogdutypros-deploy.tar.gz file to your SiteGround hosting"
echo "2. Extract the archive on the server"
echo "3. Set up the environment variables in SiteGround Site Tools"
echo "4. Configure Node.js application in SiteGround Site Tools"
echo "5. Point your domain to the application"
echo ""
echo "Deployment preparation complete!"