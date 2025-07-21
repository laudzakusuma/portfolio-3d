#!/bin/bash

# Portfolio 3D Deployment Script
# This script automates the deployment process to Vercel

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        print_error "Failed to install Vercel CLI. Please install it manually: npm install -g vercel"
        exit 1
    fi
    print_success "Vercel CLI installed successfully!"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_success "Dependencies installed!"

# Run tests (if available)
if grep -q '"test"' package.json; then
    print_status "Running tests..."
    npm test -- --coverage --passWithNoTests
    if [ $? -ne 0 ]; then
        print_warning "Tests failed, but continuing with deployment..."
    else
        print_success "Tests passed!"
    fi
fi

# Build the project
print_status "Building the project..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi
print_success "Build completed successfully!"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Deploy to Vercel
print_status "Deploying to Vercel..."

# Check if this is the first deployment
if [ ! -f ".vercel/project.json" ]; then
    print_status "First time deployment detected. Setting up project..."
    vercel --prod
else
    print_status "Deploying to existing project..."
    vercel --prod
fi

if [ $? -eq 0 ]; then
    print_success "🎉 Deployment successful!"
    print_status "Your portfolio is now live!"
    
    # Get the deployment URL
    DEPLOYMENT_URL=$(vercel ls | grep -E "https://.*\.vercel\.app" | head -1 | awk '{print $2}')
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        print_success "URL: $DEPLOYMENT_URL"
    fi
    
    echo ""
    echo "📝 Next steps:"
    echo "1. Visit your deployed site and test all functionality"
    echo "2. Update your custom domain if needed: vercel domains"
    echo "3. Set up environment variables if required: vercel env"
    echo "4. Configure analytics: vercel analytics"
    echo ""
    
else
    print_error "❌ Deployment failed"
    print_status "Please check the error messages above and try again"
    exit 1
fi

# Optional: Open the site in browser (uncomment if desired)
# if command -v open &> /dev/null; then
#     open $DEPLOYMENT_URL
# elif command -v xdg-open &> /dev/null; then
#     xdg-open $DEPLOYMENT_URL
# fi

print_success "🚀 Deployment process completed!"