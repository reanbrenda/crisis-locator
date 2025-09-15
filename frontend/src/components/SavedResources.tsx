import React from 'react';
import { CrisisResource } from '../types';
import { ResourceCard } from './ResourceCard';

interface SavedResourcesProps {
  savedResources: CrisisResource[];
  onRemoveResource: (resourceId: number) => void;
  onClearAll: () => void;
}

export const SavedResources: React.FC<SavedResourcesProps> = ({
  savedResources,
  onRemoveResource,
  onClearAll
}) => {
  if (savedResources.length === 0) {
    return (
      <div className="saved-resources">
        <h2>Saved Resources</h2>
        <p className="empty-message">No saved resources yet.</p>
        <p>Save resources from your search results to access them here.</p>
      </div>
    );
  }

  return (
    <div className="saved-resources">
      <div className="saved-header">
        <h2>Saved Resources ({savedResources.length})</h2>
        <button 
          onClick={onClearAll}
          className="clear-all-button"
          aria-label="Clear all saved resources"
        >
          Clear All
        </button>
      </div>
      
      <div className="resource-grid">
        {savedResources.map(resource => (
          <div key={resource.id} className="saved-resource-item">
            <ResourceCard resource={resource} />
            <button
              onClick={() => onRemoveResource(resource.id)}
              className="remove-button"
              aria-label={`Remove ${resource.name} from saved resources`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};