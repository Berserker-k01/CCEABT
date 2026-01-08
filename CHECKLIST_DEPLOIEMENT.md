# ✅ Checklist de Déploiement LWS - CCEABT

## Avant le Déploiement

### Configuration Google Drive
- [ ] Projet Google Cloud créé
- [ ] API Google Drive activée
- [ ] Service Account créé
- [ ] Fichier JSON téléchargé et sauvegardé
- [ ] Dossier Drive créé et partagé avec le service account
- [ ] ID du dossier Drive copié

### Préparation Locale
- [ ] Backend testé en local (`npm run dev` dans /backend)
- [ ] Frontend testé en local (`npm run dev` à la racine)
- [ ] Upload de fichier testé et fonctionnel
- [ ] Fichier `.env.production` configuré avec votre domaine

---

## Build et Préparation

### Build du Projet
- [ ] Exécuter `build-for-lws.bat` (ou `npm run build`)
- [ ] Vérifier que le dossier `dist/` est créé
- [ ] Vérifier que `build.zip` est créé (si script utilisé)

### Fichiers à Uploader
- [ ] Contenu de `dist/` (frontend)
- [ ] Dossier `backend/` complet
- [ ] Fichier `public/.htaccess`

---

## Configuration LWS

### Accès et Domaine
- [ ] Accès au panel LWS confirmé
- [ ] Domaine principal configuré
- [ ] Sous-domaine API créé (`api.votre-domaine.com`)
- [ ] Certificat SSL activé pour les deux domaines

### Upload des Fichiers
- [ ] Frontend uploadé dans `/public_html/`
- [ ] Backend uploadé dans `/nodejs/backend/`
- [ ] Fichier `.htaccess` uploadé dans `/public_html/`
- [ ] Permissions des fichiers vérifiées (755 pour dossiers, 644 pour fichiers)

### Configuration Node.js
- [ ] Application Node.js créée dans le panel LWS
- [ ] Version Node.js sélectionnée (16.x ou supérieure)
- [ ] Chemin configuré : `/nodejs/backend`
- [ ] Fichier de démarrage : `server.js`
- [ ] Port configuré (3000 par défaut)
- [ ] Domaine lié : `api.votre-domaine.com`

### Variables d'Environnement
- [ ] Fichier `.env` créé dans `/nodejs/backend/`
- [ ] `PORT` configuré
- [ ] `GOOGLE_DRIVE_FOLDER_ID` renseigné
- [ ] `GOOGLE_CLIENT_EMAIL` renseigné
- [ ] `GOOGLE_PRIVATE_KEY` renseignée (avec `\n` préservés)

### Installation des Dépendances
- [ ] Connexion SSH établie
- [ ] `cd ~/nodejs/backend` exécuté
- [ ] `npm install --production` exécuté avec succès
- [ ] Pas d'erreurs dans les logs

---

## Tests et Vérification

### Tests Frontend
- [ ] Site accessible sur `https://votre-domaine.com`
- [ ] Page d'accueil s'affiche correctement
- [ ] Navigation entre les pages fonctionne
- [ ] Images et styles chargés
- [ ] Pas d'erreurs dans la console du navigateur

### Tests Backend
- [ ] API accessible sur `https://api.votre-domaine.com/api/health`
- [ ] Réponse JSON correcte : `{"status":"OK",...}`
- [ ] Pas d'erreur 502 ou 503

### Tests Fonctionnels
- [ ] Connexion au portail partenaire fonctionne
- [ ] Formulaire de soumission s'affiche
- [ ] Sélection de fichier fonctionne
- [ ] Upload de fichier réussit
- [ ] Fichier apparaît dans Google Drive
- [ ] Statut "Réussi" affiché dans l'admin
- [ ] Lien Google Drive cliquable et fonctionnel

### Tests Admin
- [ ] Accès à `/cceabtadmin` fonctionne
- [ ] Connexion admin réussie
- [ ] Onglet "Collecte de données" affiche les soumissions
- [ ] Filtres (Tous/En attente/Réussi/Échoué) fonctionnent
- [ ] Liens vers Google Drive fonctionnels

---

## Sécurité et Performance

### Sécurité
- [ ] HTTPS activé et fonctionnel
- [ ] Redirection HTTP → HTTPS active
- [ ] Fichier `.env` non accessible depuis le web
- [ ] Credentials Google Drive sécurisés
- [ ] Mot de passe admin changé (différent de `admin123`)

### Performance
- [ ] Compression Gzip activée
- [ ] Cache des fichiers statiques configuré
- [ ] Images optimisées
- [ ] Temps de chargement < 3 secondes

---

## Monitoring et Maintenance

### Logs
- [ ] Logs backend accessibles
- [ ] Pas d'erreurs critiques dans les logs
- [ ] Système de monitoring configuré (optionnel)

### Backup
- [ ] Backup du code source (Git)
- [ ] Backup de la configuration `.env`
- [ ] Backup du fichier JSON Google Drive

### Documentation
- [ ] Équipe formée sur l'utilisation
- [ ] Documentation accessible
- [ ] Contacts support LWS notés

---

## 🎉 Déploiement Terminé !

Une fois toutes les cases cochées, votre site CCEABT est officiellement en production !

### URLs de Production
- **Site principal** : https://votre-domaine.com
- **API Backend** : https://api.votre-domaine.com
- **Portail Partenaire** : https://votre-domaine.com/portal
- **Admin** : https://votre-domaine.com/cceabtadmin

### Prochaines Étapes
1. Communiquer les URLs aux partenaires
2. Former les administrateurs
3. Monitorer les premiers uploads
4. Ajuster si nécessaire

---

## 📞 Support

En cas de problème :
1. Consultez `DEPLOIEMENT_LWS.md`
2. Vérifiez les logs backend
3. Contactez le support LWS : support@lws.fr
4. Vérifiez la configuration Google Drive

**Bon déploiement ! 🚀**
