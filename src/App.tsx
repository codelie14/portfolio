import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import PageTransition from "./components/motion/PageTransition";
import Terminal from "./components/Terminal";
import MatrixRain from "./components/fx/MatrixRain";
import AskArchange from "./components/AskArchange";
import { installGlobalSfx } from "./components/fx/sound";
import { useEffect } from "react";
import { Cursor, Grain, ScrollProgress } from "./components/motion/Chrome";

const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route
          path="/projects/:projectId"
          element={
            <PageTransition>
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <ProjectDetail />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  useEffect(() => installGlobalSfx(), []);
  return (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollProgress />
        <Cursor />
        <Grain />
        <Terminal />
        <AskArchange />
        <MatrixRain />
        <AnimatedRoutes />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </HelmetProvider>
  );
};

export default App;
