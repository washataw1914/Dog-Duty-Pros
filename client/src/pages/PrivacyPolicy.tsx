import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-primary hover:underline font-medium mr-4">
            &larr; Back to Home
          </Link>
        </div>
        
        <h1 className="font-bubble text-3xl mb-6 text-primary">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Last Updated: May 3, 2025
          </p>
          
          <p className="mb-4">
            At Dog Duty Pros, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Identity Data includes first name, last name, username, or similar identifier.</li>
            <li className="mb-2">Contact Data includes billing address, delivery address, email address, and telephone numbers.</li>
            <li className="mb-2">Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            <li className="mb-2">Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li className="mb-2">Usage Data includes information about how you use our website, products, and services.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li className="mb-2">Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li className="mb-2">Where we need to comply with a legal obligation.</li>
            <li className="mb-2">With your consent.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. Data Security</h2>
          
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. Your Legal Rights</h2>
          
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Request access to your personal data.</li>
            <li className="mb-2">Request correction of your personal data.</li>
            <li className="mb-2">Request erasure of your personal data.</li>
            <li className="mb-2">Object to processing of your personal data.</li>
            <li className="mb-2">Request restriction of processing your personal data.</li>
            <li className="mb-2">Request transfer of your personal data.</li>
            <li className="mb-2">Right to withdraw consent.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Cookies Policy</h2>
          
          <p className="mb-4">
            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Changes to the Privacy Policy</h2>
          
          <p className="mb-4">
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Contact Us</h2>
          
          <p className="mb-4">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          
          <p className="mb-4">
            <strong>Dog Duty Pros</strong><br />
            Email: privacy@dogduty.biz<br />
            Phone: (501) 470-8886
          </p>
          
        </div>
      </div>
    </div>
  );
}