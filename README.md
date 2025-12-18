# Portfolio - Archange Elie Yatte

Portfolio professionnel de Archange Elie Yatte, Développeur Full-Stack et Analyste en Cybersécurité.

## 🚀 Technologies

- **React** + **TypeScript** - Framework frontend
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes

## 📁 Structure du projet

```
/portfolio
├── /public
│   └── /media
│       └── CV_YATTE_ARCHANGE.pdf
├── /src
│   ├── /components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── /pages
│   │   └── Index.tsx
│   ├── index.css
│   └── main.tsx
├── tailwind.config.ts
└── index.html
```

## 🛠️ Installation

1. Cloner le repository :
```bash
git clone https://github.com/archangeyatte/portfolio.git
cd portfolio
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:5173](http://localhost:5173)

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🌐 Déploiement sur Vercel

### Via l'interface web de Vercel :

1. Connectez-vous à [Vercel](https://vercel.com/)
2. Cliquez sur "New Project"
3. Importez votre repository depuis GitHub
4. Vercel détectera automatiquement la configuration Vite
5. Assurez-vous que les paramètres suivants sont configurés :
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Cliquez sur "Deploy"

### Via la CLI Vercel :

```bash
npm i -g vercel
vercel deploy
```

### Configuration personnalisée :

Un fichier `vercel.json` est inclus dans le projet avec les paramètres nécessaires pour le déploiement.

## 📧 Configuration EmailJS

Pour activer le formulaire de contact, vous devez configurer EmailJS :

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un service email (SMTP ou service existant comme Gmail)
3. Créez deux templates d'email :
   - **Template principal** avec les champs : `from_name`, `from_email`, `message`, `to_name`
   - **Template d'auto-réponse** avec les champs : `from_name`, `to_name`, `to_email`, `message`
4. Copiez votre Service ID, Template IDs et Public Key
5. Configurez les variables d'environnement dans Vercel :
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

Vous pouvez également créer un fichier `.env` local avec ces valeurs pour le développement.

## 📄 CV

Le CV est disponible au téléchargement via le bouton "Télécharger mon CV" ou directement à l'adresse `/media/CV_YATTE_ARCHANGE.pdf`.

## 📧 Contact

- **Email** : archangeyatte@gmail.com
- **Téléphone** : +225 05 75 92 58 80
- **LinkedIn** : [linkedin.com/in/archangeyatte](https://linkedin.com/in/archangeyatte)
- **GitHub** : [github.com/archangeyatte](https://github.com/archangeyatte)

## 📝 Licence

MIT © Archange Elie Yatte
