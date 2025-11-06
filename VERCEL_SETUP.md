# Vercel Deployment Quick Setup

## Step-by-Step Guide to Fix "Cannot connect to server" on Mobile

### 1. Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add new variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend.railway.app`)
   - **Environments**: Check all three boxes (Production, Preview, Development)
6. Click **Save**

### 2. Redeploy Your Application

**Important**: Environment variables are only applied during build time. You MUST redeploy after adding them.

**Option A: Trigger Redeploy from Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the three dots (...) next to the latest deployment
3. Select **Redeploy**
4. Click **Redeploy** again to confirm

**Option B: Push a New Commit**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

### 3. Verify Environment Variable

After redeployment:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Scroll down to **Build Logs**
4. Look for the configuration output (if in dev mode) or check that build completed successfully
5. The environment variable should be available during build

### 4. Test the Deployment

1. **On Desktop**:
   - Open your Vercel URL: `https://your-app.vercel.app`
   - Open browser console (F12)
   - Check for any errors
   - Verify API URL is configured correctly

2. **On Mobile**:
   - Open your Vercel URL on mobile browser
   - The app should now connect to the backend
   - If still failing, check the next section

### 5. Common Issues and Solutions

#### Issue: Still getting "Cannot connect to server" on mobile

**Solution 1: Verify Backend URL**
- Open `https://your-backend-url.com/health` directly in mobile browser
- Should return JSON response like: `{"message": "OK", "status": "healthy", ...}`
- If this fails, your backend is not accessible

**Solution 2: Check Backend Uses HTTPS**
- Mobile browsers block HTTP requests (only HTTPS allowed)
- Your backend MUST use HTTPS in production
- Most hosting platforms (Railway, Render, Heroku) provide HTTPS by default

**Solution 3: Fix CORS on Backend**

Your backend needs to allow requests from your Vercel domain:

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",
        "https://*.vercel.app",  # Allow all Vercel preview deployments
        "http://localhost:8081",  # For local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Solution 4: Check Backend is Running**
- Verify your backend service is running and not sleeping
- Some free-tier hosting platforms put apps to sleep after inactivity
- Try accessing the backend URL first to wake it up

#### Issue: Environment variable not found in build logs

**Solution**: 
- Double-check the variable name is exactly: `VITE_API_BASE_URL`
- Ensure all environments are checked (Production, Preview, Development)
- Try removing and re-adding the variable
- Redeploy after making changes

#### Issue: Works on desktop but not mobile

**Likely causes**:
1. Backend using HTTP instead of HTTPS (mobile browsers block HTTP)
2. CORS not configured for your Vercel domain
3. Backend not accessible from mobile network
4. Environment variable not properly set

**Debug steps**:
1. Open browser console on mobile (use remote debugging)
2. Check network tab for failed requests
3. Look for CORS errors or connection refused errors
4. Verify the API URL being used

### 6. Mobile Browser Debugging

**For Android (Chrome)**:
1. Connect phone to computer via USB
2. Enable USB debugging on phone
3. Open Chrome on desktop
4. Go to `chrome://inspect`
5. Select your phone and open the Vercel app
6. Inspect console and network tab

**For iOS (Safari)**:
1. Enable Web Inspector on iPhone (Settings > Safari > Advanced)
2. Connect iPhone to Mac via USB
3. Open Safari on Mac
4. Go to Develop > [Your iPhone] > [Your Vercel app]
5. Inspect console and network tab

### 7. Verify Everything is Working

After deployment, you should see:

1. **On app load**: No configuration errors
2. **Health check**: Either "Model loaded" or "Model not loaded" message (not connection error)
3. **Upload buttons**: Enabled (if model is loaded)
4. **Console**: No errors about missing API URL

### 8. Environment Variable Format

Make sure your environment variable follows this format:

```bash
# ✅ Correct formats
VITE_API_BASE_URL=https://api.example.com
VITE_API_BASE_URL=https://api.example.com:8000

# ❌ Wrong formats
VITE_API_BASE_URL=api.example.com              # Missing protocol
VITE_API_BASE_URL=https://api.example.com/     # Trailing slash
VITE_API_BASE_URL="https://api.example.com"    # Quotes (Vercel adds them automatically)
```

### 9. Need More Help?

1. Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review [README.md](./README.md) troubleshooting section
3. Check Vercel build logs for errors
4. Check backend logs for incoming requests
5. Verify CORS configuration on backend

### Quick Checklist

- [ ] Environment variable `VITE_API_BASE_URL` added in Vercel
- [ ] All environments checked (Production, Preview, Development)
- [ ] Application redeployed after adding variable
- [ ] Backend URL uses HTTPS (not HTTP)
- [ ] Backend is accessible (test `/health` endpoint)
- [ ] CORS configured to allow Vercel domain
- [ ] Tested on both desktop and mobile
- [ ] No errors in browser console
- [ ] API calls reaching backend (check backend logs)

If all items are checked and it still doesn't work, the issue is likely with the backend configuration or network accessibility.

