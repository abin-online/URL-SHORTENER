# URL Shortener

A **full-stack URL shortener** built using **Nest.js** (backend) and **React (Vite)** (frontend). This application allows users to shorten long URLs and retrieve their shortened versions.

## 🚀 Live Demo
- **Frontend:** [URL Shortener Client](https://url-shortener-client-c9if.onrender.com)
- **Backend:** [URL Shortener API](https://url-shortener-t152.onrender.com)

---

## 📌 Features
- 🔗 Shorten long URLs
- 📜 Retrieve and redirect shortened URLs
- 🛡️ User authentication (Login/Register)
- 🗄️ MongoDB for persistent storage
- 🌐 Hosted on **Render** (frontend & backend)

---

## 🛠️ Tech Stack
### **Frontend:**
- React (Vite)
- Axios
- Tailwind CSS (for styling)

### **Backend:**
- Nest.js (TypeScript)
- Mongoose (MongoDB ORM)
- Express.js
- TinyURL API (for shortening URLs)

### **Database:**
- MongoDB Atlas

### **Deployment:**
- Render (for both frontend and backend)

---

## 🏗️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

---

### **2️⃣ Backend Setup (Nest.js)**
#### **📌 Navigate to backend folder:**
```sh
cd backend
```

#### **📌 Install dependencies:**
```sh
npm install
```

#### **📌 Create `.env` file and add MongoDB & API configurations:**
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
TINYURL_API_KEY=##################
```

#### **📌 Run the backend locally:**
```sh
npm run start
```

---

### **3️⃣ Frontend Setup (React + Vite)**
#### **📌 Navigate to frontend folder:**
```sh
cd ../frontend
```

#### **📌 Install dependencies:**
```sh
npm install
```

#### **📌 Create `.env` file with API endpoints:**
```env
VITE_API_LOGIN=https://url-shortener-t152.onrender.com/auth/login
VITE_API_REGISTER=https://url-shortener-t152.onrender.com/auth/register
VITE_API_URL_SHORT=https://url-shortener-t152.onrender.com/urls/shorten
```

#### **📌 Run the frontend locally:**
```sh
npm run dev
```

---

## 🚀 Deployment

### **1️⃣ Deploy Backend on Render**
- Push your code to GitHub.
- Go to [Render](https://render.com/), create a new web service, and connect your **backend** repository.
- Set the **build command**:
  ```sh
  npm install && npm run build
  ```
- Set the **start command**:
  ```sh
  npm run start
  ```
- Add environment variables (**MONGO_URI, JWT_SECRET, TINYURL_API_KEY**).
- Deploy the service.

### **2️⃣ Deploy Frontend on Render**
- Create a new web service in **Render**.
- Set the **build command**:
  ```sh
  npm install && npm run build
  ```
- Set the **publish directory**: `dist`
- Add environment variables (**VITE_API_LOGIN, VITE_API_REGISTER, VITE_API_URL_SHORT**).
- Deploy the service.

---

## ⚡ API Endpoints

### **Auth Routes**
- **POST** `/auth/register` → User registration
- **POST** `/auth/login` → User login

### **URL Shortener Routes**
- **POST** `/urls/shorten` → Shorten a long URL
- **GET** `/urls/:shortUrl` → Retrieve original URL from short URL

---

## 🐞 Troubleshooting
### **MongoDB Connection Error (MongooseServerSelectionError)**
- Make sure your **IP is whitelisted** in **MongoDB Atlas**:
  - Go to **MongoDB Atlas → Network Access**.
  - Add **0.0.0.0/0** (for testing) or your specific IP.
- Verify **MongoDB URI** in `.env`.

### **CORS Issues**
- In `main.ts` (backend), enable CORS:
  ```ts
  app.enableCors({
    origin: 'https://****',
    credentials: true,
  });
  ```

---

## 📜 License
This project is licensed under the **MIT License**.

---
