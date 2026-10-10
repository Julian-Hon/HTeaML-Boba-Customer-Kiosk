# HTeaML Boba Customer Kiosk

An accessible self-service ordering kiosk for a boba shop. The project is designed to help customers place orders independently, including customers with color-vision differences, low vision, or blindness.

## Highlights

- Customer, employee, and manager flows
- Google OAuth sign-in with role-based access
- PostgreSQL-backed menu and order data
- Weather information on kiosk pages via OpenWeather
- Audio-ordering experiment using OpenAI transcription and structured order parsing

## Tech stack

Node.js, Express, EJS, PostgreSQL, Google OAuth, OpenWeather, and OpenAI APIs.

## Getting started

### Prerequisites

- Node.js 20 or later
- A PostgreSQL database with the kiosk schema and data
- Google OAuth credentials
- OpenWeather API key

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in the values:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000`.

## Configuration notes

The landing page works without an OpenWeather key, but it will not show weather data. Customer, employee, and manager flows require the PostgreSQL schema and seeded data used by the original project. The included audio recordings are demo artifacts; `example.mjs` is an independent OpenAI proof of concept.

## Project structure

```text
.
├── index.js           # Express server entry point
├── routes/             # Customer, employee, manager, and API routes
├── views/              # EJS templates
├── public/             # Browser JavaScript, styles, images, and audio
├── services/           # Voice-ordering helpers
├── example.mjs        # Voice-ordering proof of concept
├── .env.example       # Required environment variables (safe to commit)
├── package.json
└── *.m4a              # Demo recordings
```

## Contributing

Keep credentials in `.env` only. Before opening a pull request, run:

```bash
npm test
```

