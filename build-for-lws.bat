@echo off
echo ========================================
echo   Build CCEABT pour LWS
echo ========================================
echo.

echo [1/4] Nettoyage des anciens builds...
if exist dist rmdir /s /q dist
if exist build.zip del build.zip

echo [2/4] Build du frontend React...
call npm run build

if errorlevel 1 (
    echo ❌ Erreur lors du build du frontend
    pause
    exit /b 1
)

echo [3/4] Préparation du backend...
if not exist dist\backend mkdir dist\backend
xcopy /E /I /Y backend\*.js dist\backend\
xcopy /E /I /Y backend\package.json dist\backend\
xcopy /E /I /Y backend\README.md dist\backend\

echo [4/4] Création de l'archive pour LWS...
powershell Compress-Archive -Path dist\* -DestinationPath build.zip -Force

echo.
echo ========================================
echo   ✅ Build terminé avec succès !
echo ========================================
echo.
echo 📦 Fichier créé : build.zip
echo.
echo 📋 Prochaines étapes :
echo 1. Uploadez build.zip sur votre serveur LWS
echo 2. Décompressez l'archive
echo 3. Suivez le guide DEPLOIEMENT_LWS.md
echo.
echo 📖 Guide complet : DEPLOIEMENT_LWS.md
echo.
pause
