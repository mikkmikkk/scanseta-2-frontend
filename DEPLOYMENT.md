# Deployment Guide

## Environment Variables Setup

### Required Environment Variables

Your application requires the following environment variable to connect to the backend:

```
VITE_API_BASE_URL=https://your-backend-api-url.com
```

### Local Development

1. Create a `.env.local` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

2. Start your development server:

```bash
npm run dev
```

### Vercel Deployment

#### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.railway.app`)
   - **Environment**: Select all environments (Production, Preview, Development)

4. Click **Save**
5. **Important**: Redeploy your application after adding environment variables

#### Redeploying After Adding Environment Variables

Environment variables are only applied during the build process. After adding or updating them:

1. Go to **Deployments** tab
2. Click on the three dots (...) next to your latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger a new deployment

### Common Issues on Mobile

#### "Cannot connect to server" Error

This error typically occurs when:

1. **Environment variable not set**: Ensure `VITE_API_BASE_URL` is configured in Vercel
2. **Backend not accessible**: Verify your backend URL is publicly accessible
3. **CORS issues**: Ensure your backend allows requests from your Vercel domain
4. **HTTPS required**: Mobile browsers require HTTPS for API calls (HTTP won't work)

#### Debugging Steps

1. **Check environment variable in build logs**:
   - Go to Vercel Deployments
   - Click on your deployment
   - Check the build logs for `VITE_API_BASE_URL`

2. **Test backend URL directly**:
   - Open your backend URL in a mobile browser
   - Try accessing: `https://your-backend-url.com/health`
   - Should return a JSON response

3. **Check browser console on mobile**:
   - Use Chrome DevTools remote debugging for Android
   - Use Safari Web Inspector for iOS
   - Look for network errors or CORS issues

4. **Verify CORS settings on backend**:
   ```python
   # Your backend should allow requests from your Vercel domain
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-vercel-app.vercel.app"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

### Backend Requirements

Your backend must:

1. Be deployed and publicly accessible
2. Support HTTPS (required for mobile browsers)
3. Have CORS configured to allow requests from your Vercel domain
4. Respond to the following endpoints:
   - `GET /health` - Health check
   - `POST /load-model` - Load AI model
   - `POST /scan` - Scan prescription image

### Example Backend URLs

- **Railway**: `https://your-app.railway.app`
- **Render**: `https://your-app.onrender.com`
- **Heroku**: `https://your-app.herokuapp.com`
- **AWS/GCP/Azure**: Your custom domain

### Testing

After deployment, test on both desktop and mobile:

1. Open the app on desktop browser
2. Open the app on mobile browser
3. Check browser console for any errors
4. Verify API calls are reaching your backend

### Environment Variable Format

```bash
# ✅ Correct
VITE_API_BASE_URL=https://api.example.com

# ✅ Correct (with port)
VITE_API_BASE_URL=https://api.example.com:8000

# ❌ Wrong (missing protocol)
VITE_API_BASE_URL=api.example.com

# ❌ Wrong (trailing slash - may cause issues)
VITE_API_BASE_URL=https://api.example.com/
```

### Support

If you continue to experience issues:

1. Check Vercel build logs for environment variable
2. Verify backend is accessible from mobile network
3. Check backend logs for incoming requests
4. Ensure HTTPS is enabled on backend
5. Verify CORS headers are properly configured

