import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Preloader from "@/components/Preloader";
import CreativeLayout from "@/components/CreativeLayout";
import AsciiArt from "@/components/AsciiArt";

function AppRouter() {
  // Get the current location to apply creative layout appropriately
  const [location] = useLocation();
  
  return (
    <CreativeLayout showNameCorners={location === "/"}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </CreativeLayout>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Prevent scrolling during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Only show ASCII art after preloading is complete */}
      {!isLoading && <AsciiArt />}
      <Preloader onLoadingComplete={handleLoadingComplete} />
      {!isLoading && <AppRouter />}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
