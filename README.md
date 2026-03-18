# 🚀 Meet Gadhiya — Personal Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Meet%20Gadhiya-63ffaa?style=for-the-badge&logo=react&logoColor=black)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, dark-themed personal portfolio built with React & Tailwind CSS**

[🌐 Live Demo](#) • [📧 Contact](mailto:mitgadhiya16@gmail.com) • [💼 LinkedIn](#)

</div>

---

## 📸 Preview

> Dark terminal-style UI with neon green accents, animated marquee ticker, scroll-reveal effects, and a fully responsive layout.

---

## ✨ Features

- 🎢 **Animated Marquee Banner** — Scrolling ticker showing "Available for Internship" and other status messages
- 🌑 **Dark Terminal Theme** — Deep dark background with `#63ffaa` neon green accents
- 🎞️ **Scroll-Reveal Animations** — Every section fades in smoothly as you scroll
- 💫 **Floating Glow Blobs** — Animated radial gradient blobs in the hero section
- 🧩 **Skill Cards** — Interactive hover-lift cards for each tech skill with brand colors
- 📊 **Animated Language Bars** — Progress bars that animate when scrolled into view
- 🃏 **Project Cards** — Cards with gradient top-border and hover effects
- 📍 **Education Timeline** — Visual timeline with icons for each education entry
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ⚡ **Fast & Lightweight** — No heavy dependencies, pure React + Tailwind

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **Tailwind CSS** | Utility-first styling |
| **JetBrains Mono** | Monospace / code-style font |
| **Bebas Neue** | Display / heading font |
| **DM Sans** | Body text font |
| **CSS Keyframes** | Marquee, blob float, pulse animations |
| **IntersectionObserver API** | Scroll-reveal & progress bar triggers |

---

## 📁 Project Structure

```
meet-portfolio/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.jsx          # Root component
│   └── meet-portfolio.jsx  # Main portfolio component (all-in-one)
│
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/meet-portfolio.git
cd meet-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Tailwind CSS** *(if not already set up)*

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Configure Tailwind** — update `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. **Add Tailwind directives** to `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **Start the development server**

```bash
npm run dev
# or
npm start
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` or `build/` folder, ready to deploy.

---

## 🌐 Deployment

You can deploy this portfolio easily on:

### Vercel *(recommended)*
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the build/ folder to netlify.com/drop
```

### GitHub Pages
```bash
npm install -D gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run build
npm run deploy
```

---

## 📂 Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, status badge, stats, and CTA buttons |
| **Marquee** | Scrolling "Available for Internship" ticker banner |
| **Skills** | Technical stack (MERN) + soft skills |
| **Projects** | AI Chatbot & E-Commerce Platform showcases |
| **Education** | BCA at VNSGU + MERN Stack certification |
| **Languages** | Gujarati, Hindi, English with animated bars |
| **Contact** | Phone, email, location + contact CTA |

---

## 🎨 Customization

### Change accent color
Find and replace `#63ffaa` with your preferred color throughout the component.

### Update personal info
Edit the data arrays at the top of `meet-portfolio.jsx`:

```jsx
const skills = [ ... ]       // Your tech skills
const projects = [ ... ]     // Your projects
const education = [ ... ]    // Your education
const languages = [ ... ]    // Your languages
const contacts = [ ... ]     // Your contact info
```

### Change marquee text
```jsx
const marqueeItems = [
  "✦ Available for Internship",
  "✦ Your Custom Message",
  // add more...
]
```

### Adjust animation speed
```css
/* In GlobalStyles, change the duration */
.marquee-track { animation: marquee 18s linear infinite; }
/*                                   ^^^^ increase to slow down */
```

---

## 👤 About Me

**Meet Gadhiya** — Full Stack Developer (MERN)

- 🎓 Pursuing BCA at **Sutex Bank College, VNSGU**, Surat (2024–2027)
- 💻 Certified in **Full Stack Web Development (MERN Stack)** from Toptel Multimedia
- 🌱 Eager to build real-world applications and grow as a developer
- 📍 Based in **Surat, Gujarat, India**

---

## 📬 Contact

| Platform | Details |
|---|---|
| 📧 Email | [mitgadhiya16@gmail.com](mailto:mitgadhiya16@gmail.com) |
| 📞 Phone | +91 8488884002 |
| 🌐 Website | [reallygreatsite.com](https://reallygreatsite.com) |
| 📍 Location | Pasodra, Surat, Gujarat |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License — feel free to use, modify, and share with attribution.
```

---

<div align="center">

Made with ❤️ by **Meet Gadhiya**

⭐ If you like this portfolio, give it a star on GitHub!

</div>
