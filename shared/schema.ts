import { pgTable, text, serial, integer, boolean, timestamp, date, time, decimal } from "drizzle-orm/pg-core";
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

// Service locations table
export const serviceLocations = pgTable("service_locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  instructions: text("instructions"),
  userId: integer("user_id").references(() => users.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Time slots table for available appointment times
export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Service types table
export const serviceTypes = pgTable("service_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // Duration in minutes
  isActive: boolean("is_active").default(true).notNull(),
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  serviceLocationId: integer("service_location_id").references(() => serviceLocations.id).notNull(),
  serviceTypeId: integer("service_type_id").references(() => serviceTypes.id).notNull(),
  date: date("date").notNull(),
  timeSlotId: integer("time_slot_id").references(() => timeSlots.id).notNull(),
  status: text("status").default("scheduled").notNull(), // scheduled, completed, cancelled
  notes: text("notes"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Set up relations
export const serviceLocationsRelations = relations(serviceLocations, ({ many, one }) => ({
  appointments: many(appointments),
  user: one(users, {
    fields: [serviceLocations.userId],
    references: [users.id],
  }),
}));

export const timeSlotsRelations = relations(timeSlots, ({ many }) => ({
  appointments: many(appointments),
}));

export const serviceTypesRelations = relations(serviceTypes, ({ many }) => ({
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  serviceLocation: one(serviceLocations, {
    fields: [appointments.serviceLocationId],
    references: [serviceLocations.id],
  }),
  serviceType: one(serviceTypes, {
    fields: [appointments.serviceTypeId],
    references: [serviceTypes.id],
  }),
  timeSlot: one(timeSlots, {
    fields: [appointments.timeSlotId],
    references: [timeSlots.id],
  }),
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

// Define schemas for inserts
export const insertServiceLocationSchema = createInsertSchema(serviceLocations, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  address: (schema) => schema.min(5, "Address must be at least 5 characters"),
  city: (schema) => schema.min(2, "City must be at least 2 characters"),
  state: (schema) => schema.min(2, "State must be at least 2 characters"),
  zipCode: (schema) => schema.min(5, "Zip code must be at least 5 characters"),
}).omit({ id: true, createdAt: true, isActive: true });

export const insertTimeSlotSchema = createInsertSchema(timeSlots).omit({ 
  id: true, 
  isActive: true 
});

export const insertServiceTypeSchema = createInsertSchema(serviceTypes, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.min(0, "Price cannot be negative"),
  duration: (schema) => schema.min(5, "Duration must be at least 5 minutes"),
}).omit({ id: true, isActive: true });

export const insertAppointmentSchema = createInsertSchema(appointments, {
  date: (schema) => schema.refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(date) >= today;
    },
    { message: "Appointment date must be today or in the future" }
  ),
  totalPrice: (schema) => schema.min(0, "Total price cannot be negative"),
}).omit({ id: true, createdAt: true, updatedAt: true });

// Export types
export type InsertServiceLocation = z.infer<typeof insertServiceLocationSchema>;
export type ServiceLocation = typeof serviceLocations.$inferSelect;

export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type TimeSlot = typeof timeSlots.$inferSelect;

export type InsertServiceType = z.infer<typeof insertServiceTypeSchema>;
export type ServiceType = typeof serviceTypes.$inferSelect;

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
