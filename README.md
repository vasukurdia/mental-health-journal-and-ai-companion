# 🧠 Mental Health Journal & AI Chatbot

A full-stack web application for mental wellness featuring digital journaling, mood tracking, and an AI-powered chatbot companion built with React.js, Node.js, MongoDB, and Google Gemini AI.

## ✨ Features

- **User Authentication** - Secure registration and login with JWT
- **Digital Journaling** - Write and manage personal journal entries
- **Mood Tracking** - Monitor emotional patterns over time
- **AI Chatbot** - Supportive conversations with Google Gemini AI
- **Dashboard** - Overview of your mental wellness journey
- **Responsive Design** - Beautiful UI with Tailwind CSS
- **Private & Secure** - All data is encrypted and private

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Google Gemini AI** - Chatbot intelligence

## 📁 Complete Project Structure

```
mental-health-app/
├── server/                                 # Backend
│   ├── config/
│   │   ├── db.js                          # MongoDB configuration
│   │   └── gemini.js                      # Gemini AI setup
│   ├── controllers/
│   │   ├── authController.js              # Authentication logic
│   │   ├── journalController.js           # Journal CRUD operations
│   │   └── chatController.js              # Chatbot logic
│   ├── middleware/
│   │   ├── auth.js                        # JWT authentication
│   │   └── errorHandler.js                # Error handling
│   ├── models/
│   │   ├── User.js                        # User schema
│   │   ├── Journal.js                     # Journal schema
│   │   └── ChatHistory.js                 # Chat schema
│   ├── routes/
│   │   ├── authRoutes.js                  # Auth endpoints
│   │   ├── journalRoutes.js               # Journal endpoints
│   │   └── chatRoutes.js                  # Chat endpoints
│   ├── services/
│   │   └── geminiService.js               # AI service
│   ├── utils/
│   │   └── tokenGenerator.js              # JWT utilities
│   ├── .env                               # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                          # Entry point
│
├── client/                                # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── chatbot/
│   │   │   │   ├── Chatbot.jsx
│   │   │   │   ├── ChatMessage.jsx
│   │   │   │   └── ChatInput.jsx
│   │   │   ├── journal/
│   │   │   │   ├── JournalList.jsx
│   │   │   │   ├── JournalEntry.jsx
│   │   │   │   ├── JournalForm.jsx
│   │   │   │   └── EntryCard.jsx
│   │   │   └── layout/
│   │   │       └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── JournalPage.jsx
│   │   │   └── ChatbotPage.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── journalService.js
│   │   │   └── chatService.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Google Gemini API key

### Quick Start

1. **Clone or Create Project Structure**
```bash
mkdir mental-health-app && cd mental-health-app
```

2. **Setup Backend**
```bash
mkdir server && cd server
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken @google/generative-ai
npm install --save-dev nodemon
```

3. **Setup Frontend**
```bash
cd ..
npm create vite@latest client -- --template react
cd client
npm install
npm install react-router-dom axios tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react framer-motion react-hot-toast
npx tailwindcss init -p
```

4. **Configure Environment Variables**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mental-health-db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Get Gemini API Key**
- Visit https://makersuite.google.com/app/apikey
- Create an API key
- Add to `server/.env`

6. **Copy All Code Files**
- Copy all backend files from documentation to `server/` directory
- Copy all frontend files from documentation to `client/src/` directory

7. **Start Development Servers**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

8. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Journals
- `GET /api/journals` - Get all user journals (Protected)
- `POST /api/journals` - Create journal (Protected)
- `GET /api/journals/:id` - Get single journal (Protected)
- `PUT /api/journals/:id` - Update journal (Protected)
- `DELETE /api/journals/:id` - Delete journal (Protected)
- `GET /api/journals/stats/mood` - Get mood statistics (Protected)

### Chat
- `POST /api/chat/message` - Send message to AI (Protected)
- `GET /api/chat/history` - Get chat history (Protected)
- `DELETE /api/chat/history` - Clear chat history (Protected)

## 🎨 Features Walkthrough

### 1. User Registration & Login
- Secure authentication with JWT tokens
- Password hashing with bcrypt
- Form validation

### 2. Dashboard
- Overview of journal entries
- Mood statistics visualization
- Quick access to all features

### 3. Journal Management
- Create, read, update, delete entries
- Mood selection with emojis
- Private/public toggle
- Rich text formatting

### 4. AI Chatbot
- Powered by Google Gemini AI
- Context-aware conversations
- Mental health support guidance
- Chat history persistence

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable management
- Input validation

## 🎯 Best Practices Implemented

- Clean code architecture
- Component reusability
- Error handling
- Loading states
- Responsive design
- Accessibility considerations
- RESTful API design

## 📝 Development Notes

### MongoDB Setup Options

**Option A: Local MongoDB**
```bash
# Install MongoDB
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Available Scripts

**Backend:**
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

**Frontend:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access (for Atlas)

### CORS Errors
- Verify CORS configuration in server
- Check API URL in client `.env`

### Gemini API Errors
- Verify API key is correct
- Check API quota/limits
- Ensure internet connection

## 🚀 Deployment

### Backend (Heroku, Railway, etc.)
1. Set environment variables
2. Use MongoDB Atlas for production
3. Configure CORS for production frontend URL

### Frontend (Vercel, Netlify, etc.)
1. Build project: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to production backend URL

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Developer

Created with ❤️ for mental health awareness and support.

## 📞 Support

If you need help or have questions, feel free to open an issue.

---

**Note:** This application is for educational purposes and supportive conversations only. It is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please contact a qualified mental health professional or emergency services.
