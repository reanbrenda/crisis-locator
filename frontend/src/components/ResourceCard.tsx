import React from 'react';
import { CrisisResource } from '../types';

interface ResourceCardProps {
  resource: CrisisResource;
  onSave?: (resource: CrisisResource) => void;
  isSaved?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onSave,
  isSaved = false
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave(resource);
    }
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'domestic-violence': 'Domestic Violence',
      'mental-health': 'Mental Health',
      'legal-aid': 'Legal Aid',
      'housing': 'Housing'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="resource-card">
      <div className="resource-header">
        <h3 className="resource-name">{resource.name}</h3>
        <div className="resource-badges">
          <span className="category-badge">
            {getCategoryDisplayName(resource.category)}
          </span>
          {resource.available24h && (
            <span className="availability-badge available-24h">
              24/7 Available
            </span>
          )}
        </div>
      </div>

      <p className="resource-description">{resource.description}</p>
      
      <div className="resource-location">
        <strong>Location:</strong> {resource.location}
      </div>

      <div className="resource-contact">
        <div className="contact-item">
          <strong>Phone:</strong> 
          <a href={`tel:${resource.phone}`} className="contact-link">
            {resource.phone}
          </a>
        </div>
        <div className="contact-item">
          <strong>Website:</strong> 
          <a 
            href={resource.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link"
          >
            Visit Website
          </a>
        </div>
      </div>

      {onSave && (
        <button
          onClick={handleSave}
          className={`save-button ${isSaved ? 'saved' : ''}`}
          aria-label={isSaved ? 'Remove from saved' : 'Save resource'}
        >
          {isSaved ? '✓ Saved' : 'Save Resource'}
        </button>
      )}
    </div>
  );
};