import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-primary hover:underline font-medium mr-4">
            &larr; Back to Home
          </Link>
        </div>
        
        <h1 className="font-bubble text-3xl mb-6 text-primary">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Last Updated: May 3, 2025
          </p>
          
          <p className="mb-4">
            Welcome to Dog Duty Pros. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using the Dog Duty Pros website or services, you agree to comply with and be bound by these Terms.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          
          <p className="mb-4">
            By accessing or using our services, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our services.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. Description of Services</h2>
          
          <p className="mb-4">
            Dog Duty Pros provides pet waste removal services for residential and commercial properties. Our services include regular scheduled cleaning, one-time cleanups, and special event cleanings.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h2>
          
          <p className="mb-4">
            To use certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. Service Appointments and Cancellations</h2>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">We require at least 24 hours' notice for cancellation of scheduled services.</li>
            <li className="mb-2">No refunds will be issued for missed appointments without proper cancellation notice.</li>
            <li className="mb-2">We reserve the right to reschedule appointments due to severe weather conditions or other circumstances beyond our control.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Payment Terms</h2>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Payment is required at the time of booking for one-time services.</li>
            <li className="mb-2">Recurring services will be billed according to the subscription plan selected.</li>
            <li className="mb-2">We accept major credit cards and debit cards for payment.</li>
            <li className="mb-2">Any disputes regarding charges must be reported within 30 days of the charge date.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Property Access</h2>
          
          <p className="mb-4">
            You agree to provide safe and reasonable access to your property for our service providers. This includes ensuring that gates are unlocked and pets are secured during service visits.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Service Guarantee</h2>
          
          <p className="mb-4">
            We strive to provide thorough and professional services. If you are not satisfied with our service, please contact us within 24 hours of service completion, and we will return to address any concerns at no additional cost.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
          
          <p className="mb-4">
            To the maximum extent permitted by law, Dog Duty Pros shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">9. Termination</h2>
          
          <p className="mb-4">
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
          
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services following the posting of revised Terms means that you accept and agree to the changes.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">11. Governing Law</h2>
          
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the state in which we operate, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">12. Contact Information</h2>
          
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          
          <p className="mb-4">
            <strong>Dog Duty Pros</strong><br />
            Email: terms@dogdutypros.com<br />
            Phone: (555) 123-4567
          </p>
          
        </div>
      </div>
    </div>
  );
}