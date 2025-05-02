import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our service. Can't find your answer? Contact us!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <span className="font-medium text-lg text-left">Do I need to be home during the service?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700">
                  No, you don't need to be home! Many of our customers are at work during our visits. As long as we have access to your yard (gate code if needed), we can perform our service while you're away. We'll send a notification when we've completed the job.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <span className="font-medium text-lg text-left">What if it's raining on my scheduled day?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700">
                  We work in most weather conditions! Light rain doesn't stop us. However, for severe weather, we'll reschedule your service for the next available day and notify you of the change. Your yard will never go more than a day or two beyond your regular schedule.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <span className="font-medium text-lg text-left">How do you dispose of the waste?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700">
                  We remove all waste from your property in sealed, biodegradable bags. We dispose of it according to local regulations, typically at approved waste facilities. We never place it in your trash cans unless specifically requested.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <span className="font-medium text-lg text-left">What areas do you service?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700">
                  We currently service all major metropolitan areas. Not sure if you're in our service zone? Contact us with your address, and we'll let you know if we can help!
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <span className="font-medium text-lg text-left">Do you offer any discounts?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700">
                  Yes! We offer discounts for seniors, military personnel, and first responders. We also have referral bonuses - if you refer a friend who signs up, you both get a free service! Additionally, customers who pay quarterly receive a 5% discount.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
