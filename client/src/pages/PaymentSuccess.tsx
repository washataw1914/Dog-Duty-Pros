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
  
  useEffect(() => {
    // Get query parameters from URL if they exist
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
      setCustomerEmail(email);
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
            Thank you for your payment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-gray-700">
            We've received your payment and are excited to serve you and your furry friends. Your yard will be looking pristine in no time!
          </p>
          
          {customerEmail && (
            <p className="text-sm text-gray-500">
              A receipt has been sent to {customerEmail}.
            </p>
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