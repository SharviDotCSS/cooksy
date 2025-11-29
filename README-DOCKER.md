# Docker Setup Guide

This project is dockerized as a single unit with all services orchestrated together.

## Quick Start

1. **Create backend `.env` file** (`backend/.env`):
   ```
   PORT=3000
   MONGO_URI=mongodb://admin:password@mongodb:27017/cooksy?authSource=admin
   JWT_SECRET=your_jwt_secret_here
   ```

2. **Create frontend `.env` file** (`frontend/.env`):
   ```
   VITE_BASE_ROUTE=/cooksy
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost/cooksy
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

## Docker Commands

### Build and run all services:
```bash
docker-compose up --build
```

### Run in detached mode (background):
```bash
docker-compose up -d --build
```

### Stop all services:
```bash
docker-compose down
```

### Stop and remove volumes (clears MongoDB data):
```bash
docker-compose down -v
```

### View logs:
```bash
docker-compose logs -f
```

### View logs for specific service:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Rebuild specific service:
```bash
docker-compose build backend
docker-compose build frontend
```

### Restart a specific service:
```bash
docker-compose restart backend
docker-compose restart frontend
```

## Services

1. **MongoDB** - Database service running on port 27017
2. **Backend** - Node.js/Express API running on port 3000
3. **Frontend** - React/Vite app served via Nginx on port 80

## Project Structure

```
.
├── docker-compose.yml          # Main orchestration file
├── backend/
│   ├── Dockerfile
│   ├── .env
│   ├── server.js
│   └── ... (backend code)
└── frontend/
    ├── Dockerfile
    ├── .env
    └── ... (frontend code)
```

## Notes

- All services are on the same Docker network (`cooksy-network`) for communication
- MongoDB data is persisted in a Docker volume
- Backend code is mounted as a volume for development (hot reload)
- Frontend is built and served statically via Nginx
- Services start in order: MongoDB → Backend → Frontend

