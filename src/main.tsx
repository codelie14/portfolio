import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loader from "./components/Loader";
import { LangProvider } from "./i18n";

// Message pour les curieux qui ouvrent la console 👀
console.log(
  "%cAY.sec%c\n🕵️ Un défi se cache ici. Tapez ⌘K puis « ctf ».\nA challenge is hidden here. Press ⌘K, then type “ctf”.",
  "font:700 28px monospace;color:#00d4ff",
  "font:13px monospace;color:#10f0a0"
);

createRoot(document.getElementById("root")!).render(
  <LangProvider>
    <Loader />
    <App />
  </LangProvider>
);
