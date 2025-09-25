@echo off
echo 🚀 Setting up Muslim Guide Backend for Production...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Install global dependencies
echo 🌍 Installing global dependencies...
npm install -g pm2 artillery

REM Create logs directory
echo 📁 Creating logs directory...
if not exist logs mkdir logs

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please update .env file with your production values!
)

REM Build the application
echo 🏗️  Building application...
npm run build

REM Run security audit
echo 🔒 Running security audit...
npm run security:audit

echo.
echo ✅ Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update .env file with your production values
echo 2. Update test URLs in tests/ directory with your Render URL
echo 3. Run tests: npm run test:all
echo 4. Deploy to Render or start with PM2: npm run pm2:start
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md
pause
