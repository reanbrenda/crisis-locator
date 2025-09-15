# Crisis Resource Locator

A web application for finding local crisis support resources. Built with Express.js and React.

## Features

- Search resources by location and category
- Categories: Domestic Violence, Mental Health, Legal Aid, Housing
- 24/7 availability indicators
- Save resources for quick access
- Responsive design
- Error handling and loading states

## Tech Stack

Backend: Node.js, Express.js, TypeScript, Jest
Frontend: React 18, TypeScript, CSS3, Local Storage

## Project Structure

```
crisis-resource-locator/
├── backend/
│   ├── src/
│   │   └── server.ts          # Express server with API endpoints
│   ├── tests/
│   │   └── api.test.ts        # API tests
│   ├── package.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx            # Main application component
│   │   └── App.css            # Application styles
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

### Running Tests

Backend tests:
```bash
cd backend
npm test
```

Frontend tests:
```bash
cd frontend
npm test
```

## API Endpoints

### GET /api/resources
Search for crisis resources with optional filtering.

**Query Parameters:**
- `location` (optional): Filter by location (e.g., "New York", "Los Angeles")
- `category` (optional): Filter by category ("domestic-violence", "mental-health", "legal-aid", "housing")

**Example:**
```
GET /api/resources?location=New York&category=mental-health
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "NYC Mental Health Crisis Line",
      "category": "mental-health",
      "location": "New York",
      "phone": "1-888-692-9355",
      "website": "https://nycwell.cityofnewyork.us",
      "available24h": true,
      "description": "Free, confidential mental health support"
    }
  ]
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Crisis Resource API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development

Built with TypeScript for type safety and Vite for fast development. Includes error handling and responsive design.

## License

This project is created for the Spring ACT coding exercise.
