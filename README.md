# 📚 CCEABT - Documentation Complète

## 🎯 Vue d'Ensemble du Projet

Site web professionnel pour le CCEABT (Conseil de Concertation pour l'Eau et l'Assainissement de Base au Togo) avec système de collecte de données via Google Drive.

---

## 📁 Structure de la Documentation

### Pour le Développement Local

1. **BACKEND_README.md**
   - Architecture complète du système
   - Flux de travail upload → Google Drive
   - Technologies utilisées

2. **backend/CONFIGURATION_GUIDE.md**
   - Guide détaillé Google Cloud Console
   - Configuration Service Account
   - Setup Google Drive API
   - Configuration `.env`

3. **backend/QUICKSTART.md**
   - Installation rapide (5 minutes)
   - Commandes essentielles
   - Tests de base

### Pour le Déploiement Production

4. **DEPLOIEMENT_LWS.md** ⭐
   - Guide complet pour LWS
   - Configuration DNS et SSL
   - Setup Node.js sur LWS
   - Configuration Apache (.htaccess)
   - Tests de production

5. **CHECKLIST_DEPLOIEMENT.md** ✅
   - Checklist étape par étape
   - Vérifications avant/après déploiement
   - Tests fonctionnels
   - Sécurité et performance

### Scripts Utiles

6. **build-for-lws.bat**
   - Build automatique du projet
   - Création de l'archive pour LWS
   - Préparation backend

7. **backend/create-env.bat**
   - Création automatique du fichier `.env`
   - Template pré-rempli

---

## 🚀 Démarrage Rapide

### Développement Local

```bash
# 1. Backend
cd backend
npm install
# Configurez .env (voir CONFIGURATION_GUIDE.md)
npm run dev

# 2. Frontend (nouveau terminal)
cd ..
npm install
npm run dev
```

### Build pour Production

```bash
# Windows
build-for-lws.bat

# Ou manuellement
npm run build
```

---

## 📖 Guides par Cas d'Usage

### Je veux développer en local
1. Lisez `backend/QUICKSTART.md`
2. Suivez `backend/CONFIGURATION_GUIDE.md` pour Google Drive
3. Lancez `npm run dev` (frontend et backend)

### Je veux déployer sur LWS
1. Lisez `DEPLOIEMENT_LWS.md` en entier
2. Utilisez `CHECKLIST_DEPLOIEMENT.md` pendant le déploiement
3. Exécutez `build-for-lws.bat`
4. Suivez les étapes du guide LWS

### Je veux comprendre l'architecture
1. Lisez `BACKEND_README.md`
2. Consultez le code dans `/backend/server.js`
3. Regardez `/src/pages/PartnerPortal.tsx`

---

## 🔑 Fichiers de Configuration Importants

### Développement
- `backend/.env` - Credentials Google Drive (local)
- `.env.production` - URL API pour le build

### Production
- `public/.htaccess` - Configuration Apache
- `backend/.env` - Credentials sur le serveur LWS

---

## 🌐 URLs du Projet

### Développement
- Frontend : http://localhost:5173
- Backend : http://localhost:5000
- API Health : http://localhost:5000/api/health

### Production (à configurer)
- Site : https://votre-domaine.com
- API : https://api.votre-domaine.com
- Portail : https://votre-domaine.com/portal
- Admin : https://votre-domaine.com/cceabtadmin

---

## 🔐 Credentials et Sécurité

### Fichiers Sensibles (NE JAMAIS COMMITER)
- `backend/.env`
- Fichier JSON du Service Account Google
- Credentials admin

### Fichiers Protégés par .gitignore
- `backend/.env`
- `backend/node_modules/`
- `backend/uploads/`
- `dist/`

---

## 📞 Support et Ressources

### Documentation Externe
- [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [LWS Documentation](https://aide.lws.fr/)
- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)

### Support LWS
- Email : support@lws.fr
- Téléphone : +33 (0)1 77 62 30 03
- Panel : https://panel.lws.fr/

---

## 🎓 Formation Équipe

### Administrateurs
- Accès : `/cceabtadmin`
- Login par défaut : `admin` / `admin123` (À CHANGER !)
- Fonctions : Gestion news, partenaires, soumissions

### Partenaires
- Accès : `/portal`
- Login : Email + mot de passe (configuré par admin)
- Fonction : Upload de rapports vers Google Drive

---

## 🔄 Workflow de Mise à Jour

### Mise à jour du Code

```bash
# 1. Développement local
git pull
npm install
npm run dev

# 2. Test des modifications

# 3. Build pour production
build-for-lws.bat

# 4. Upload sur LWS (FTP/SSH)

# 5. Redémarrer le backend Node.js
```

---

## ✅ Checklist Avant Production

- [ ] Google Drive configuré et testé
- [ ] Backend fonctionne en local
- [ ] Frontend fonctionne en local
- [ ] Upload testé avec succès
- [ ] `.env.production` configuré
- [ ] Build réussi sans erreurs
- [ ] Documentation lue et comprise
- [ ] Backup du code effectué
- [ ] Credentials sauvegardés en sécurité

---

## 🎉 Félicitations !

Vous avez maintenant accès à toute la documentation nécessaire pour :
- ✅ Développer en local
- ✅ Configurer Google Drive
- ✅ Déployer sur LWS
- ✅ Maintenir le système

**Prochaine étape recommandée** : Lisez `DEPLOIEMENT_LWS.md` pour préparer votre déploiement !
