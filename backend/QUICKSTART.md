# 🚀 Guide de Démarrage Rapide - CCEABT Backend

## Installation en 5 minutes

### 1. Installer les dépendances du backend
```bash
cd backend
npm install
```

### 2. Configurer Google Drive (IMPORTANT)

#### A. Créer le projet Google Cloud
1. Allez sur https://console.cloud.google.com/
2. Créez un projet "CCEABT-Portal"
3. Activez l'API Google Drive

#### B. Créer le Service Account
1. Menu → APIs & Services → Credentials
2. Create Credentials → Service Account
3. Téléchargez le fichier JSON

#### C. Configurer le dossier Drive
1. Créez un dossier sur votre Drive : "CCEABT - Rapports"
2. Partagez-le avec l'email du service account (dans le JSON)
3. Copiez l'ID du dossier depuis l'URL

#### D. Configurer les variables
```bash
cp .env.example .env
```

Éditez `.env` avec vos informations du fichier JSON.

### 3. Démarrer le backend
```bash
npm run dev
```

Le serveur démarre sur http://localhost:5000

### 4. Tester
```bash
# Dans un autre terminal
curl http://localhost:5000/api/health
```

Vous devriez voir : `{"status":"OK","message":"CCEABT Backend API is running"}`

## ✅ C'est prêt !

Le frontend enverra automatiquement les fichiers vers Google Drive.

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
- Le service account a bien accès au dossier Drive
- La clé privée dans `.env` est correctement formatée
- Le port 5000 n'est pas déjà utilisé
