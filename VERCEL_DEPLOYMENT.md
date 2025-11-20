# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub
Your code is already on GitHub at: `https://github.com/mevindu-4/Medusa-2.0-Feedback-Website`

### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your repository**
   - Select `mevindu-4/Medusa-2.0-Feedback-Website`
   - Click "Import"

4. **Configure Project Settings**
   - **Framework Preset:** Other (or leave as auto-detected)
   - **Root Directory:** Leave as default (`.`)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install && cd frontend && npm install`

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
     ```
     mongodb+srv://medusa_user:awJ7bDTgLLmIP4FD@cluster0.mkfvlod.mongodb.net/?appName=Cluster0
     ```
   - **Environment:** Production, Preview, Development (select all)

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### 3. Verify Deployment

After deployment:
- Your app will be live at: `https://your-project-name.vercel.app`
- API routes will be available at: `https://your-project-name.vercel.app/api/*`

### 4. Test the Deployment

1. Visit your Vercel URL
2. Test team verification: `/verify-team`
3. Submit feedback
4. Check the feedback wall

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify `MONGODB_URI` is set correctly
- Check build logs in Vercel dashboard

### API Routes Not Working
- Ensure `api/` folder is in the root directory
- Check that `mongoose` is in root `package.json` dependencies
- Verify environment variables are set

### Frontend Not Loading
- Check that `frontend/dist` is the output directory
- Verify Vite build completed successfully
- Check browser console for errors

## Project Structure for Vercel

```
├── api/                    # Serverless functions (auto-detected by Vercel)
│   ├── auth/
│   ├── feedback/
│   └── models/
├── frontend/               # React app
│   ├── src/
│   └── dist/              # Build output (created during build)
├── vercel.json            # Vercel configuration
└── package.json           # Root dependencies (mongoose for API)
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `VITE_API_URL` | No | Frontend API URL (defaults to `/api`) |

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches
- **Manual:** Click "Redeploy" in Vercel dashboard

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Support

For issues:
- Check Vercel logs in dashboard
- Review build logs
- Check MongoDB Atlas connection
- Verify environment variables

