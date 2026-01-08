# CCEABT Backend API

Backend Node.js pour le portail partenaire CCEABT avec intégration Google Drive.

## 🚀 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration Google Drive

### Étape 1 : Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet "CCEABT-Portal"
3. Activez l'API Google Drive :
   - Menu → APIs & Services → Enable APIs and Services
   - Recherchez "Google Drive API"
   - Cliquez sur "Enable"

### Étape 2 : Créer un Service Account

1. Menu → APIs & Services → Credentials
2. Cliquez sur "Create Credentials" → "Service Account"
3. Nom : `cceabt-drive-uploader`
4. Rôle : `Editor` (ou créez un rôle personnalisé)
5. Cliquez sur "Done"

### Étape 3 : Générer la clé privée

1. Cliquez sur le service account créé
2. Onglet "Keys" → "Add Key" → "Create new key"
3. Format : **JSON**
4. Téléchargez le fichier JSON

### Étape 4 : Configurer le dossier Google Drive

1. Créez un dossier sur votre Google Drive : "CCEABT - Rapports Partenaires"
2. Cliquez droit → Partager
3. Ajoutez l'email du service account (trouvé dans le JSON téléchargé)
4. Donnez les droits "Éditeur"
5. Copiez l'ID du dossier depuis l'URL :
   ```
   https://drive.google.com/drive/folders/VOTRE_FOLDER_ID_ICI
   ```

### Étape 5 : Configuration des variables d'environnement

1. Copiez `.env.example` vers `.env` :
   ```bash
   cp .env.example .env
   ```

2. Ouvrez le fichier JSON téléchargé et remplissez `.env` :
   ```env
   PORT=5000
   GOOGLE_DRIVE_FOLDER_ID=votre_folder_id_copié
   GOOGLE_CLIENT_EMAIL=email_du_service_account@projet.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVotre_clé_privée_complète_ici\n-----END PRIVATE KEY-----\n"
   ```

   ⚠️ **Important** : La clé privée doit être entre guillemets et conserver les `\n`

## 🏃 Démarrage

### Mode développement (avec auto-reload)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📡 Endpoints API

### Health Check
```
GET /api/health
```

### Upload de fichier
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: fichier (PDF, Word, Excel)
- partnerName: string
- projectTitle: string
- location: string
- period: string
- beneficiaries: number
- budget: string
- details: string
```

**Réponse succès** :
```json
{
  "success": true,
  "message": "Fichier uploadé avec succès sur Google Drive",
  "data": {
    "fileId": "1abc...",
    "webViewLink": "https://drive.google.com/file/d/...",
    "fileName": "PartenaireName_ProjetTitle_2024-01-08.pdf",
    "uploadedAt": "2024-01-08T10:30:00.000Z"
  }
}
```

## 🔒 Sécurité

- Validation des types de fichiers (PDF, Word, Excel uniquement)
- Limite de taille : 50MB
- CORS activé pour le frontend
- Nettoyage automatique des fichiers temporaires
- Permissions Google Drive configurées automatiquement

## 📝 Notes

- Les fichiers sont stockés temporairement dans `/uploads` puis supprimés après upload sur Drive
- Chaque fichier uploadé reçoit automatiquement les permissions "Accessible à tous ceux qui ont le lien"
- Les noms de fichiers sont formatés : `NomPartenaire_TitreProjet_Timestamp.extension`

## 🐛 Dépannage

### Erreur "Invalid grant"
- Vérifiez que l'email du service account a bien accès au dossier Drive
- Vérifiez que la clé privée est correctement formatée dans `.env`

### Erreur "File not found"
- Vérifiez que `GOOGLE_DRIVE_FOLDER_ID` est correct
- Assurez-vous que le service account a les droits sur le dossier

### Port déjà utilisé
- Changez le `PORT` dans `.env`
- Ou arrêtez le processus utilisant le port 5000
