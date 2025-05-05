# GitHub Repository Setup Guide

This guide will help you set up a GitHub repository for the Dog Duty Pros project.

## Creating a New GitHub Repository

1. Go to [github.com](https://github.com) and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Enter "dog-duty-pros" (or your preferred name) as the Repository name
4. Add a description: "Modern pet waste removal service website"
5. Choose whether to make the repository public or private
6. Check "Add a README file" (we'll replace it with our own)
7. Select "Add .gitignore" and choose "Node" from the template list
8. Choose a license if desired
9. Click "Create repository"

## Preparing Your Local Project for GitHub

1. Initialize a Git repository in your project folder (if not done already):
   ```bash
   git init
   ```

2. Add your files to Git:
   ```bash
   git add .
   ```

3. Make the initial commit:
   ```bash
   git commit -m "Initial commit"
   ```

4. Add the GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/yourusername/dog-duty-pros.git
   ```

5. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```

   Note: If your default branch is called `master` instead of `main`, use:
   ```bash
   git push -u origin master
   ```

## Setting Up GitHub Secret Variables

For secure deployment, you should store sensitive information like API keys as GitHub secrets:

1. Go to your GitHub repository page
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets (one by one):
   - `DATABASE_URL`
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`

## Setting Up GitHub Pages (Optional)

If you want to showcase a static version of your site on GitHub Pages:

1. Go to your repository settings
2. Scroll down to the "GitHub Pages" section
3. Under "Source", select "GitHub Actions"
4. Create a new workflow file in your repository at `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: './dist/client'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

## Setting Up Automated Testing (Optional)

To set up automated testing on GitHub:

1. Create a new workflow file at `.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
```

## Best Practices for GitHub Collaboration

1. **Use branches**: Create feature branches for new features or bug fixes
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Write clear commit messages**: Use descriptive commit messages that explain what changes were made and why
   ```bash
   git commit -m "Add service booking calendar component"
   ```

3. **Create pull requests**: Instead of committing directly to the main branch, create pull requests for review
   
4. **Review code**: Have team members review code before merging

5. **Use issues**: Create GitHub issues to track bugs, features, and tasks

6. **Use project boards**: Set up GitHub project boards to organize and prioritize work

## Protecting the Main Branch

To protect your main branch from direct pushes:

1. Go to your repository settings
2. Click on "Branches"
3. Under "Branch protection rules", click "Add rule"
4. Enter "main" (or "master") as the branch name pattern
5. Select options like:
   - "Require pull request reviews before merging"
   - "Require status checks to pass before merging"
   - "Include administrators"
6. Click "Create"

## Keeping Secrets Secure

Remember these important security practices:

1. Never commit sensitive information (.env files, API keys, etc.) to Git
2. Use GitHub Secrets for CI/CD workflows
3. Regularly rotate API keys and passwords
4. Review access to your repository regularly