import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    // Check if testimonials already exist
    const existingTestimonials = await db.select().from(schema.testimonials);
    
    // Only seed testimonials if none exist
    if (existingTestimonials.length === 0) {
      // Seed testimonials
      await db.insert(schema.testimonials).values([
        {
          name: "Sarah M.",
          title: "Dog Mom of 3",
          rating: 5,
          content: "With 3 large dogs, our yard was impossible to keep clean. Dog Duty Pros has been a lifesaver! Their weekly service means we can actually enjoy our backyard again. Worth every penny!",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
        },
        {
          name: "Michael T.",
          title: "Property Manager",
          rating: 5,
          content: "As a property manager for a large apartment complex, I needed a reliable service. Dog Duty Pros has been professional, thorough, and our residents are thrilled with the cleaner common areas.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
        },
        {
          name: "Jessica K.",
          title: "Busy Mom",
          rating: 5,
          content: "I was skeptical at first about hiring someone for this, but now I can't imagine life without Dog Duty Pros! My kids can play freely in the yard, and I don't have to worry about the mess. Complete game-changer!",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
        }
      ]);
      
      console.log("Testimonials seeded successfully");
    } else {
      console.log("Testimonials already exist, skipping seeding");
    }
    
    // Check if service plans already exist
    const existingPlans = await db.select().from(schema.servicePlans);
    
    // Only seed service plans if none exist
    if (existingPlans.length === 0) {
      // Seed service plans
      const [basicPlan] = await db.insert(schema.servicePlans).values({
        name: "Basic Package",
        description: "Perfect for small yards with 1-2 pets",
        price: 1499, // $14.99
        interval: "week",
        popular: false,
        buttonText: "Basic Load Off"
      }).returning();
      
      const [premiumPlan] = await db.insert(schema.servicePlans).values({
        name: "Premium Package",
        description: "Ideal for medium yards with 2-3 pets",
        price: 1999, // $19.99
        interval: "week",
        popular: true,
        buttonText: "Premium Load Off"
      }).returning();
      
      const [ultimatePlan] = await db.insert(schema.servicePlans).values({
        name: "Ultimate Package",
        description: "Best for large yards with 4+ pets",
        price: 2999, // $29.99
        interval: "week",
        popular: false,
        buttonText: "Ultimate Load Off"
      }).returning();
      
      // Seed basic plan features
      await db.insert(schema.servicePlanFeatures).values([
        { planId: basicPlan.id, feature: "Weekly service (once per week)" },
        { planId: basicPlan.id, feature: "Yards up to 1/4 acre" },
        { planId: basicPlan.id, feature: "1-2 pets" },
        { planId: basicPlan.id, feature: "Email confirmation" }
      ]);
      
      // Seed premium plan features
      await db.insert(schema.servicePlanFeatures).values([
        { planId: premiumPlan.id, feature: "Weekly service (once per week)" },
        { planId: premiumPlan.id, feature: "Yards up to 1/2 acre" },
        { planId: premiumPlan.id, feature: "2-3 pets" },
        { planId: premiumPlan.id, feature: "Text & email confirmations" },
        { planId: premiumPlan.id, feature: "Deodorizing treatment" }
      ]);
      
      // Seed ultimate plan features
      await db.insert(schema.servicePlanFeatures).values([
        { planId: ultimatePlan.id, feature: "Twice weekly service" },
        { planId: ultimatePlan.id, feature: "Yards up to 1 acre" },
        { planId: ultimatePlan.id, feature: "4+ pets" },
        { planId: ultimatePlan.id, feature: "Text & email confirmations" },
        { planId: ultimatePlan.id, feature: "Deodorizing treatment" },
        { planId: ultimatePlan.id, feature: "Priority scheduling" }
      ]);
      
      console.log("Service plans and features seeded successfully");
    } else {
      console.log("Service plans already exist, skipping seeding");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
