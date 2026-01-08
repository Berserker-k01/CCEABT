# 🌐 CCEABT - Système de Collecte de Données avec Google Drive

## 📋 Vue d'ensemble

Système complet d'upload automatique de fichiers vers Google Drive pour le portail partenaire CCEABT.

### Architecture

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────────┐
│  Frontend React │────────▶│ Backend API  │────────▶│  Google Drive   │
│  (Port 5173)    │         │  (Port 5000) │         │   CCEABT        │
└─────────────────┘         └──────────────┘         └─────────────────┘
     Partenaire              Node.js/Express           Stockage Cloud
```

### Flux de travail

1. **Partenaire** : Remplit le formulaire + sélectionne un fichier
2. **Frontend** : Envoie le fichier vers l'API backend
3. **Backend** : Upload automatique vers Google Drive CCEABT
4. **Résultat** : 
   - ✅ Succès → Statut "Réussi" + lien Drive
   - ❌ Échec → Statut "Échoué" + message d'erreur

---

## 🚀 Installation Rapide

### 1. Backend
```bash
cd backend
npm install
```

Suivez le guide : [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)

### 2. Frontend (déjà configuré)
Le frontend est déjà configuré pour communiquer avec le backend sur `http://localhost:5000`

---

## 🎯 Utilisation

### Démarrer le Backend
```bash
cd backend
npm run dev
```

### Démarrer le Frontend
```bash
cd ..
npm run dev
```

### Tester
1. Allez sur http://localhost:5173/portal
2. Connectez-vous avec un compte partenaire
3. Remplissez le formulaire et uploadez un fichier
4. Le fichier apparaît automatiquement dans votre Drive CCEABT !

---

## 📁 Structure du Projet

```
CCEABT/
├── backend/                    # API Node.js
│   ├── server.js              # Serveur Express + Google Drive
│   ├── package.json           # Dépendances backend
│   ├── .env                   # Configuration (à créer)
│   ├── .env.example           # Template de configuration
│   ├── uploads/               # Stockage temporaire (auto-nettoyé)
│   ├── README.md              # Documentation technique
│   ├── CONFIGURATION_GUIDE.md # Guide de config Google Drive
│   └── QUICKSTART.md          # Démarrage rapide
│
├── src/                       # Frontend React
│   ├── pages/
│   │   ├── PartnerPortal.tsx # Formulaire d'upload
│   │   └── Admin.tsx         # Dashboard admin
│   └── context/
│       └── DataContext.tsx   # Gestion des soumissions
│
└── README.md                  # Ce fichier
```

---

## 🔐 Sécurité

- ✅ Fichiers uploadés temporairement puis supprimés
- ✅ Validation des types de fichiers (PDF, Word, Excel)
- ✅ Limite de taille : 50MB
- ✅ CORS configuré pour le frontend uniquement
- ✅ Credentials Google isolés dans `.env`
- ✅ `.env` dans `.gitignore`

---

## 📊 Statuts des Soumissions

| Statut | Description | Couleur |
|--------|-------------|---------|
| 🟡 **En attente** | Soumission créée, upload en cours | Jaune |
| 🟢 **Réussi** | Fichier uploadé avec succès sur Drive | Vert |
| 🔴 **Échoué** | Erreur lors de l'upload | Rouge |

---

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** + **Express** : Serveur API
- **Multer** : Gestion des uploads
- **Google APIs** : Intégration Drive
- **dotenv** : Variables d'environnement

### Frontend
- **React** + **TypeScript** : Interface utilisateur
- **Vite** : Build tool
- **Tailwind CSS** : Styling
- **Lucide React** : Icônes

---

## 📞 Support

### Problèmes courants

**Backend ne démarre pas**
→ Vérifiez que le `.env` est correctement configuré

**Erreur "Invalid grant"**
→ Le service account n'a pas accès au dossier Drive

**Upload échoue**
→ Vérifiez les logs du backend (`npm run dev`)

### Logs

Les logs du backend affichent :
- ✅ Uploads réussis avec ID du fichier
- ❌ Erreurs détaillées
- 📊 Informations de démarrage

---

## 🎓 Pour aller plus loin

- [Documentation Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [Guide Multer](https://github.com/expressjs/multer)
- [Express.js](https://expressjs.com/)

---

## 📝 Licence

© 2024 CCEABT - Tous droits réservés
