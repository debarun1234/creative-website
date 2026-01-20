#!/bin/bash

# Start Backend Server
echo "Starting Backend Server on port 5000..."
cd backend
node ./dist/server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Frontend Server
echo "Starting Frontend Server on port 3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop servers"

# Wait for all background jobs
wait
