@echo off
cd /d "%~dp0"
echo Logging in to Vercel...
vercel login
echo Linking to existing project...
vercel link
echo Deploying to production...
vercel deploy --prod
echo.
echo Done! Check the URL above.
pause