@echo off
echo ==========================================
echo BasraVision GitHub Deployer
echo ==========================================

:: Switch to the project directory
cd /d "C:\Users\DELL\Desktop\bsrsvision"

:: Configure Git Identity (Required for commit)
echo [1/5] Configuring Git identity...
git config --global user.email "info@basravision.com"
git config --global user.name "BasraVision Developer"

:: Initialize and Commit
echo [2/5] Initializing repository...
git init
git add .
git commit -m "Initial commit: BasraVision Website"

:: Setup Remote
echo [3/5] Setting up remote repository...
git branch -M main
:: Remove origin if it exists to avoid errors
git remote remove origin 2>nul
git remote add origin https://github.com/mohammedsoczfod-hue/basravision.git

:: Push
echo [4/5] Pushing to GitHub...
echo Please sign in if prompted...
git push -u origin main

echo ==========================================
echo Deployment Complete!
pause
