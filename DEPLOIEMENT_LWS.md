# 🚀 Guide de Déploiement LWS - CCEABT

## 📋 Prérequis

Votre hébergement LWS doit avoir :
- ✅ Support Node.js (version 16 ou supérieure)
- ✅ Accès SSH
- ✅ Base de données (optionnel pour ce projet)

---

## 🎯 Architecture de Déploiement

```
LWS Hébergement
├── /frontend/          → Build React (fichiers statiques)
├── /backend/           → API Node.js
└── Configuration       → Variables d'environnement
```

---

## 📦 Étape 1 : Préparer le Frontend

### 1.1 Configurer l'URL du Backend

Créez un fichier `.env.production` à la racine du projet :

```env
VITE_API_URL=https://votre-domaine.com/api
```

### 1.2 Mettre à jour PartnerPortal.tsx

Modifiez l'URL de l'API pour utiliser la variable d'environnement :

```typescript
// Remplacez
const response = await fetch('http://localhost:5000/api/upload', {

// Par
const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, {
```

### 1.3 Builder le Frontend

```bash
npm run build
```

Cela crée un dossier `dist/` avec tous les fichiers statiques.

---

## 🔧 Étape 2 : Préparer le Backend

### 2.1 Créer un fichier de démarrage

Créez `backend/start.js` :

```javascript
const { spawn } = require('child_process');

const server = spawn('node', ['server.js'], {
  env: { ...process.env },
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('Erreur serveur:', err);
});

process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});
```

### 2.2 Mettre à jour package.json du backend

Ajoutez dans `backend/package.json` :

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### 2.3 Créer .htaccess pour le backend (si Apache)

Créez `backend/.htaccess` :

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ server.js [L,QSA]
```

---

## 📤 Étape 3 : Upload vers LWS

### Option A : Via FTP/SFTP (Recommandé pour débutants)

1. **Connectez-vous via FileZilla** :
   - Hôte : `ftp.votre-domaine.com`
   - Utilisateur : Votre login LWS
   - Mot de passe : Votre mot de passe LWS
   - Port : 21 (FTP) ou 22 (SFTP)

2. **Uploadez les fichiers** :
   ```
   /public_html/
   ├── index.html (depuis dist/)
   ├── assets/ (depuis dist/assets/)
   └── ... (tous les fichiers de dist/)
   
   /nodejs/
   └── backend/
       ├── server.js
       ├── package.json
       ├── node_modules/ (sera installé sur le serveur)
       └── .env (à créer sur le serveur)
   ```

### Option B : Via SSH/Git (Recommandé pour avancés)

```bash
# 1. Connectez-vous en SSH
ssh votre-login@votre-domaine.com

# 2. Clonez votre repository (si vous utilisez Git)
git clone https://github.com/votre-compte/cceabt.git

# 3. Ou uploadez via SCP
scp -r dist/* votre-login@votre-domaine.com:/public_html/
scp -r backend/* votre-login@votre-domaine.com:/nodejs/backend/
```

---

## ⚙️ Étape 4 : Configuration sur LWS

### 4.1 Installer les dépendances Node.js

Via SSH :
```bash
cd ~/nodejs/backend
npm install --production
```

### 4.2 Configurer les variables d'environnement

Créez le fichier `.env` sur le serveur :

```bash
nano ~/nodejs/backend/.env
```

Collez votre configuration :
```env
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=votre_folder_id
GOOGLE_CLIENT_EMAIL=votre_service_account@projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4.3 Configurer l'application Node.js dans le panel LWS

1. Connectez-vous au **Panel LWS**
2. Allez dans **Hébergement Web** → **Node.js**
3. Cliquez sur **Ajouter une application**
4. Remplissez :
   - **Nom** : CCEABT Backend
   - **Version Node.js** : 16.x ou supérieure
   - **Chemin** : `/nodejs/backend`
   - **Fichier de démarrage** : `server.js`
   - **Port** : 3000 (ou celui défini dans .env)
   - **Domaine** : `api.votre-domaine.com` (sous-domaine recommandé)

5. Cliquez sur **Créer**

---

## 🌐 Étape 5 : Configuration DNS et Domaines

### 5.1 Configurer le sous-domaine API

Dans le panel LWS :
1. **Domaines** → **Sous-domaines**
2. Créez `api.votre-domaine.com`
3. Pointez vers `/nodejs/backend`

### 5.2 Configurer HTTPS (SSL)

1. **SSL/TLS** → **Let's Encrypt**
2. Activez SSL pour :
   - `votre-domaine.com`
   - `api.votre-domaine.com`

---

## 🔄 Étape 6 : Configuration du Proxy (Important !)

### 6.1 Créer .htaccess dans public_html

Créez `/public_html/.htaccess` :

```apache
# Activer la réécriture
RewriteEngine On

# Rediriger les appels API vers le backend Node.js
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ https://api.votre-domaine.com/$1 [P,L]

# Gérer les routes React (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Activer CORS pour l'API
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

---

## ✅ Étape 7 : Vérification et Tests

### 7.1 Tester le Frontend
```
https://votre-domaine.com
```
→ Doit afficher le site CCEABT

### 7.2 Tester le Backend
```
https://api.votre-domaine.com/api/health
```
→ Doit retourner : `{"status":"OK","message":"CCEABT Backend API is running"}`

### 7.3 Tester l'Upload
1. Allez sur `https://votre-domaine.com/portal`
2. Connectez-vous
3. Uploadez un fichier test
4. Vérifiez dans Google Drive

---

## 🔧 Étape 8 : Maintenance et Monitoring

### 8.1 Logs du Backend

Via SSH :
```bash
# Voir les logs en temps réel
pm2 logs cceabt-backend

# Ou si pas de PM2
tail -f ~/nodejs/backend/logs/app.log
```

### 8.2 Redémarrer le Backend

Dans le panel LWS :
- **Node.js** → **Applications** → **Redémarrer**

Ou via SSH :
```bash
pm2 restart cceabt-backend
```

### 8.3 Mettre à jour le site

```bash
# Frontend
npm run build
# Uploadez le contenu de dist/ vers /public_html/

# Backend
# Uploadez les fichiers modifiés
ssh votre-login@votre-domaine.com
cd ~/nodejs/backend
npm install
pm2 restart cceabt-backend
```

---

## 🐛 Dépannage

### Le backend ne démarre pas
```bash
# Vérifier les logs
cat ~/nodejs/backend/logs/error.log

# Vérifier les permissions
chmod -R 755 ~/nodejs/backend
```

### Erreur CORS
→ Vérifiez le fichier `.htaccess` dans `/public_html/`

### Upload échoue
→ Vérifiez que le `.env` est correctement configuré sur le serveur

### 502 Bad Gateway
→ Le backend n'est pas démarré, redémarrez-le depuis le panel LWS

---

## 📞 Support LWS

- **Documentation** : https://aide.lws.fr/
- **Support** : support@lws.fr
- **Téléphone** : +33 (0)1 77 62 30 03

---

## 🎉 Félicitations !

Votre site CCEABT est maintenant en production sur LWS avec :
- ✅ Frontend React optimisé
- ✅ Backend Node.js avec Google Drive
- ✅ HTTPS activé
- ✅ Upload automatique fonctionnel

**URL de production** :
- Site : https://votre-domaine.com
- API : https://api.votre-domaine.com
- Portail : https://votre-domaine.com/portal
- Admin : https://votre-domaine.com/cceabtadmin
