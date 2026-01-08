# 📋 Guide de Configuration Google Drive - CCEABT

## ✅ Checklist Complète

### Étape 1 : Créer le Projet Google Cloud (5 min)

1. **Accéder à Google Cloud Console**
   - Allez sur : https://console.cloud.google.com/
   - Connectez-vous avec votre compte Google CCEABT

2. **Créer un nouveau projet**
   - Cliquez sur le sélecteur de projet (en haut)
   - "New Project" → Nom : `CCEABT-Portal`
   - Cliquez sur "Create"

3. **Activer l'API Google Drive**
   - Menu (☰) → APIs & Services → Library
   - Recherchez "Google Drive API"
   - Cliquez sur "Enable"

---

### Étape 2 : Créer le Service Account (5 min)

1. **Accéder aux Credentials**
   - Menu (☰) → APIs & Services → Credentials

2. **Créer le Service Account**
   - Cliquez sur "Create Credentials" → "Service Account"
   - Nom : `cceabt-drive-uploader`
   - ID : `cceabt-drive-uploader` (auto-généré)
   - Cliquez sur "Create and Continue"

3. **Définir le rôle**
   - Role : Sélectionnez "Editor" (ou "Drive File Creator")
   - Cliquez sur "Continue" puis "Done"

4. **Générer la clé privée**
   - Cliquez sur le service account que vous venez de créer
   - Onglet "Keys" → "Add Key" → "Create new key"
   - Format : **JSON**
   - Cliquez sur "Create"
   - ⚠️ **Le fichier JSON se télécharge automatiquement - NE LE PERDEZ PAS !**

---

### Étape 3 : Configurer Google Drive (3 min)

1. **Créer le dossier de stockage**
   - Allez sur https://drive.google.com
   - Créez un nouveau dossier : "CCEABT - Rapports Partenaires"

2. **Partager avec le Service Account**
   - Clic droit sur le dossier → "Partager"
   - Copiez l'email du service account depuis le fichier JSON téléchargé
     (cherchez la clé `"client_email"`)
   - Collez cet email dans le champ de partage
   - Rôle : **Éditeur**
   - Décochez "Notifier les personnes"
   - Cliquez sur "Partager"

3. **Copier l'ID du dossier**
   - Ouvrez le dossier dans Drive
   - L'URL ressemble à : `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j`
   - Copiez la partie après `/folders/` → C'est votre **FOLDER_ID**

---

### Étape 4 : Configurer le fichier .env (2 min)

1. **Ouvrir le fichier JSON téléchargé**
   - Il contient toutes les informations nécessaires

2. **Créer le fichier .env**
   - Dans le dossier `backend/`, créez un fichier nommé `.env`

3. **Remplir les variables**
   ```env
   PORT=5000
   GOOGLE_DRIVE_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j
   GOOGLE_CLIENT_EMAIL=cceabt-drive-uploader@cceabt-portal.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```

   **Où trouver chaque valeur dans le JSON :**
   - `GOOGLE_DRIVE_FOLDER_ID` : L'ID copié depuis l'URL Drive (étape 3.3)
   - `GOOGLE_CLIENT_EMAIL` : Clé `"client_email"` dans le JSON
   - `GOOGLE_PRIVATE_KEY` : Clé `"private_key"` dans le JSON
     ⚠️ **IMPORTANT** : Gardez les guillemets et les `\n` !

---

### Étape 5 : Tester la configuration (1 min)

1. **Démarrer le serveur**
   ```bash
   cd backend
   npm run dev
   ```

2. **Vérifier le démarrage**
   Vous devriez voir :
   ```
   🚀 CCEABT Backend API démarré sur le port 5000
   📁 Dossier Google Drive: 1a2b3c4d5e6f7g8h9i0j
   ```

3. **Tester l'API**
   Ouvrez http://localhost:5000/api/health dans votre navigateur
   
   Réponse attendue :
   ```json
   {"status":"OK","message":"CCEABT Backend API is running"}
   ```

---

## ✅ Configuration terminée !

Votre backend est maintenant prêt à recevoir les uploads des partenaires.

## 🔒 Sécurité

- ⚠️ **NE JAMAIS** commiter le fichier `.env` sur Git
- ⚠️ **NE JAMAIS** partager le fichier JSON du service account
- ✅ Le fichier `.env` est déjà dans `.gitignore`

## 🐛 Dépannage

### Erreur "Invalid grant"
→ Vérifiez que le service account a bien accès au dossier Drive

### Erreur "File not found"
→ Vérifiez que le `GOOGLE_DRIVE_FOLDER_ID` est correct

### Erreur "Invalid key"
→ Vérifiez que la clé privée est complète et contient les `\n`

### Port déjà utilisé
→ Changez `PORT=5001` dans `.env`
