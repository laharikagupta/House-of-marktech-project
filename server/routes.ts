import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWaitlistSchema, 
  insertContactSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Helper for validating request body against a schema
const validateRequest = <T>(req: Request, schema: any): { data?: T; error?: string } => {
  try {
    const data = schema.parse(req.body);
    return { data };
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return { error: validationError.message };
    }
    return { error: 'Invalid request data' };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for adding to waitlist
  app.post('/api/waitlist', async (req: Request, res: Response) => {
    try {
      const { data, error } = validateRequest(req, insertWaitlistSchema);
      
      if (error) {
        return res.status(400).json({ message: error });
      }
      
      // Check if email already exists in waitlist
      try {
        const waitlistEntry = await storage.addToWaitlist(data!);
        return res.status(201).json(waitlistEntry);
      } catch (err: any) {
        if (err.message === "Email already registered in waitlist") {
          return res.status(409).json({ message: "Email already registered in waitlist" });
        }
        throw err;
      }
    } catch (err) {
      console.error("Error processing waitlist request:", err);
      return res.status(500).json({ message: "Server error processing waitlist request" });
    }
  });
  
  // API route for contact form submissions
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { data, error } = validateRequest(req, insertContactSchema);
      
      if (error) {
        return res.status(400).json({ message: error });
      }
      
      const contactMessage = await storage.createContactMessage(data!);
      return res.status(201).json(contactMessage);
    } catch (err) {
      console.error("Error processing contact form:", err);
      return res.status(500).json({ message: "Server error processing contact form" });
    }
  });
  
  // API route for getting all contact messages (for admin dashboard)
  app.get('/api/admin/messages', async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (err) {
      console.error("Error retrieving contact messages:", err);
      return res.status(500).json({ message: "Server error retrieving contact messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
