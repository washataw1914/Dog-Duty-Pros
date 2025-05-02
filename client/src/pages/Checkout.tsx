import { useState, useEffect } from 'react';
import { useSearchParams } from 'wouter';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ amount, serviceName, clientSecret }: { 
  amount: number, 
  serviceName: string,
  clientSecret: string
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'initial' | 'processing' | 'success' | 'error'>('initial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Form validation
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Valid Email Required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      toast({
        title: "Valid Phone Required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
        payment_method_data: {
          billing_details: {
            name,
            email,
            phone
          }
        }
      },
      redirect: 'if_required'
    });

    if (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred during payment processing",
        variant: "destructive",
      });
      setPaymentStatus('error');
    } else {
      // The payment has been processed!
      setPaymentStatus('success');
      toast({
        title: "Payment Successful",
        description: "Thank you for your payment!",
      });
    }

    setIsProcessing(false);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-center">Payment Successful!</h2>
        <p className="text-center text-gray-600 max-w-md">
          Thank you for your payment. We've sent a confirmation email with details about your service.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="johndoe@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="(555) 123-4567"
            required
          />
        </div>
      </div>

      <PaymentElement />

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing} 
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const { toast } = useToast();

  // Get service details from URL parameters
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceName') || 'Dog Duty Service';
  const amount = parseFloat(searchParams.get('amount') || '0');

  useEffect(() => {
    // Validate required parameters
    if (!amount) {
      toast({
        title: "Invalid Request",
        description: "Missing required payment information",
        variant: "destructive",
      });
      return;
    }

    // Create PaymentIntent on the server
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await apiRequest('POST', '/api/create-payment-intent', {
          amount,
          serviceName,
          // These will be updated in the form, but we need to pass placeholder values
          email: '',
          name: '',
          phone: ''
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create payment intent');
        }
        
        const data = await response.json();
        
        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Payment Setup Failed",
          description: error.message || "Could not set up payment processing",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, serviceName, toast]);

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
            <CardTitle className="text-2xl text-center">Complete Your Payment</CardTitle>
            <CardDescription className="text-center">
              {serviceName} - ${amount.toFixed(2)}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-gray-500">Setting up secure payment...</p>
                </div>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  amount={amount} 
                  serviceName={serviceName} 
                  clientSecret={clientSecret} 
                />
              </Elements>
            ) : (
              <div className="py-12 text-center text-gray-500">
                Unable to initialize payment form. Please try again later.
              </div>
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