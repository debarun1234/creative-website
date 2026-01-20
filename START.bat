@echo off
REM Start Backend Server
echo Starting Backend Server on port 5000...
start cmd /k "cd backend && node ./dist/server.js"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start Frontend Server
echo Starting Frontend Server on port 3000...
start cmd /k "cd frontend && npm run dev"

echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
