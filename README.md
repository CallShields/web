# CallShields

Open-source scam protection for everyone.

CallShields is an AI-powered scam detection platform that helps protect users from fraudulent phone calls and messages. Using advanced machine learning models, CallShields analyzes call patterns, voice characteristics, and content to identify potential scams in real-time.

## Features

- **Real-time Scam Detection**: AI-powered analysis of incoming calls
- **Privacy-First Design**: Your data stays secure and private
- **Community Protection**: Share scam reports to protect others
- **Multi-Platform Support**: Web dashboard and mobile integration
- **Detailed Analytics**: Track and analyze scam patterns

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account (for backend services)

### Installation

```bash
# Clone the repository
git clone https://github.com/phone-scam/callguard.git
cd callshields_web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Authentication, Edge Functions)
- **Payment Processing**: Stripe
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Structure

```
callshields_web/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (auth)/       # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   ├── pricing/      # Pricing page
│   │   └── ...
│   ├── components/       # React components
│   │   ├── ui/          # UI components (shadcn/ui)
│   │   └── ...
│   └── lib/             # Utility functions
├── supabase/
│   ├── functions/       # Edge functions
│   └── migrations/      # Database migrations
└── ...
```

## Support

- **Issues**: [GitHub Issues](https://github.com/phone-scam/callguard/issues)

## Trademark Notice

"CallShields" and associated logos are trademarks of The CallShields Project. Use of these trademarks requires explicit written permission.

---

© 2026 CallShields · [Modified AGPL-3.0 License](./LICENSE)
