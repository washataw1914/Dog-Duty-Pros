import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PaymentSuccess() {
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [isSubscription, setIsSubscription] = useState(false);
  
  useEffect(() => {
    // Get query parameters from URL if they exist
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const subscription = urlParams.get('subscription');
    
    if (email) {
      setCustomerEmail(email);
    }
    
    if (subscription) {
      setIsSubscription(true);
    }
    
    // Scroll to top of page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            {isSubscription 
              ? "Thank you for your subscription"
              : "Thank you for your payment"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          {isSubscription ? (
            <p className="text-gray-700">
              We've processed your subscription and are excited to serve you on a regular basis! Your yard will be looking pristine according to your selected service schedule.
            </p>
          ) : (
            <p className="text-gray-700">
              We've received your payment and are excited to serve you and your furry friends. Your yard will be looking pristine in no time!
            </p>
          )}
          
          {customerEmail && (
            <p className="text-sm text-gray-500">
              A receipt has been sent to {customerEmail}.
            </p>
          )}
          
          {isSubscription && (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-left">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Your Subscription Benefits:</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Automatic billing - no need to remember to pay</li>
                <li>Priority scheduling for service visits</li>
                <li>Free service adjustments as needed</li>
                <li>Cancel anytime with no penalties</li>
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <a href="#contact">
              Contact Support
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}