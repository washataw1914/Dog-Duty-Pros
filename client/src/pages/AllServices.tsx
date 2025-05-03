import { useState } from 'react';
import { useLocation } from 'wouter';
import { Check, Loader2, ArrowRight } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  interval?: string;
  features: string[];
  popular?: boolean;
  addon?: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
}

// Spot sanitization addon
const spotSanitizationAddon = {
  id: 'spot-sanitization',
  name: 'Spot Sanitization',
  description: 'Weekly targeted sanitization for specific high-traffic or problem areas in your yard.',
  price: 2.00,
};

// Regular dog waste removal services
const regularServices: ServiceOption[] = [
  {
    id: 'basic-weekly',
    name: 'Basic Weekly',
    description: 'One weekly visit to clean up dog waste from your yard.',
    price: 14.99,
    interval: 'per week',
    features: [
      'One visit per week',
      'Removal of all waste',
      'Text notification when complete',
      'Satisfaction guarantee',
      'No long-term contracts'
    ],
    popular: false,
    addon: spotSanitizationAddon
  },
  {
    id: 'premium-weekly',
    name: 'Premium Weekly',
    description: 'Two weekly visits for homes with multiple dogs or larger yards.',
    price: 19.95,
    interval: 'per week',
    features: [
      'Two visits per week',
      'Removal of all waste',
      'Text notification when complete',
      'Satisfaction guarantee',
      'Perfect for multiple dogs'
    ],
    popular: true,
    addon: spotSanitizationAddon
  },
  {
    id: 'basic-monthly',
    name: 'Monthly Subscription',
    description: 'Four scheduled visits per month.',
    price: 59.99,
    interval: 'per month',
    features: [
      'Four scheduled visits',
      'Flexible scheduling',
      'Text notification when complete',
      'Satisfaction guarantee',
      'No long-term contracts'
    ],
    popular: false
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
    popular: false
  }
];

// Sanitization services
const sanitizationServices: ServiceOption[] = [
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
    ]
  }
];

// One-time services
const oneTimeServices: ServiceOption[] = [
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
    ]
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
    ]
  }
];

export default function AllServices() {
  const [selectedTab, setSelectedTab] = useState('regular');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [includedAddons, setIncludedAddons] = useState<Record<string, boolean>>({});
  const [, setLocation] = useLocation();

  const toggleAddon = (serviceId: string) => {
    setIncludedAddons(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleProceedToCheckout = (service: ServiceOption) => {
    setIsProcessing(true);
    setSelectedService(service.id);
    
    // Calculate the total price including addons if selected
    let totalPrice = service.price;
    let serviceName = service.name;
    
    if (service.addon && includedAddons[service.id]) {
      totalPrice += service.addon.price;
      serviceName = `${service.name} with ${service.addon.name}`;
    }
    
    // Navigate to checkout with the selected service details
    setTimeout(() => {
      setLocation(`/checkout?serviceId=${service.id}&serviceName=${encodeURIComponent(serviceName)}&amount=${totalPrice}`);
    }, 500);
  };

  const getServices = () => {
    switch (selectedTab) {
      case 'regular':
        return regularServices;
      case 'sanitization':
        return sanitizationServices;
      case 'one-time':
        return oneTimeServices;
      default:
        return regularServices;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bubble text-3xl md:text-4xl text-center mb-3 text-primary">Our Services</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose from our range of professional dog waste removal and yard sanitization services.
          </p>
          
          <Tabs defaultValue="regular" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="regular">Regular Service</TabsTrigger>
              <TabsTrigger value="sanitization">Sanitization</TabsTrigger>
              <TabsTrigger value="one-time">One-Time Service</TabsTrigger>
            </TabsList>
            
            {['regular', 'sanitization', 'one-time'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                  {getServices().map((service) => (
                    <Card key={service.id} className={`overflow-hidden h-full flex flex-col ${
                      service.popular ? 'border-primary border-2' : ''
                    }`}>
                      {service.popular && (
                        <div className="bg-primary text-white text-center py-1 font-medium text-sm">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-baseline mb-6">
                          <span className="text-3xl font-bold text-primary">${service.price.toFixed(2)}</span>
                          {service.interval && (
                            <span className="text-sm text-gray-500 ml-2">{service.interval}</span>
                          )}
                        </div>
                        <Separator className="mb-4" />
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {service.addon && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`addon-${service.id}`}
                                checked={!!includedAddons[service.id]}
                                onChange={() => toggleAddon(service.id)}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <label htmlFor={`addon-${service.id}`} className="ml-2 text-sm font-medium text-gray-700">
                                Add {service.addon.name} (+${service.addon.price.toFixed(2)})
                              </label>
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.addon.description}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handleProceedToCheckout(service)}
                          disabled={isProcessing && selectedService === service.id}
                        >
                          {isProcessing && selectedService === service.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {service.addon && includedAddons[service.id] ? (
                                <>
                                  ${(service.price + service.addon.price).toFixed(2)} - Checkout
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  ${service.price.toFixed(2)} - Checkout
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
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