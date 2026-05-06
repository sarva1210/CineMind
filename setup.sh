#!/bin/bash

# CineMind Quick Start Script
# This script sets up and starts the CineMind application

set -e

echo "🎬 Welcome to CineMind Setup!"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found${NC}"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB is not installed or not in PATH${NC}"
    echo "Please ensure MongoDB is running on localhost:27017 or update MONGO_URI in .env"
fi

# Setup Backend
echo ""
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your API keys${NC}"
    echo "  - TMDB_API_KEY"
    echo "  - GEMINI_API_KEY"
    echo "  - MONGO_URI (if using different database)"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

echo -e "${GREEN}✓ Backend ready${NC}"
cd ..

# Setup Frontend
echo ""
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd frontend

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file from .env.example..."
    cp .env.example .env.local
fi

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

echo -e "${GREEN}✓ Frontend ready${NC}"
cd ..

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "To start the application:"
echo ""
echo -e "${YELLOW}Terminal 1 - Backend:${NC}"
echo "  cd backend && npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 - Frontend:${NC}"
echo "  cd frontend && npm run dev"
echo ""
echo "Frontend will open at: http://localhost:5173"
echo "Backend API: http://localhost:5000/api"
echo ""
echo "📖 For more details, see SETUP_GUIDE.md"
