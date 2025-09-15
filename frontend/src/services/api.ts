import { CrisisResource, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

export class CrisisResourceAPI {
  static async searchResources(location: string, category: string): Promise<ApiResponse> {
    const params = new URLSearchParams();
    
    if (location.trim()) {
      params.append('location', location.trim());
    }
    
    if (category && category !== '') {
      params.append('category', category);
    }

    const url = `${API_BASE_URL}/api/resources?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}