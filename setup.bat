@echo off
REM CineMind Quick Start Script for Windows
REM This script sets up and starts the CineMind application

setlocal enabledelayedexpansion

echo.
echo 🎬 Welcome to CineMind Setup!
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✓ Node.js found

REM Setup Backend
echo.
echo Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your API keys:
    echo  - TMDB_API_KEY
    echo  - GEMINI_API_KEY
    echo  - MONGO_URI
)

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

echo ✓ Backend ready
cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

if not exist ".env.local" (
    echo Creating .env.local file from .env.example...
    copy .env.example .env.local
)

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo ✓ Frontend ready
cd ..

echo.
echo ================================
echo ✓ Setup complete!
echo ================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend ^&^& npm run dev
echo.
echo Frontend will open at: http://localhost:5173
echo Backend API: http://localhost:5000/api
echo.
echo For more details, see SETUP_GUIDE.md
echo.
pause
