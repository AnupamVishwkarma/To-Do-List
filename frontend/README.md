# Todo List Frontend

This is the frontend of the Todo List Application built using React and Vite.

## Technologies Used

- React
- Vite
- Axios
- Bootstrap

## Prerequisites

Before running the frontend, make sure:

- Node.js is installed.
- Backend server is running.
- MongoDB is connected through the backend.

---

## Environment Variable

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

---

## Install Dependencies

```bash
npm install
```

---

## Run the Application

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

## Backend Setup

Before starting the frontend, start the backend server.

Go to the backend folder.

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Build for Production

```bash
npm run build
```

---

## Project Structure

```
src
│
├── components
├── services
├── App.jsx
├── main.jsx
└── index.css
```