#!/bin/bash

echo "🚀 Setting up Muslim Guide Backend for Production..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install global dependencies
echo "🌍 Installing global dependencies..."
npm install -g pm2 artillery

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please update .env file with your production values!"
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Run security audit
echo "🔒 Running security audit..."
npm run security:audit

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your production values"
echo "2. Update test URLs in tests/ directory with your Render URL"
echo "3. Run tests: npm run test:all"
echo "4. Deploy to Render or start with PM2: npm run pm2:start"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
