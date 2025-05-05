#!/bin/bash

# Dog Duty Pros GitHub Repository Initialization Script
# This script helps initialize and push to a GitHub repository

echo "Dog Duty Pros GitHub Repository Setup"
echo "===================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git before continuing."
    exit 1
fi

# Check if the directory is already a git repository
if [ -d .git ]; then
    echo "This directory is already a git repository."
    
    # Check if there's a remote named origin
    if git remote get-url origin &> /dev/null; then
        CURRENT_REMOTE=$(git remote get-url origin)
        echo "Current remote: $CURRENT_REMOTE"
        read -p "Do you want to change this remote? (y/n): " CHANGE_REMOTE
        
        if [[ $CHANGE_REMOTE == "y" || $CHANGE_REMOTE == "Y" ]]; then
            read -p "Enter your GitHub username: " GH_USERNAME
            read -p "Enter your repository name (default: dog-duty-pros): " REPO_NAME
            REPO_NAME=${REPO_NAME:-dog-duty-pros}
            
            git remote set-url origin "https://github.com/$GH_USERNAME/$REPO_NAME.git"
            echo "Remote updated to: https://github.com/$GH_USERNAME/$REPO_NAME.git"
        fi
    else
        echo "No remote named 'origin' found."
        read -p "Enter your GitHub username: " GH_USERNAME
        read -p "Enter your repository name (default: dog-duty-pros): " REPO_NAME
        REPO_NAME=${REPO_NAME:-dog-duty-pros}
        
        git remote add origin "https://github.com/$GH_USERNAME/$REPO_NAME.git"
        echo "Remote added: https://github.com/$GH_USERNAME/$REPO_NAME.git"
    fi
else
    echo "Initializing new git repository..."
    git init
    
    read -p "Enter your GitHub username: " GH_USERNAME
    read -p "Enter your repository name (default: dog-duty-pros): " REPO_NAME
    REPO_NAME=${REPO_NAME:-dog-duty-pros}
    
    git remote add origin "https://github.com/$GH_USERNAME/$REPO_NAME.git"
    echo "Remote added: https://github.com/$GH_USERNAME/$REPO_NAME.git"
fi

# Check for untracked files and uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "Uncommitted changes detected:"
    git status --short
    
    read -p "Do you want to add all files and commit them? (y/n): " ADD_ALL
    
    if [[ $ADD_ALL == "y" || $ADD_ALL == "Y" ]]; then
        read -p "Enter commit message (default: Initial commit): " COMMIT_MSG
        COMMIT_MSG=${COMMIT_MSG:-Initial commit}
        
        git add .
        git commit -m "$COMMIT_MSG"
        echo "Files committed with message: $COMMIT_MSG"
    else
        echo "Skipping commit. Please commit your changes manually."
    fi
else
    echo "No uncommitted changes detected."
fi

# Push to GitHub
read -p "Do you want to push to GitHub now? (y/n): " PUSH_NOW

if [[ $PUSH_NOW == "y" || $PUSH_NOW == "Y" ]]; then
    # Get current branch name
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    echo "Pushing to GitHub..."
    git push -u origin $CURRENT_BRANCH
    
    if [ $? -eq 0 ]; then
        echo "Successfully pushed to GitHub!"
    else
        echo "Push failed. Please check your GitHub credentials and try again."
    fi
fi

echo ""
echo "GitHub repository setup complete!"
echo "For more detailed instructions, see GITHUB_SETUP.md"
echo ""