import { useState } from 'react';
import { useLocation } from 'wouter';
import { Check, Loader2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SanitizationOption {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

const sanitizationOptions: SanitizationOption[] = [
  {
    id: 'whole-yard',
    name: 'Whole Yard Sanitization',
    description: 'Complete sanitization service for your entire yard, eliminating odors and harmful bacteria.',
    price: 89.99,
    features: [
      'Covers your entire yard area',
      'Eliminates harmful bacteria and parasites',
      'Reduces pet waste odors',
      'Pet-friendly, eco-conscious solution',
      'Helps prevent disease transmission'
    ]
  },
  {
    id: 'spot',
    name: 'Spot Sanitization',
    description: 'Targeted sanitization for specific high-traffic or problem areas in your yard.',
    price: 49.99,
    features: [
      'Treats up to 3 specific problem areas',
      'Perfect for dog runs or pet play areas',
      'Eliminates odors at the source',
      'Breaks down waste residue',
      'Quick-drying formula'
    ]
  }
];

export default function SanitizationServices() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  const handleProceedToCheckout = () => {
    if (!selectedOption) return;
    
    setIsProcessing(true);
    
    const option = sanitizationOptions.find(opt => opt.id === selectedOption);
    if (!option) {
      setIsProcessing(false);
      return;
    }
    
    // Navigate to checkout with the selected option details
    setLocation(`/checkout?serviceId=${option.id}&serviceName=${encodeURIComponent(option.name)}&amount=${option.price}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bubble text-3xl md:text-4xl text-center mb-2 text-primary">Yard Sanitization Services</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our professional sanitization services help eliminate harmful bacteria, parasites, and odors from your yard, creating a safer environment for your family and pets.
          </p>
          
          <RadioGroup value={selectedOption || ''} onValueChange={setSelectedOption} className="grid md:grid-cols-2 gap-6 mb-8">
            {sanitizationOptions.map(option => (
              <div key={option.id} className="relative">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={option.id}
                  className="flex flex-col h-full px-6 py-6 border-2 rounded-xl cursor-pointer bg-white shadow-sm
                  peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary
                  hover:border-gray-300 transition-all"
                >
                  <CardTitle className="text-xl font-bold mb-2">{option.name}</CardTitle>
                  <CardDescription className="mb-4 text-gray-600">{option.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary mb-4">${option.price.toFixed(2)}</div>
                  <div className="space-y-3 mt-auto">
                    {option.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 h-6 w-6 rounded-full border border-primary 
                    flex items-center justify-center peer-data-[state=checked]:bg-primary peer-data-[state=checked]:border-0
                    text-transparent peer-data-[state=checked]:text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={handleProceedToCheckout}
              disabled={!selectedOption || isProcessing}
              size="lg"
              className="w-full max-w-md"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Select a sanitization option to continue to payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}