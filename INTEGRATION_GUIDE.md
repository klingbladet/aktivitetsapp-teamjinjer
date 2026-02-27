# Backend-Frontend Integration Guide

Your Aktivitets App is now fully connected! Here's how to run both parts:

## Prerequisites

- .NET 8 SDK or higher
- Node.js 18+ and npm
- SQL Server (running in Docker or locally)

## Running the Application

### 1. Start the Backend API

```bash
# Navigate to the API project folder
cd AktivitetsApp.Api

# Run the API
dotnet run

# Or use watch mode for development
dotnet watch run
```

The API will start on `http://localhost:5267` (HTTP) or `https://localhost:7217` (HTTPS)

You can access Swagger UI at: `https://localhost:7217/swagger/ui`

### 2. Start the Frontend

In a new terminal:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

The frontend communicates with these backend endpoints:

### Activities

- `GET /api/activities` - Get all activities (supports `?search=...&category=...`)
- `POST /api/activities` - Create a new activity
- `GET /api/activities/{id}` - Get activity by ID
- `POST /api/activities/{id}/join?userId={userId}` - Join an activity
- `POST /api/activities/{id}/leave?userId={userId}` - Leave an activity

### Users

- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user by ID

## Environment Configuration

### Frontend (.env)

```
VITE_GOOGLE_MAPS_KEY=AIzaSyBZYlK7H1O_arOmDicuV52bbIZ5zzrlS5c
VITE_API_URL=http://localhost:5267
```

The API URL can be changed for different environments (staging, production, etc.)

### Backend (appsettings.json)

- Database connection string points to SQL Server at `127.0.0.1:14333`
- CORS is enabled for frontend on `http://localhost:5173` and `http://localhost:3000`

## Features Implemented

✅ **Fetch Activities** - Real-time data from backend
✅ **Create Activities** - Submit new activities to backend
✅ **Search & Filter** - Backend-powered search and category filtering
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Visual feedback while loading data
✅ **CORS Enabled** - Frontend can communicate with backend
✅ **Form Validation** - Client-side and server-side validation
✅ **Geolocation** - Capture GPS coordinates when creating activities

## Troubleshooting

### "Failed to fetch" / CORS errors

- Make sure both backend and frontend are running
- Check that the API URL in frontend `.env` matches the backend port
- Backend CORS policy should allow the frontend URL

### API not responding

- Verify backend is running: `https://localhost:7217/swagger/ui`
- Check console for backend errors
- Ensure database migrations have run

### Frontend showing "Loading" indefinitely

- Check browser console for error messages
- Verify network tab in browser dev tools for failed requests
- Ensure `VITE_API_URL` environment variable is set correctly

## Building for Production

**Frontend:**

```bash
cd frontend
npm run build
```

**Backend:**

```bash
cd AktivitetsApp.Api
dotnet publish -c Release
```
