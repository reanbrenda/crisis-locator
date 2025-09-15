import React from 'react';
import { SearchFilters } from '../types';

interface SearchFormProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  loading: boolean;
}

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'domestic-violence', label: 'Domestic Violence' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'legal-aid', label: 'Legal Aid' },
  { value: 'housing', label: 'Housing' }
];

export const SearchForm: React.FC<SearchFormProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={filters.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Enter city name (e.g., New York, Los Angeles)"
          className="form-input"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="form-select"
          disabled={loading}
        >
          {CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="search-button"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Resources'}
      </button>
    </form>
  );
};