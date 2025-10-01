# GitHub Environments Setup Guide

This document provides step-by-step instructions for setting up GitHub environments as required for the assignment.

## Step 1: Create Environments

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Environments**
3. Create the following three environments:

### Environment: `dev`
- **Environment Variables:**
  - `BUILD_TAG`: `dev-v1.0`
  - `RELEASE_NOTE`: `Development build for testing`

### Environment: `staging`
- **Environment Variables:**
  - `BUILD_TAG`: `staging-v1.0`
  - `RELEASE_NOTE`: `Testing pre-production release`

### Environment: `production`
- **Environment Variables:**
  - `BUILD_TAG`: `prod-v1.0`
  - `RELEASE_NOTE`: `Production release v1.0`

## Step 2: Configure Production Protection Rules

For the **production** environment:

1. Enable **Required reviewers**
   - Add at least one reviewer (your instructor or teammate)
   - Check "Prevent self-review" if desired

2. Optional settings:
   - **Wait timer**: Set to 1-5 minutes for demonstration
   - **Deployment branches**: Restrict to `main` branch only

## Step 3: Repository Secrets (if needed)

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets if required for your specific deployment needs

## Environment Variable Examples

Each environment should have these variables configured:

```
BUILD_TAG: Environment-specific build identifier
RELEASE_NOTE: Description for the release
```

Example values:
- Dev: `dev-v1.0-{run_number}`, `Development build for testing`
- Staging: `staging-v1.0-{run_number}`, `Testing pre-production release`
- Production: `prod-v1.0-{run_number}`, `Production release v1.0`

## Testing the Setup

After setting up environments:

1. Push to `main` branch to trigger the dev pipeline
2. Use workflow dispatch to test staging deployment
3. Use workflow dispatch with production flag to test full pipeline
4. Verify that production requires manual approval

## Environment URLs (Optional)

You can also set environment URLs for each environment:
- Dev: `https://dev.yourapp.com`
- Staging: `https://staging.yourapp.com`  
- Production: `https://yourapp.com`