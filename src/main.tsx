import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add loading class to HTML element
    document.documentElement.classList.add('loading');
    
    // Simulate loading time or wait for essential resources
    const timer = setTimeout(() => {
      setLoading(false);
      // Remove loading class when done
      document.documentElement.classList.remove('loading');
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('loading');
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <App />;
};

createRoot(document.getElementById("root")!).render(<Main />);
