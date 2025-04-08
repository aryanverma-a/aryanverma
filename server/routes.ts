import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the attached_assets directory statically
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body as ContactFormData;
      
      // Validate request data
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // In a real application, you would save this to a database or send an email
      // For this example, we'll just respond with success
      
      return res.status(200).json({ 
        message: "Message received! We'll get back to you soon.",
        data: { name, email }
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
