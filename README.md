# MoodSync: Emotion-Driven Music Soundscapes 🎧✨

> **Real-time facial expression music curation that dynamically generates and plays tailored soundscapes based on how you feel.**

**Live Application**: [https://moodysync.netlify.app/](https://moodysync.netlify.app/)

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Computer_Vision-007FFF?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

---

## 🌟 Overview

**MoodSync** is a full-stack, emotion-aware music streaming application designed as a flagship portfolio project. Utilizing on-device computer vision through **Google MediaPipe FaceLandmarker**, MoodSync analyzes subtle facial micro-expressions (smiles, frowns, jaw drops, brow movements) in real time to categorize the user's emotional state into **Happy**, **Sad**, or **Surprised** moods. 

The application loads a curated playlist tailored to that emotion, dynamically shifting the application's ambient lighting and audio atmosphere to match the user's vibe.

---

## 🚀 Key Features

* **🏠 Minimalist Landing Page (`/`)**:
  * Clean editorial hero section with harmonic soundwave contour graphics.
  * Overview of the three sonic states and how on-device biometric processing operates.
  * Instant navigation to the sound studio at `/detect`.

* **🧠 Facial Emotion Vision Studio (`/detect`)**:
  * Real-time webcam facial detection powered by MediaPipe WebAssembly.
  * Clean camera viewfinder with subtle architectural corner brackets.
  * Live blendshape telemetry meters measuring Smile Valence %, Awe/Surprise %, and Melancholy %.
  * Camera toggle for privacy plus instant 1-Click Manual Mood Selector for environments without a webcam.

* **🎵 Full Mood Playlists & Queue**:
  * **Radiant Euphoria (Happy 😊)**: High-vibration rhythms and uplifting grooves.
  * **Midnight Echoes (Sad 🌧️)**: Gentle acoustic textures and soul-stirring melodies for quiet reflection.
  * **Cosmic Wonder (Surprised ⚡)**: Electro synth pulses and sonic marvels for moments of pure awe.
  * Interactive tracklist table with artwork thumbnails, duration, and live animated audio equalizer bars on playing tracks.

* **🎛️ Persistent Floating Audio Dock**:
  * Fixed bottom dock with album artwork, title, artist, and mood badge.
  * Full transport controls: Shuffle, Skip -10s, Previous, tactile Play/Pause, Next, Skip +10s, Repeat.
  * Interactive timeline scrubber with live timestamp formatting.
  * Volume control slider with mute toggle and mini visualizer bars.
  * Automatic queue advancement to the next song when a track ends.

* **🌈 Dynamic Ambient Illumination**:
  * The entire UI background and ambient lighting dynamically transitions to match the active emotion:
    * **Happy**: Warm Amber / Sun Gold (`#f59e0b`)
    * **Sad**: Deep Rain Cerulean (`#38bdf8`)
    * **Surprised**: Electric Neon Violet (`#c084fc`)

* **⚡ Recruiter 1-Click Demo Mode**:
  * Built-in one-click demo button on the login screen (`demo@moodify.io` / `moodify123`) allowing portfolio reviewers to experience the app immediately without manual signup.

* **📊 Emotional Journey Log**:
  * Persistent timeline tracking past facial mood detections, timestamps, and recommended tracks.

---

## 🛠️ Tech Stack

### **Frontend**
* **React 19** with modular feature-based architecture (`features/landing`, `features/auth`, `features/Expression`, `features/home`, `features/shared`).
* **Vite** for fast bundling and hot module replacement.
* **React Router v7** for client-side routing and route protection.
* **Vanilla SCSS** for customized glassmorphism design, ambient glow effects, and responsive layouts.
* **Google MediaPipe Vision Tasks** (`@mediapipe/tasks-vision`) for client-side facial landmark and blendshape detection.
* **Phosphor Icons** (`@phosphor-icons/react`) for iconography.

### **Backend**
* **Node.js & Express** modular REST API.
* **MongoDB & Mongoose** for song catalogue, mood playlist mappings, and user accounts.
* **Redis (`ioredis`)** for high-performance token blacklisting on logout and session caching.
* **JWT (JSON Web Tokens)** with cross-site cookie options and Authorization Bearer header support.
* **ImageKit SDK** for CDN audio and poster assets.
* **Multer & node-id3** for ID3 audio tag parsing on upload.

---

## 📁 Project Structure

```plaintext
MoodSync/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection handler
│   │   │   └── cache.js             # Redis client configuration
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # User registration, login, logout, getMe
│   │   │   └── song.controller.js   # Song retrieval & mood playlists
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js   # JWT verification & Redis blacklist check
│   │   │   └── upload.middleware.js # Multer file upload handler
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema (bcrypt hashed passwords)
│   │   │   ├── songs.model.js       # Song schema with mood categorization
│   │   │   └── blacklist.model.js   # Token blacklist schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # /api/auth routes
│   │   │   └── song.routes.js       # /api/songs routes
│   │   ├── scripts/
│   │   │   └── seedPlaylists.js     # Database seed script for 15 mood tracks
│   │   ├── services/
│   │   │   └── storage.service.js   # ImageKit upload integration
│   │   └── app.js                   # Express app setup & CORS configuration
│   ├── .env.example                 # Example environment variables template
│   ├── .gitignore                   # Backend git ignore rules
│   ├── package.json
│   └── server.js                    # Server entrypoint with dynamic port binding
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── landing/             # Public landing page with harmonic wave SVG
│   │   │   ├── auth/                # Login, Register, Protected routes, AuthContext
│   │   │   ├── Expression/          # FaceExpression camera scanner, MediaPipe utils
│   │   │   ├── home/                # Navbar, PlaylistView, Player, AllPlaylists, SongContext
│   │   │   └── shared/              # BrandLogo, Design tokens (_variables.scss, button.scss, global.scss)
│   │   ├── app.routes.jsx           # Client router (/ for Landing, /detect for Studio)
│   │   ├── App.jsx                  # Root App with Context Providers
│   │   └── main.jsx                 # Vite application entry point
│   ├── public/                      # Static assets, SVG favicon, and _redirects
│   ├── netlify.toml                 # Netlify build and redirect configuration
│   ├── .gitignore                   # Frontend git ignore rules
│   ├── package.json
│   └── vite.config.js
└── README.md                        # Project documentation
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
* [Node.js](https://nodejs.org/) (v18 or newer)
* [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
* [Redis](https://redis.io/) (Local or Redis Cloud)

---

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/Moodify.git
cd Moodify
```

---

### **2. Configure Backend**
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
4. Fill in your credentials inside `Backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/moodify
   JWT_SECRET=your_super_secret_jwt_key
   REDIS_HOST=your_redis_host
   REDIS_PORT=15625
   REDIS_PASSWORD=your_redis_password
   IMAGEKIT_PRIVATE_KEY=your_imagekit_key
   ```
5. Seed the database with mood playlists:
   ```bash
   npm run seed
   ```
6. Start the backend development server:
   ```bash
   npm run dev
   # Backend runs on http://localhost:3000
   ```

---

### **3. Configure Frontend**
1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

---

## 📡 API Reference

### **Authentication (`/api/auth`)**
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login user and issue JWT cookie/token | No |
| `GET` | `/api/auth/get-me` | Fetch active user profile | Yes (JWT) |
| `GET` | `/api/auth/logout` | Clear cookie and blacklist token in Redis | Yes (JWT) |

### **Songs & Playlists (`/api/songs`)**
| Method | Endpoint | Description | Query / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/songs` | Fetch songs for a specific mood | `?mood=happy` / `sad` / `surprised` |
| `GET` | `/api/songs/playlists` | Fetch all 3 grouped mood playlists with metadata | None |
| `POST` | `/api/songs` | Upload a new song with ID3 tags to ImageKit | `multipart/form-data` |

---

## 🚀 Cloud Deployment Guide

### **A. Backend on Render**
1. In Render, create a **Web Service** connected to your repository.
2. Settings:
   * **Root Directory**: `Backend`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Add Environment Variables:
   * `MONGO_URI`, `JWT_SECRET`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `IMAGEKIT_PRIVATE_KEY`
   * `NODE_ENV` = `production`
   * `FRONTEND_URL` = `https://moodysync.netlify.app`
4. Copy the assigned Render URL (e.g., `https://moodify-backend.onrender.com`).

---

### **B. Frontend on Netlify**
1. In Netlify, create a new site from your Git repository.
2. Build Settings:
   * **Base directory**: `Frontend`
   * **Build command**: `npm run build`
   * **Publish directory**: `Frontend/dist` (or `dist`)
3. Environment Variables:
   * `VITE_API_URL` = your Render backend URL
4. SPA route redirects are automatically handled by `netlify.toml` and `_redirects`.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

Created by **Manas Ghosh** as a full-stack portfolio showcase.
Feel free to connect on [LinkedIn](https://linkedin.com/) or check out my other repositories on [GitHub](https://github.com/)!
