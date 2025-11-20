# Medusa 2.0 Feedback System

An immersive feedback collection platform for **Medusa 2.0**, the premier cybersecurity event hosted by ECSC, University of Kelaniya. This is an **open-source collaboration** — developers of all skill levels are welcome to contribute!

## 🎯 Project Overview

Build a real-time feedback collection system where teams can submit their feedback about the Medusa 2.0 event. The system features a public feedback wall, team verification, and seamless feedback submission.

## ✨ Core Features

1. **🏠 Home Page (Public Feedback Wall)**
   - Live feedback display — all submissions visible to everyone
   - Real-time sorting — newest feedback appears first
   - Display fields: Team Name/ID, Rating (★), Message, Timestamp
   - Prominent "**Give Feedback**" CTA button at the top

2. **🔐 Team Verification System**
   - Teams enter their unique **Team ID**
   - Backend validates against MongoDB `teams` collection
   - **Valid ID** → Redirect to feedback form
   - **Invalid ID** → Display error message with retry option

3. **📝 Feedback Submission Interface**
   - **Required Fields:**
     - Rating scale (1–5 stars)
     - Feedback message (text area)
   - **Optional:**
     - Team name/identifier
   - **Post-Submission Flow:**
     - Data saved to MongoDB `feedback` collection
     - Instant redirect to Home page
     - Feedback appears immediately (no refresh needed)

## 🛠️ Technology Stack

### Frontend
- **React with Vite** — lightning-fast development
- **TailwindCSS** — utility-first CSS framework
- **Axios** — HTTP requests
- **React Router** — navigation

### Backend
- **Node.js + Express** — RESTful API
- **Endpoints:**
  - `POST /api/auth/verify-team`
  - `POST /api/feedback/create`
  - `GET /api/feedback/all`

### Database
- **MongoDB Atlas** — cloud-hosted
- **Collections:** `teams` and `feedback`

## 📊 Database Schema

### Teams Collection
```javascript
{
  teamId: String,    // Unique identifier (e.g., "TEAM-001")
  teamName: String   // Display name
}
```

### Feedback Collection
```javascript
{
  teamId: String,    // References teams collection
  rating: Number,    // 1-5 scale
  message: String,   // Feedback content
  teamName: String,  // Optional display name
  createdAt: Date    // Auto-generated timestamp
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB installation)
- Git installed locally

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Medusa-2.0-Feedback-Website.git
   cd Medusa-2.0-Feedback-Website
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `backend/.env` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   PORT=5000
   ```

4. **Set up MongoDB collections**
   
   You need to create teams in your MongoDB database. You can do this via MongoDB Atlas UI or using a script. Example team document:
   ```json
   {
     "teamId": "TEAM-001",
     "teamName": "Team Alpha"
   }
   ```

5. **Run the development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Frontend on `http://localhost:3000`
   - Backend on `http://localhost:5000`

### Alternative: Run separately

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

## 🎨 Design Requirements

- Smooth page transitions
- Hover states with clear visual feedback
- Responsive design (mobile-first approach)
- Loading states and micro-interactions
- Accessibility considerations (contrast ratios, keyboard navigation)

## 📦 Deliverables

### Must-Have
- ✅ Fully functional feedback system
- ✅ Frontend + Backend integration
- ✅ MongoDB connection established
- ✅ Comprehensive **README.md** with setup instructions

### Nice-to-Have
- 🚀 Deployed version (Vercel, Netlify, Railway, etc.)
- 📱 PWA capabilities
- 🎭 Advanced animations (Framer Motion)
- ♿ WCAG accessibility compliance

## 🤝 Collaboration Guidelines

### Getting Started
1. Fork the repository to your account
2. Clone your fork locally
3. Create a **feature branch** (`git checkout -b feature/your-feature-name`)
4. Make your changes with **clear, descriptive commits**
5. Push to your fork and open a **Pull Request**

### ⚠️ Important Rules
- ❌ **Never push directly to** `main`
- ✅ Write meaningful commit messages
- ✅ Test your code before submitting PRs
- ✅ Follow the existing code style

## 📝 API Endpoints

### Verify Team
```http
POST /api/auth/verify-team
Content-Type: application/json

{
  "teamId": "TEAM-001"
}
```

**Response:**
```json
{
  "valid": true,
  "team": {
    "teamId": "TEAM-001",
    "teamName": "Team Alpha"
  }
}
```

### Create Feedback
```http
POST /api/feedback/create
Content-Type: application/json

{
  "teamId": "TEAM-001",
  "rating": 5,
  "message": "Great event!",
  "teamName": "Team Alpha"
}
```

### Get All Feedbacks
```http
GET /api/feedback/all
```

**Response:**
```json
[
  {
    "_id": "...",
    "teamId": "TEAM-001",
    "rating": 5,
    "message": "Great event!",
    "teamName": "Team Alpha",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB connection string in `backend/.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB is running (if using local instance)

### Port Already in Use
- Change the port in `backend/.env` or `frontend/vite.config.js`
- Kill the process using the port: `npx kill-port 5000` or `npx kill-port 3000`

## 📄 License

MIT

## 🙏 Acknowledgments

Built for Medusa 2.0 by ECSC, University of Kelaniya

---

**Note:** No admin dashboard required — keep it lean and focused!

