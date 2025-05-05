# Dog Duty Pros

A modern, community-driven web application revolutionizing neighborhood dog waste management through an engaging, user-friendly platform.

## Features

- Modern, responsive design
- Easy service selection and booking
- Secure payment processing with Stripe
- Interactive pricing plans
- Live chat support
- Mobile-friendly interface

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Stripe payment integration
- Express.js backend
- PostgreSQL database with Drizzle ORM
- WebSocket for real-time communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/dog-duty-pros.git
   cd dog-duty-pros
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/dogduty
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Initialize the database
   ```
   npm run db:push
   npm run db:seed
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. Build for production
   ```
   npm run build
   ```

7. Start production server
   ```
   npm start
   ```

## Deployment to SiteGround

1. Build the project
   ```
   npm run build
   ```

2. Upload the `dist` folder contents to your SiteGround hosting using FTP
   
3. Set up Node.js in SiteGround's Site Tools:
   - Go to Site > Node.js Manager
   - Create a new Node.js application
   - Set the document root to the directory where you uploaded the files
   - Set the Node.js version to 16 or higher
   - Set the startup file to `index.js`

4. Configure environment variables in SiteGround:
   - Go to Site > Node.js Manager > Your Application > Environment Variables
   - Add the required environment variables (DATABASE_URL, STRIPE_SECRET_KEY, etc.)

5. Restart the Node.js application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Dog Duty Pros - info@dogduty.biz