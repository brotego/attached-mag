# Attatched-Mag

A modern magazine website built with Next.js and Strapi CMS.

## Project Structure

- `frontend/` - Next.js frontend application
- `strapi-attatchedmag/` - Strapi CMS backend

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Strapi
   cd ../strapi-attatchedmag
   npm install
   ```
3. Start the development servers:
   ```bash
   # Frontend (in frontend directory)
   npm run dev
   
   # Strapi (in strapi-attatchedmag directory)
   npm run develop
   ```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Strapi (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

## Deployment

- Frontend: Deployed on Vercel
- Strapi: Deployed on DigitalOcean # Attatched-Mag
# Attatched-Mag
# attached-mag
