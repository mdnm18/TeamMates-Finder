# Pair Finder
A web platform for SRMIST students to find teammates for projects, hackathons, and competitive programming.


```
PairFinder/
├── .git/
├── client/                 <-- Your React + Vite Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/         # Images, fonts, SVG icons
│   │   ├── components/     # Reusable UI components (Navbar.jsx, PostCard.jsx, Button.jsx)
│   │   ├── pages/          # Page-level components (HomePage.jsx, ProfilePage.jsx, LoginPage.jsx)
│   │   ├── redux/          # Redux Toolkit state management
│   │   │   ├── slices/     # Feature slices (authSlice.js, postSlice.js)
│   │   │   └── store.js    # The main Redux store configuration
│   │   ├── services/       # API call functions (e.g., api.js using Axios)
│   │   ├── utils/          # Helper functions (date formatting, etc.)
│   │   ├── App.jsx         # Main App component with routing
│   │   ├── main.jsx        # Entry point for React
│   │   └── index.css       # Global styles
│   ├── .eslintrc.cjs
│   ├── .gitignore          # Specific to client (already covered by root .gitignore)
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js   # For Tailwind CSS
│   ├── tailwind.config.js  # For Tailwind CSS
│   └── vite.config.js
│
├── server/                 <-- Your Node.js + Express Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection logic
│   ├── controllers/        # Handles business logic (authController.js, postController.js)
│   ├── middleware/
│   │   └── authMiddleware.js # Verifies JWT tokens
│   ├── models/             # Mongoose schemas (User.js, Post.js, Notification.js)
│   ├── routes/             # API endpoint definitions (authRoutes.js, postRoutes.js)
│   ├── services/           # Reusable services (notificationService.js, emailService.js)
│   ├── .env                # IMPORTANT: Store secrets here (DB_URI, JWT_SECRET, etc.)
│   ├── .gitignore
│   ├── package.json
│   └── server.js           # Main server entry point
│
├── .gitignore              # The main gitignore from GitHub
├── LICENSE
└── README.md

```
