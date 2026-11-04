import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loader from "./components/Loader";

createRoot(document.getElementById("root")!).render(
  <>
    <Loader />
    <App />
  </>
);
