import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact messages table for inquiries
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Please enter a valid email address"),
  phone: (schema) => schema.min(10, "Phone number must be at least 10 digits"),
  service: (schema) => schema.min(1, "Please select a service"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
}).omit({ id: true, createdAt: true, read: true });

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Testimonials table for customer reviews
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  title: (schema) => schema.min(2, "Title must be at least 2 characters"),
  rating: (schema) => schema.min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  content: (schema) => schema.min(10, "Content must be at least 10 characters"),
  image: (schema) => schema.url("Image must be a valid URL"),
}).omit({ id: true });

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Service plans table for pricing options
export const servicePlans = pgTable("service_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Stored in cents
  interval: text("interval").notNull(),
  popular: boolean("popular").default(false).notNull(),
  buttonText: text("button_text").notNull(),
});

export const servicePlanFeatures = pgTable("service_plan_features", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").references(() => servicePlans.id).notNull(),
  feature: text("feature").notNull(),
});

export const servicePlansRelations = relations(servicePlans, ({ many }) => ({
  features: many(servicePlanFeatures),
}));

export const servicePlanFeaturesRelations = relations(servicePlanFeatures, ({ one }) => ({
  plan: one(servicePlans, {
    fields: [servicePlanFeatures.planId],
    references: [servicePlans.id],
  }),
}));

export const insertServicePlanSchema = createInsertSchema(servicePlans, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.min(0, "Price cannot be negative"),
  interval: (schema) => schema.min(1, "Interval must be at least 1 character"),
  buttonText: (schema) => schema.min(2, "Button text must be at least 2 characters"),
}).omit({ id: true });

export const insertServicePlanFeatureSchema = createInsertSchema(servicePlanFeatures, {
  feature: (schema) => schema.min(3, "Feature must be at least 3 characters"),
}).omit({ id: true });

export type InsertServicePlan = z.infer<typeof insertServicePlanSchema>;
export type ServicePlan = typeof servicePlans.$inferSelect;
export type InsertServicePlanFeature = z.infer<typeof insertServicePlanFeatureSchema>;
export type ServicePlanFeature = typeof servicePlanFeatures.$inferSelect;
