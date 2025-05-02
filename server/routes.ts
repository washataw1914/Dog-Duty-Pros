import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactMessages, insertContactMessageSchema,
  serviceTypes, timeSlots, serviceLocations, appointments, 
  insertAppointmentSchema, insertServiceLocationSchema,
  users
} from "@shared/schema";
import { eq, gte, and, desc, sql } from "drizzle-orm";
import { db } from "@db";
import { ZodError } from "zod";
import { format } from "date-fns";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const apiPrefix = "/api";

  // Contact form submission
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save to database
      const [newMessage] = await db.insert(contactMessages)
        .values(validatedData)
        .returning();
      
      return res.status(201).json({
        success: true,
        message: "Your message has been sent successfully!",
        data: { id: newMessage.id }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors 
        });
      }
      
      console.error("Error creating contact message:", error);
      return res.status(500).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  });

  // Get testimonials
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Get service plans
  app.get(`${apiPrefix}/service-plans`, async (req, res) => {
    try {
      const servicePlans = await storage.getServicePlans();
      return res.status(200).json({
        success: true,
        data: servicePlans
      });
    } catch (error) {
      console.error("Error fetching service plans:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
