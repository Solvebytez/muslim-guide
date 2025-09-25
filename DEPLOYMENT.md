# 🚀 Muslim Guide Backend - Production Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Render account (paid plan)
- PM2 installed globally: `npm install -g pm2`

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment template and configure:

```bash
cp env.example .env
```

Update `.env` with your production values:

```env
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/muslim-guide

# JWT Secrets (generate strong secrets)
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URLs
FRONTEND_URL=https://your-app.com
ADMIN_URL=https://admin.muslimcompass.io
```

### 3. Update Test URLs

Update the test files with your Render URL:

```bash
# Replace 'your-app-name.onrender.com' in:
# - tests/load-test.yml
# - tests/k6-test.js
# - tests/api-test.js
# - tests/error-test.js
```

## 🧪 Testing

### Run All Tests

```bash
# API Response Time Tests
npm run test:api

# Error Handling Tests
npm run test:error

# Load Testing (requires Artillery)
npm run test:load

# k6 Performance Testing
npm run test:k6

# Run all tests
npm run test:all
```

### Security Audit

```bash
# Check for vulnerabilities
npm run security:audit

# Fix vulnerabilities
npm run security:fix
```

## 🏗️ Build and Deploy

### Local Testing

```bash
# Build the application
npm run build

# Test production build locally
npm run start:prod
```

### Deploy to Render

1. **Connect your GitHub repository to Render**
2. **Set environment variables in Render dashboard**
3. **Configure build settings:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

### PM2 Deployment (Alternative)

```bash
# Start with PM2
npm run pm2:start

# Monitor
npm run pm2:monit

# View logs
npm run pm2:logs

# Restart
npm run pm2:restart
```

## 📊 Performance Monitoring

### Expected Performance Metrics

- **Response Time**: < 500ms average
- **Concurrent Users**: 100-500 users
- **Error Rate**: < 1%
- **Uptime**: 99.9%

### Monitoring Commands

```bash
# Check API health
curl https://api.muslimcompass.io/health

# Monitor PM2 processes
pm2 monit

# View detailed logs
pm2 logs muslim-guide-api --lines 100
```

## 🔒 Security Checklist

- [ ] Strong JWT secrets configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet security headers
- [ ] Input validation on all endpoints
- [ ] Database connection secured
- [ ] Environment variables secured
- [ ] No sensitive data in logs

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check MongoDB URI
   - Verify network access
   - Check connection limits

2. **CORS Errors**

   - Update allowed origins
   - Check frontend URL configuration

3. **High Response Times**

   - Check database indexes
   - Monitor memory usage
   - Review query performance

4. **Memory Issues**
   - Increase Render plan
   - Optimize database queries
   - Add caching

### Debug Commands

```bash
# Check environment variables
node -e "console.log(process.env)"

# Test database connection
node -e "require('./dist/config/db.config').default()"

# Check build output
ls -la dist/
```

## 📈 Scaling

### When to Scale

- Response times > 1 second
- Error rate > 5%
- Memory usage > 80%
- CPU usage > 80%

### Scaling Options

1. **Upgrade Render Plan**
2. **Add Database Indexes**
3. **Implement Caching (Redis)**
4. **Optimize Database Queries**
5. **Add Load Balancing**

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm run test:all

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        run: echo "Deploy to Render"
```

## 📞 Support

For issues or questions:

1. Check the logs: `npm run pm2:logs`
2. Monitor performance: `npm run pm2:monit`
3. Run diagnostics: `npm run test:all`

---

**🎉 Your backend is now production-ready!**
