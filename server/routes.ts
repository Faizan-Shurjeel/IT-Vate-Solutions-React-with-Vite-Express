import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contact = await storage.saveContactForm(validatedData);
      res.status(200).json({ success: true, message: "Message sent successfully", contactId: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        console.error("Error saving contact form:", error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
