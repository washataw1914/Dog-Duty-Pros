import { useState } from 'react';
import { useLocation } from 'wouter';
import { Check, Loader2, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  interval?: string;
  features: string[];
  category: 'regular' | 'sanitization' | 'one-time';
  addonCompatible?: boolean;
}

// All service options
const allServices: ServiceOption[] = [
  // Regular dog waste removal services
  {
    id: 'basic-weekly',
    name: 'Basic Weekly',
    description: 'One weekly visit to clean up dog waste from your yard.',
    price: 14.95,
    interval: 'per week',
    features: [
      'One visit per week',
      'Removal of all waste',
      'Text notification when complete',
      'Satisfaction guarantee',
      'No long-term contracts'
    ],
    category: 'regular',
    addonCompatible: true
  },
  {
    id: 'premium-weekly',
    name: 'Premium Weekly',
    description: 'One weekly visit for homes with multiple dogs or larger yards.',
    price: 19.95,
    interval: 'per week',
    features: [
      'One visit per week',
      'Removal of all waste',
      'Text notification when complete',
      'Satisfaction guarantee',
      'Perfect for multiple dogs'
    ],
    category: 'regular',
    addonCompatible: true
  },
  {
    id: 'basic-monthly',
    name: 'Monthly Subscription',
    description: 'Weekly visits paid monthly.',
    price: 59.95,
    interval: 'per month',
    features: [
      'Weekly visits',
      'Spot sanitization included',
      'Text notification when complete',
      'Satisfaction guarantee',
      'No long-term contracts'
    ],
    category: 'regular'
  },
  {
    id: 'quarterly',
    name: 'Quarterly Subscription',
    description: 'Twelve scheduled visits over three months with 5% discount.',
    price: 170.97,
    interval: 'per quarter',
    features: [
      'Twelve scheduled visits',
      'Save 5% on the regular weekly rate',
      'Premium scheduling priority',
      'Text notification when complete',
      'Satisfaction guarantee'
    ],
    category: 'regular'
  },
  // Sanitization services
  {
    id: 'whole-yard',
    name: 'Whole Yard Sanitization',
    description: 'Complete sanitization service for your entire yard, eliminating odors and harmful bacteria.',
    price: 19.95,
    features: [
      'Covers your entire yard area',
      'Eliminates harmful bacteria and parasites',
      'Reduces pet waste odors',
      'Pet-friendly, eco-conscious solution',
      'Helps prevent disease transmission'
    ],
    category: 'sanitization'
  },
  {
    id: 'spot-sanitization',
    name: 'Spot Sanitization',
    description: 'Weekly targeted sanitization for specific high-traffic or problem areas in your yard.',
    price: 2.00,
    interval: 'per week',
    features: [
      'Treats up to 3 specific problem areas',
      'Perfect for dog runs or pet play areas',
      'Eliminates odors at the source',
      'Breaks down waste residue',
      'Quick-drying formula'
    ],
    category: 'sanitization'
  },
  // One-time services
  {
    id: 'one-time-cleanup',
    name: 'One-Time Cleanup',
    description: 'Thorough one-time yard cleanup service.',
    price: 49.99,
    features: [
      'Complete yard cleanup',
      'No ongoing commitment',
      'Perfect for special occasions',
      'Satisfaction guarantee',
      'Text notification when complete'
    ],
    category: 'one-time'
  },
  {
    id: 'deep-cleanup',
    name: 'Deep Cleanup',
    description: 'Intensive cleanup for yards that need extra attention.',
    price: 79.99,
    features: [
      'Thorough cleanup for neglected yards',
      'Handles heavy accumulation',
      'Deodorizing treatment included',
      'Great before events or gatherings',
      'Detailed service report'
    ],
    category: 'one-time'
  }
];

