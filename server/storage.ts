import { db } from "@db";
import { servicePlanFeatures, servicePlans, testimonials } from "@shared/schema";
import { eq } from "drizzle-orm";

export const storage = {
  // Testimonials
  async getTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: (testimonials, { desc }) => [desc(testimonials.rating)]
    });
  },

  // Service Plans
  async getServicePlans() {
    const plans = await db.query.servicePlans.findMany({
      with: {
        features: true
      }
    });

    return plans.map(plan => ({
      ...plan,
      features: plan.features.map(f => f.feature)
    }));
  },

  async getServicePlanById(id: number) {
    const plan = await db.query.servicePlans.findFirst({
      where: eq(servicePlans.id, id),
      with: {
        features: true
      }
    });

    if (!plan) return null;

    return {
      ...plan,
      features: plan.features.map(f => f.feature)
    };
  }
};
