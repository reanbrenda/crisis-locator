import React from 'react';
import { CrisisResource } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceListProps {
  resources: CrisisResource[];
  loading: boolean;
  error: string | null;
  onSaveResource?: (resource: CrisisResource) => void;
  savedResources?: Set<number>;
}

export const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  loading,
  error,
  onSaveResource,
  savedResources = new Set()
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Searching for resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <p>Please try again or check your connection.</p>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="empty-container">
        <h3>No resources found</h3>
        <p>Try adjusting your search criteria or location.</p>
        <ul className="search-tips">
          <li>Make sure your location is spelled correctly</li>
          <li>Try searching without a specific category</li>
          <li>Check if there are national resources available</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="resource-list">
      <div className="results-header">
        <h2>Found {resources.length} resource{resources.length !== 1 ? 's' : ''}</h2>
      </div>
      
      <div className="resource-grid">
        {resources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onSave={onSaveResource}
            isSaved={savedResources.has(resource.id)}
          />
        ))}
      </div>
    </div>
  );
};