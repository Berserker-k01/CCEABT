@echo off
echo ========================================
echo   Configuration Backend CCEABT
echo ========================================
echo.

REM Créer le fichier .env
(
echo # Configuration Backend CCEABT
echo PORT=5000
echo.
echo # Google Drive Configuration
echo GOOGLE_DRIVE_FOLDER_ID=
echo GOOGLE_CLIENT_EMAIL=
echo GOOGLE_PRIVATE_KEY=
) > .env

echo ✅ Fichier .env créé avec succès !
echo.
echo 📝 Prochaines étapes :
echo 1. Ouvrez le fichier .env dans un éditeur de texte
echo 2. Suivez le guide CONFIGURATION_GUIDE.md
echo 3. Remplissez les variables avec vos credentials Google
echo.
echo 📖 Guide complet : CONFIGURATION_GUIDE.md
echo.
pause
