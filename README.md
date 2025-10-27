# Calendar App

A high-fidelity calendar application built with Next.js 15, Material-UI, and MongoDB. Features a rich, interactive interface with multiple calendar views and real-time event management.

![Monthly View](./Monthly%20view.png)
![Agenda View](./Agenda%20view.png)

## Features

- **Multiple Calendar Views**
  - Month view with event previews
  - Week view with time slots
  - Day view with detailed scheduling
  - Agenda view for event list
- **Event Management**
  - Create, edit, and delete events
  - All-day events support
  - Event colors and customization
  - Location and description fields
- **Interactive Interface**
  - Drag and drop events (coming soon)
  - Mini calendar for quick navigation
  - Responsive design for all devices
- **Rich Features**
  - Real-time updates using SWR
  - MongoDB integration for data persistence
  - Material UI components
  - TypeScript for type safety

## Tech Stack

- **Frontend**
  - Next.js 15
  - React 19
  - Material UI v7
  - TypeScript
  - SWR for data fetching
  - date-fns for date manipulation
- **Backend**
  - MongoDB with Mongoose
  - Next.js API Routes
  - RESTful API design

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Setup

1. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the calendar app

## API Routes

- `GET /api/events` - List all events with optional date range filtering
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get a specific event
- `PUT /api/events/[id]` - Update an event
- `DELETE /api/events/[id]` - Delete an event
- `GET /api/health` - Check API and database health

## Deployment

Deploy using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - Feel free to use this project for your own purposes.

## Contact

For questions or feedback, please open an issue in the GitHub repository.
