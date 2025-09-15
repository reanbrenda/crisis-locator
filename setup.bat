@echo off
echo Setting up Crisis Resource Locator...

echo Installing backend dependencies...
cd backend
call npm install
echo Backend dependencies installed

echo Building backend...
call npm run build
echo Backend built successfully

echo Installing frontend dependencies...
cd ..\frontend
call npm install
echo Frontend dependencies installed

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Start backend: cd backend ^&^& npm run dev
echo 2. Start frontend: cd frontend ^&^& npm start
echo.
echo Backend will run on http://localhost:3001
echo Frontend will run on http://localhost:3000
pause
