import request from 'supertest';
import app from '../src/server';

describe('Crisis Resource API', () => {
  describe('GET /api/resources', () => {
    it('should return all resources when no filters are applied', async () => {
      const response = await request(app)
        .get('/api/resources')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter resources by location', async () => {
      const response = await request(app)
        .get('/api/resources?location=New York')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned resources should be either in New York or National
      response.body.data.forEach((resource: any) => {
        expect(
          resource.location.toLowerCase().includes('new york') || 
          resource.location.toLowerCase() === 'national'
        ).toBe(true);
      });
    });

    it('should filter resources by category', async () => {
      const response = await request(app)
        .get('/api/resources?category=mental-health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned resources should be mental-health category
      response.body.data.forEach((resource: any) => {
        expect(resource.category).toBe('mental-health');
      });
    });

    it('should filter resources by both location and category', async () => {
      const response = await request(app)
        .get('/api/resources?location=New York&category=domestic-violence')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned resources should match both criteria
      response.body.data.forEach((resource: any) => {
        expect(resource.category).toBe('domestic-violence');
        expect(
          resource.location.toLowerCase().includes('new york') || 
          resource.location.toLowerCase() === 'national'
        ).toBe(true);
      });
    });

    it('should return 400 for invalid category', async () => {
      const response = await request(app)
        .get('/api/resources?category=invalid-category')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid category');
      expect(response.body.validCategories).toBeDefined();
    });

    it('should return empty array when no resources match filters', async () => {
      const response = await request(app)
        .get('/api/resources?location=NonExistentCity')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Crisis Resource API is running');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('404 handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/non-existent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Endpoint not found');
    });
  });
});
