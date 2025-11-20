# Medusa 2.0 Feedback System

A modern, futuristic feedback collection platform for the Medusa 2.0 cybersecurity event.

## Features

- 🎨 **Futuristic Cyber Theme** - Modern, minimalist design with green accent colors
- ⚡ **Real-time Feedback Wall** - View all feedback submissions instantly
- 🔐 **Team Verification** - Secure team ID verification system
- ⭐ **Rating System** - 5-star rating with detailed feedback messages
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🚀 **Serverless Architecture** - Deployed on Vercel with MongoDB Atlas

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express (converted to Vercel serverless functions)
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

## Local Development

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mevindu-4/Medusa-2.0-Feedback-Website.git
   cd Medusa-2.0-Feedback-Website
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**

   Create `backend/.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Seed the database** (optional)
   ```bash
   cd backend
   npm run seed
   ```

5. **Run the development servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Deployment on Vercel

### Prerequisites

- Vercel account (free tier available)
- MongoDB Atlas account

### Steps

1. **Push your code to GitHub** (already done)

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `MONGODB_URI` with your MongoDB Atlas connection string
   - Add: `VITE_API_URL` (optional, defaults to `/api`)

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Or click "Deploy" button manually

### Vercel Configuration

The project includes `vercel.json` with:
- Frontend build configuration
- API route rewrites
- Serverless function setup

## Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── auth/
│   │   └── verify-team.js
│   ├── feedback/
│   │   ├── create.js
│   │   └── all.js
│   ├── models/            # Mongoose models
│   ├── db.js              # MongoDB connection utility
│   └── health.js
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/               # Original Express backend (for local dev)
│   ├── routes/
│   ├── models/
│   └── server.js
├── vercel.json           # Vercel configuration
└── package.json
```

## API Endpoints

- `POST /api/auth/verify-team` - Verify team ID
- `POST /api/feedback/create` - Submit feedback
- `GET /api/feedback/all` - Get all feedbacks
- `GET /api/health` - Health check

## Environment Variables

### Required
- `MONGODB_URI` - MongoDB Atlas connection string

### Optional
- `VITE_API_URL` - Frontend API base URL (defaults to `/api`)

## License

MIT

## Author

Medusa 2.0 Team
