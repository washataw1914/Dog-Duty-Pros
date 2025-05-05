#!/bin/bash

# Dog Duty Pros Database Setup Script
# This script helps set up the database schema on SiteGround

echo "Dog Duty Pros Database Setup"
echo "============================"
echo ""
echo "This script will help you set up the database schema on SiteGround."
echo "Make sure you have created a database in SiteGround's Site Tools first."
echo ""

# Prompt for database credentials
read -p "Database Host: " PGHOST
read -p "Database Name: " PGDATABASE
read -p "Database Username: " PGUSER
read -s -p "Database Password: " PGPASSWORD
echo ""
read -p "Database Port (default: 3306): " PGPORT
PGPORT=${PGPORT:-3306}

# Export as environment variables
export PGHOST
export PGPORT
export PGDATABASE
export PGUSER
export PGPASSWORD
export DATABASE_URL="postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}"

echo ""
echo "Connecting to database and creating schema..."

# Run the database migrations
echo "Running database migrations..."
npm run db:push

# Optionally seed the database
read -p "Do you want to seed the database with initial data? (y/n): " SEED_DB
if [[ $SEED_DB == "y" || $SEED_DB == "Y" ]]; then
  echo "Seeding database..."
  npm run db:seed
fi

echo ""
echo "Database setup complete!"
echo ""
echo "Add these environment variables to your SiteGround Node.js application:"
echo ""
echo "DATABASE_URL=${DATABASE_URL}"
echo "PGHOST=${PGHOST}"
echo "PGPORT=${PGPORT}"
echo "PGDATABASE=${PGDATABASE}"
echo "PGUSER=${PGUSER}"
echo "PGPASSWORD=********" # Don't show the actual password
echo ""