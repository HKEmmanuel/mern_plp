# TutorConnect - Plateforme de Tutorat P2P

Application MERN full-stack permettant de connecter des étudiants avec des tuteurs qualifiés.

## 🚀 Stack Technique

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcryptjs

## 📁 Structure du Projet

```
mern-de-plp/
├── tutoring-platform-mvp/    # Frontend React
└── server/                    # Backend Express
```

## ⚙️ Installation

### Prérequis
- Node.js (v16+)
- MongoDB installé et en cours d'exécution

### 1. Cloner le repository
```bash
git clone <votre-repo-url>
cd "mern de plp"
```

### 2. Installation Backend
```bash
cd server
npm install
cp .env.example .env
# Modifier .env avec vos configurations
npm run dev
```

### 3. Installation Frontend
```bash
cd tutoring-platform-mvp
npm install
npm run dev
```

## 🌐 Accès

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📝 Fonctionnalités

- ✅ Inscription/Connexion (Étudiant/Tuteur)
- ✅ Création de profil tuteur
- ✅ Recherche et filtrage de tuteurs
- ✅ Demandes de sessions de tutorat
- ✅ Gestion des demandes (Accepter/Refuser)
- ✅ Authentification JWT
- ✅ Persistance MongoDB

## 🔐 Variables d'Environnement

Créez un fichier `.env` dans le dossier `server/` :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tutor-connect
JWT_SECRET=votre_secret_jwt_ici
```

## 👨‍💻 Développement

```bash
# Backend (dans /server)
npm run dev

# Frontend (dans /tutoring-platform-mvp)
npm run dev
```

## 📦 Build Production

```bash
# Frontend
cd tutoring-platform-mvp
npm run build
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT
