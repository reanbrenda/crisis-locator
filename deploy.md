# Vercel Deployment Guide

## Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the setup

3. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - No additional setup required for this app

## Manual Deploy (Alternative)

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Project Structure
- Frontend: `/frontend` (Vite build)
- Backend: `/backend` (Node.js API)
- Routes: API calls go to `/api/*`