export default function AllServices() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceOption[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const [, setLocation] = useLocation();

  const addServiceToSelection = () => {
    if (!currentSelection) return;
    
    const serviceToAdd = allServices.find(service => service.id === currentSelection);
    if (!serviceToAdd) return;
    
    // If spot sanitization is selected and we already have a compatible weekly service, 
    // don't add as a separate service but mark as "with spot sanitization"
    if (serviceToAdd.id === 'spot-sanitization') {
      const hasCompatibleService = selectedServices.some(s => s.addonCompatible);
      if (hasCompatibleService) {
        // Already handled in total calculation
        return;
      }
    }
    
    // Don't add duplicates
    if (selectedServices.some(service => service.id === serviceToAdd.id)) {
      return;
    }
    
    setSelectedServices([...selectedServices, serviceToAdd]);
    setCurrentSelection("");
  };

  const removeService = (id: string) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Calculate based on selected services
    selectedServices.forEach(service => {
      total += service.price;
    });
    
    // Check if we need to add spot sanitization
    const hasSpotSanitization = selectedServices.some(s => s.id === 'spot-sanitization');
    const hasCompatibleService = selectedServices.some(s => s.addonCompatible);
    
    // If spot sanitization is not already added as a separate service but we have a compatible service
    if (!hasSpotSanitization && currentSelection === 'spot-sanitization' && hasCompatibleService) {
      const spotService = allServices.find(s => s.id === 'spot-sanitization');
      if (spotService) {
        total += spotService.price;
      }
    }
    
    return total.toFixed(2);
  };

  const getServiceDescription = () => {
    if (selectedServices.length === 0) {
      return "No services selected";
    }
    
    return selectedServices.map(service => service.name).join(" + ");
  };

  const handleProceedToCheckout = () => {
    if (selectedServices.length === 0) return;
    
    setIsProcessing(true);
    
    let serviceName = selectedServices.map(service => service.name).join(" + ");
    const totalPrice = parseFloat(calculateTotal());
    
    // Check if we need to add spot sanitization
    const hasSpotSanitization = selectedServices.some(s => s.id === 'spot-sanitization');
    const hasCompatibleService = selectedServices.some(s => s.addonCompatible);
    
    if (!hasSpotSanitization && currentSelection === 'spot-sanitization' && hasCompatibleService) {
      const spotService = allServices.find(s => s.id === 'spot-sanitization');
      if (spotService) {
        serviceName += ` + ${spotService.name}`;
      }
    }
    
    // Navigate to checkout with the selected service details
    setTimeout(() => {
      setLocation(`/checkout?serviceName=${encodeURIComponent(serviceName)}&amount=${totalPrice}`);
    }, 500);
  };
  
  // Get unique categories for the filter
  const categories: ('regular' | 'sanitization' | 'one-time')[] = ['regular', 'sanitization', 'one-time'];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bubble text-3xl md:text-4xl text-center mb-3 text-primary">Our Services</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose from our range of professional dog waste removal and yard sanitization services.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Build Your Custom Service Package</CardTitle>
              <CardDescription>Select services to add to your package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service-select">Select a service to add</Label>
                  <div className="flex gap-2">
                    <Select value={currentSelection} onValueChange={setCurrentSelection}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <div key={category}>
                            <Label className="px-2 pt-1 pb-1 text-xs font-semibold text-gray-500 uppercase">
                              {category === 'regular' ? 'Regular Services' : 
                               category === 'sanitization' ? 'Sanitization Services' : 
                               'One-Time Services'}
                            </Label>
                            {allServices
                              .filter(service => service.category === category)
                              .map(service => (
                                <SelectItem key={service.id} value={service.id}>
                                  <div className="flex justify-between items-center w-full">
                                    <span>{service.name}</span>
                                    <span className="text-primary font-medium">
                                      ${service.price.toFixed(2)}
                                      {service.interval && <span className="text-xs text-gray-500"> {service.interval}</span>}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      className="flex-shrink-0"
                      onClick={addServiceToSelection}
                      disabled={!currentSelection}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Your Selected Services</h3>
                  {selectedServices.length === 0 ? (
                    <p className="text-gray-500 italic">No services selected yet</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedServices.map(service => (
                        <div 
                          key={service.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-600">
                              ${service.price.toFixed(2)}
                              {service.interval && <span className="text-xs text-gray-500"> {service.interval}</span>}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {/* Spot Sanitization Add-on section */}
                      {!selectedServices.some(s => s.id === 'spot-sanitization') && 
                       selectedServices.some(s => s.addonCompatible) && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id="spot-sanitization-addon"
                              checked={currentSelection === 'spot-sanitization'}
                              onChange={() => {
                                if (currentSelection === 'spot-sanitization') {
                                  setCurrentSelection("");
                                } else {
                                  setCurrentSelection("spot-sanitization");
                                }
                              }}
                              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="spot-sanitization-addon" className="ml-2 text-sm font-medium text-gray-700">
                              Add Spot Sanitization (+$2.00 per week)
                            </label>
                          </div>
                          <div className="text-xs text-gray-500 ml-6">
                            Weekly targeted sanitization for specific high-traffic or problem areas in your yard.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <div className="text-lg font-semibold">Total:</div>
                    <div className="text-sm text-gray-600">{getServiceDescription()}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">${calculateTotal()}</div>
                </div>
                
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleProceedToCheckout}
                  disabled={isProcessing || selectedServices.length === 0}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <h2 className="font-bubble text-2xl mb-4">Not sure which service is right for you?</h2>
            <p className="text-gray-600 mb-6">
              Contact us for a free consultation and we'll help you determine the best service for your needs and property size.
            </p>
            <Button
              onClick={() => window.location.href = '#contact'}
              variant="outline"
              size="lg"
            >
              Contact Us For Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}