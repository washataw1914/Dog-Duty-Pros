import { useEffect, useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'wouter';
import { Loader2, ArrowLeft, Check } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Form schemas
const subscriptionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interval: z.enum(["weekly", "monthly", "quarterly"]),
});

type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>;

interface SubscriptionFormProps {
  amount: number;
  serviceName: string;
  onProceed: (data: SubscriptionFormData) => void;
}

function SubscriptionForm({ amount, serviceName, onProceed }: SubscriptionFormProps) {
  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interval: 'monthly',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onProceed)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="interval"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Billing Interval</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Weekly - ${amount.toFixed(2)}/week
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Monthly - ${(amount * 4).toFixed(2)}/month
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="quarterly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Quarterly - ${(amount * 12).toFixed(2)}/quarter
                        <span className="ml-2 text-sm text-green-600 font-medium">
                          (Save 5%)
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="pt-4 border-t">
          <Button type="submit" className="w-full" size="lg">
            Continue to Payment
          </Button>
        </div>
      </form>
    </Form>
  );
}

function SubscriptionPaymentForm({
  clientSecret,
  subscriptionId,
}: {
  clientSecret: string;
  subscriptionId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?subscription=${subscriptionId}`,
        },
      });
      
      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "There was an issue with your payment",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <PaymentElement />
      
      <Button 
        type="submit"
        disabled={!stripe || !elements || isSubmitting} 
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
    </form>
  );
}

export default function Subscribe() {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const amount = parseFloat(searchParams.get('amount') || '19.95');
  const serviceName = searchParams.get('service') || 'Dog Duty Service';
  
  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<SubscriptionFormData | null>(null);
  const { toast } = useToast();
  
  const createSubscription = async (formData: SubscriptionFormData) => {
    setLoading(true);
    setCustomerInfo(formData);
    
    try {
      // Calculate the actual amount based on the interval for discounts
      let intervalAmount = amount;
      if (formData.interval === 'monthly') {
        // No discount for monthly payments
        intervalAmount = amount * 4;
      } else if (formData.interval === 'quarterly') {
        // 5% discount on quarterly payments
        intervalAmount = amount * 12 * 0.95;
      }
      
      const response = await apiRequest('POST', '/api/create-subscription', {
        amount: intervalAmount,
        serviceName,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        interval: formData.interval,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subscription');
      }
      
      const data = await response.json();
      
      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setSubscriptionId(data.subscriptionId);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Subscription Setup Failed",
        description: error.message || "Could not set up subscription",
        variant: "destructive",
      });
      setCustomerInfo(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Subscribe to Our Service</CardTitle>
            <CardDescription className="text-center">
              {serviceName} - Starting at ${amount.toFixed(2)}/week
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-gray-500">Setting up your subscription...</p>
                </div>
              </div>
            ) : clientSecret ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Customer information saved</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>{customerInfo?.name}</p>
                        <p>{customerInfo?.email}</p>
                        <p>Billing: {customerInfo?.interval}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <SubscriptionPaymentForm 
                    clientSecret={clientSecret}
                    subscriptionId={subscriptionId}
                  />
                </Elements>
              </div>
            ) : (
              <SubscriptionForm 
                amount={amount}
                serviceName={serviceName}
                onProceed={createSubscription}
              />
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Secure checkout powered by Stripe</span>
            </div>
            <p>
              Your payment information is processed securely. We do not store your credit card details.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Lock icon component
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}