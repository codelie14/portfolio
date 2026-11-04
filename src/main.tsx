import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loader from "./components/Loader";
import { LangProvider } from "./i18n";

createRoot(document.getElementById("root")!).render(
  <LangProvider>
    <Loader />
    <App />
  </LangProvider>
);
