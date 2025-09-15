import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
interface CrisisResource {
  id: number;
  name: string;
  category: 'domestic-violence' | 'mental-health' | 'legal-aid' | 'housing';
  location: string;
  phone: string;
  website: string;
  available24h: boolean;
  description: string;
}

const resources: CrisisResource[] = [
  {
    id: 1,
    name: "National Domestic Violence Hotline",
    category: "domestic-violence",
    location: "National",
    phone: "1-800-799-7233",
    website: "https://www.thehotline.org",
    available24h: true,
    description: "24/7 confidential support"
  },
  {
    id: 2,
    name: "Crisis Text Line",
    category: "mental-health",
    location: "National",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    available24h: true,
    description: "24/7 crisis support via text"
  },
  {
    id: 3,
    name: "Local Women's Shelter - NYC",
    category: "domestic-violence",
    location: "New York",
    phone: "212-555-0123",
    website: "https://example-shelter.org",
    available24h: false,
    description: "Safe housing and support services"
  },
  {
    id: 4,
    name: "NYC Mental Health Crisis Line",
    category: "mental-health",
    location: "New York",
    phone: "1-888-692-9355",
    website: "https://nycwell.cityofnewyork.us",
    available24h: true,
    description: "Free, confidential mental health support"
  },
  {
    id: 5,
    name: "Legal Aid Society",
    category: "legal-aid",
    location: "New York",
    phone: "212-577-3300",
    website: "https://legalaidnyc.org",
    available24h: false,
    description: "Free legal services for low-income individuals"
  },
  {
    id: 6,
    name: "Coalition for the Homeless",
    category: "housing",
    location: "New York",
    phone: "212-776-2000",
    website: "https://www.coalitionforthehomeless.org",
    available24h: false,
    description: "Housing assistance and advocacy"
  },
  {
    id: 7,
    name: "National Suicide Prevention Lifeline",
    category: "mental-health",
    location: "National",
    phone: "988",
    website: "https://suicidepreventionlifeline.org",
    available24h: true,
    description: "Free and confidential emotional support"
  },
  {
    id: 8,
    name: "Los Angeles Domestic Violence Shelter",
    category: "domestic-violence",
    location: "Los Angeles",
    phone: "213-955-9090",
    website: "https://example-la-shelter.org",
    available24h: true,
    description: "Emergency shelter and support services"
  },
  {
    id: 9,
    name: "Chicago Legal Clinic",
    category: "legal-aid",
    location: "Chicago",
    phone: "312-988-6200",
    website: "https://example-legal-clinic.org",
    available24h: false,
    description: "Pro bono legal assistance"
  },
  {
    id: 10,
    name: "Miami Housing Trust",
    category: "housing",
    location: "Miami",
    phone: "305-579-0202",
    website: "https://example-housing-trust.org",
    available24h: false,
    description: "Affordable housing programs and rental assistance"
  }
];

app.get('/api/resources', (req: Request, res: Response) => {
  try {
    const { location, category } = req.query;

    const validCategories = ['domestic-violence', 'mental-health', 'legal-aid', 'housing'];
    if (category && !validCategories.includes(category as string)) {
      return res.status(400).json({
        error: 'Invalid category',
        validCategories
      });
    }

    let filteredResources = resources;

    if (location && location !== '') {
      const locationStr = (location as string).toLowerCase().trim();
      filteredResources = filteredResources.filter(resource =>
        resource.location.toLowerCase().includes(locationStr) ||
        resource.location.toLowerCase() === 'national'
      );
    }

    if (category && category !== '') {
      filteredResources = filteredResources.filter(resource =>
        resource.category === category
      );
    }

    filteredResources.sort((a, b) => {
      if (a.available24h && !b.available24h) return -1;
      if (!a.available24h && b.available24h) return 1;
      return a.name.localeCompare(b.name);
    });

    res.json({
      success: true,
      count: filteredResources.length,
      data: filteredResources
    });

  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Crisis Resource API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.use((error: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Resources API: http://localhost:${PORT}/api/resources`);
});

module.exports = app;