import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
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
import Stripe from "stripe";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
});

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

  // Get all service types
  app.get(`${apiPrefix}/service-types`, async (req, res) => {
    try {
      const serviceTypesList = await db.select().from(serviceTypes)
        .where(eq(serviceTypes.isActive, true))
        .orderBy(serviceTypes.name);
      
      return res.status(200).json({
        success: true,
        data: serviceTypesList
      });
    } catch (error) {
      console.error("Error fetching service types:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Get all time slots
  app.get(`${apiPrefix}/time-slots`, async (req, res) => {
    try {
      const timeSlotsList = await db.select().from(timeSlots)
        .where(eq(timeSlots.isActive, true))
        .orderBy(timeSlots.startTime);
      
      // Format time slots for frontend display
      const formattedTimeSlots = timeSlotsList.map(slot => ({
        ...slot,
        // Format as "8:00 AM - 8:30 AM"
        formattedTime: `${formatTimeString(slot.startTime)} - ${formatTimeString(slot.endTime)}`
      }));
      
      return res.status(200).json({
        success: true,
        data: formattedTimeSlots
      });
    } catch (error) {
      console.error("Error fetching time slots:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Get service locations for a user (or all if admin)
  app.get(`${apiPrefix}/service-locations`, async (req, res) => {
    try {
      // In a real app, we would check for user authentication
      // For demo purposes, we'll just get all active locations
      
      const locationsList = await db.select().from(serviceLocations)
        .where(eq(serviceLocations.isActive, true))
        .orderBy(serviceLocations.name);
      
      return res.status(200).json({
        success: true,
        data: locationsList
      });
    } catch (error) {
      console.error("Error fetching service locations:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Create a new service location
  app.post(`${apiPrefix}/service-locations`, async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertServiceLocationSchema.parse(req.body);
      
      // In a real app, we would get the userId from authentication
      // For demo purposes, we'll get the first user
      const usersList = await db.select().from(users);
      if (usersList.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No users found in the system"
        });
      }
      
      // Create the location
      const [newLocation] = await db.insert(serviceLocations)
        .values({
          ...validatedData,
          userId: usersList[0].id,
          isActive: true
        })
        .returning();
      
      return res.status(201).json({
        success: true,
        message: "Service location created successfully",
        data: newLocation
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors 
        });
      }
      
      console.error("Error creating service location:", error);
      return res.status(500).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  });

  // Get available time slots for a specific date
  app.get(`${apiPrefix}/available-time-slots`, async (req, res) => {
    try {
      const { date, serviceTypeId } = req.query;
      
      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date is required"
        });
      }
      
      // Parse the date
      const requestedDate = new Date(date as string);
      const formattedDate = format(requestedDate, 'yyyy-MM-dd');
      
      // Get all time slots
      const allTimeSlots = await db.select().from(timeSlots)
        .where(eq(timeSlots.isActive, true))
        .orderBy(timeSlots.startTime);
      
      // Get booked appointments for the date
      const bookedAppointments = await db.select({
        timeSlotId: appointments.timeSlotId
      }).from(appointments)
        .where(
          and(
            eq(appointments.date, formattedDate as any),
            eq(appointments.status, "scheduled")
          )
        );
      
      // Create a set of booked time slot IDs for efficient lookup
      const bookedTimeSlotIds = new Set(bookedAppointments.map(appt => appt.timeSlotId));
      
      // Filter out booked time slots
      const availableTimeSlots = allTimeSlots.filter(slot => !bookedTimeSlotIds.has(slot.id));
      
      // Format time slots for frontend display
      const formattedTimeSlots = availableTimeSlots.map(slot => ({
        ...slot,
        formattedTime: `${formatTimeString(slot.startTime)} - ${formatTimeString(slot.endTime)}`
      }));
      
      return res.status(200).json({
        success: true,
        data: formattedTimeSlots
      });
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Create a new appointment
  app.post(`${apiPrefix}/appointments`, async (req, res) => {
    try {
      // In a real app, we would get the userId from authentication
      // For demo purposes, we'll get the first user
      const usersList = await db.select().from(users);
      if (usersList.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No users found in the system"
        });
      }
      
      // Prepare the appointment data
      const appointmentData = {
        ...req.body,
        userId: usersList[0].id
      };
      
      // Validate appointment data
      const validatedData = insertAppointmentSchema.parse(appointmentData);
      
      // Check if the time slot is already booked for the selected date
      const existingAppointments = await db.select().from(appointments)
        .where(
          and(
            eq(appointments.date, validatedData.date as any),
            eq(appointments.timeSlotId, validatedData.timeSlotId),
            eq(appointments.status, "scheduled")
          )
        );
      
      if (existingAppointments.length > 0) {
        return res.status(400).json({
          success: false,
          message: "This time slot is already booked for the selected date. Please choose another time."
        });
      }
      
      // Create the appointment
      const [newAppointment] = await db.insert(appointments)
        .values({
          ...validatedData,
          status: "scheduled",
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      return res.status(201).json({
        success: true,
        message: "Appointment scheduled successfully",
        data: newAppointment
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors 
        });
      }
      
      console.error("Error creating appointment:", error);
      return res.status(500).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  });

  // Get all appointments (with optional filtering)
  app.get(`${apiPrefix}/appointments`, async (req, res) => {
    try {
      // In a real app, we would get the userId from authentication
      // For demo purposes, we'll get all appointments
      
      // Support date filtering
      const { date, status } = req.query;
      
      // Build query conditions
      let conditions = [];
      
      if (date) {
        conditions.push(eq(appointments.date, date as string));
      } else {
        // By default, only show upcoming appointments (today and future)
        const today = format(new Date(), 'yyyy-MM-dd');
        conditions.push(gte(appointments.date, today as any));
      }
      
      if (status) {
        conditions.push(eq(appointments.status, status as string));
      }
      
      // Get appointments with relations
      const appointmentsList = await db.query.appointments.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        with: {
          serviceLocation: true,
          serviceType: true,
          timeSlot: true
        },
        orderBy: [
          desc(appointments.date),
          sql`appointments.time_slot_id`
        ]
      });
      
      // Format appointments for display
      const formattedAppointments = appointmentsList.map(appointment => ({
        ...appointment,
        formattedDate: format(new Date(appointment.date), 'EEEE, MMMM d, yyyy'),
        formattedTime: appointment.timeSlot ? 
          `${formatTimeString(appointment.timeSlot.startTime)} - ${formatTimeString(appointment.timeSlot.endTime)}` : 
          'Unknown time'
      }));
      
      return res.status(200).json({
        success: true,
        data: formattedAppointments
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Update appointment status (cancel, complete, etc.)
  app.patch(`${apiPrefix}/appointments/:id/status`, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['scheduled', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Status must be one of: scheduled, completed, cancelled"
        });
      }
      
      // Check if appointment exists
      const appointment = await db.query.appointments.findFirst({
        where: eq(appointments.id, parseInt(id))
      });
      
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }
      
      // Update appointment status
      const [updatedAppointment] = await db.update(appointments)
        .set({ 
          status,
          updatedAt: new Date()
        })
        .where(eq(appointments.id, parseInt(id)))
        .returning();
      
      return res.status(200).json({
        success: true,
        message: `Appointment ${status} successfully`,
        data: updatedAppointment
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Stripe payment endpoints
  app.post(`${apiPrefix}/create-payment-intent`, async (req, res) => {
    try {
      const { amount, serviceName, email, name, phone } = req.body;
      
      if (!amount || !serviceName || !email || !name || !phone) {
        return res.status(400).json({
          success: false,
          message: "Missing required parameters. Need amount, serviceName, email, name, and phone."
        });
      }
      
      // Create a customer
      const customer = await stripe.customers.create({
        email: email,
        name: name,
        phone: phone,
        metadata: {
          service: serviceName
        }
      });
      
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          service: serviceName,
          customer_email: email,
          customer_name: name,
          customer_phone: phone
        },
        receipt_email: email,
        description: `Payment for ${serviceName} service - Dog Duty Pros`
      });
      
      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating payment intent: " + error.message
      });
    }
  });

  // Helper function to format time strings
  function formatTimeString(timeString: string) {
    if (!timeString) return '';
    
    // Parse the time string (HH:MM:SS)
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Convert to 12-hour format with AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  const httpServer = createServer(app);
  
  // Set up WebSocket server for customer support chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Track all connected clients
  const clients = new Map<WebSocket, { id: string, ip: string | undefined, isSupport: boolean }>();
  
  // Store support staff connections separately
  const supportStaff = new Map<WebSocket, { id: string, ip: string | undefined, isSupport: boolean }>();
  
  wss.on('connection', (ws, req) => {
    // Generate a unique ID for this client
    const id = Math.random().toString(36).substring(2, 10);
    const clientIp = req.socket.remoteAddress;
    
    // Store client connection
    clients.set(ws, { id, ip: clientIp, isSupport: false });
    
    console.log(`New WebSocket connection: ${id} from ${clientIp}`);
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      clientId: id,
      message: 'Connected to Dog Duty Pros support chat. How can we help you?'
    }));

    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log(`Received: ${JSON.stringify(data)}`);
        
        // Handle different message types
        switch (data.type) {
          case 'chat': 
            // Basic message broadcasting logic
            if (data.role === 'support') {
              // Mark this connection as support staff
              const client = clients.get(ws);
              if (client) {
                client.isSupport = true;
                supportStaff.set(ws, client);
              }
              
              // If message has a recipient, send only to them
              if (data.to) {
                clients.forEach((info, client) => {
                  if (info.id === data.to && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                      type: 'chat',
                      from: 'support',
                      message: data.message,
                      timestamp: new Date().toISOString()
                    }));
                  }
                });
              }
            } else {
              // Regular user message - broadcast to all support staff
              const clientInfo = clients.get(ws);
              supportStaff.forEach((info, support) => {
                if (support.readyState === WebSocket.OPEN) {
                  support.send(JSON.stringify({
                    type: 'chat',
                    from: clientInfo?.id || 'unknown',
                    message: data.message,
                    timestamp: new Date().toISOString()
                  }));
                }
              });
              
              // Also echo back to the user so they see their own message
              ws.send(JSON.stringify({
                type: 'chat',
                from: 'you',
                message: data.message,
                timestamp: new Date().toISOString()
              }));
            }
            break;
            
          case 'typing':
            // Broadcast typing indicator
            if (data.role === 'support') {
              // Send typing indicator to specific client
              clients.forEach((info, client) => {
                if (info.id === data.to && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    type: 'typing',
                    from: 'support'
                  }));
                }
              });
            } else {
              // Send user typing to all support staff
              const clientInfo = clients.get(ws);
              supportStaff.forEach((info, support) => {
                if (support.readyState === WebSocket.OPEN) {
                  support.send(JSON.stringify({
                    type: 'typing',
                    from: clientInfo?.id || 'unknown'
                  }));
                }
              });
            }
            break;
            
          default:
            console.log(`Unknown message type: ${data.type}`);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      const client = clients.get(ws);
      console.log(`WebSocket closed: ${client?.id}`);
      
      // Notify support staff when a user disconnects
      if (client && !client.isSupport) {
        supportStaff.forEach((info, support) => {
          if (support.readyState === WebSocket.OPEN) {
            support.send(JSON.stringify({
              type: 'system',
              message: `Client ${client.id} has disconnected`
            }));
          }
        });
      }
      
      // Clean up
      supportStaff.delete(ws);
      clients.delete(ws);
    });
  });

  return httpServer;
}
