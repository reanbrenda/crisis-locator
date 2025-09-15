import React, { useState, useEffect } from 'react';
import { CrisisResource, SearchFilters, SearchState } from './types';
import { CrisisResourceAPI } from './services/api';
import { SearchForm } from './components/SearchForm';
import { ResourceList } from './components/ResourceList';
import { SavedResources } from './components/SavedResources';
import './App.css';

const SAVED_RESOURCES_KEY = 'crisis-resource-saved';

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    filters: { location: '', category: '' },
    results: [],
    loading: false,
    error: null
  });

  const [savedResources, setSavedResources] = useState<CrisisResource[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_RESOURCES_KEY);
    if (saved) {
      try {
        setSavedResources(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved resources:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_RESOURCES_KEY, JSON.stringify(savedResources));
  }, [savedResources]);

  const handleSearch = async () => {
    setSearchState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await CrisisResourceAPI.searchResources(
        searchState.filters.location,
        searchState.filters.category
      );
      
      setSearchState(prev => ({
        ...prev,
        results: response.data,
        loading: false
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred while searching'
      }));
    }
  };

  const handleFiltersChange = (filters: SearchFilters) => {
    setSearchState(prev => ({ ...prev, filters }));
  };

  const handleSaveResource = (resource: CrisisResource) => {
    setSavedResources(prev => {
      const isAlreadySaved = prev.some(r => r.id === resource.id);
      if (isAlreadySaved) {
        return prev.filter(r => r.id !== resource.id);
      } else {
        return [...prev, resource];
      }
    });
  };

  const handleRemoveResource = (resourceId: number) => {
    setSavedResources(prev => prev.filter(r => r.id !== resourceId));
  };

  const handleClearAll = () => {
    setSavedResources([]);
  };

  const savedResourceIds = new Set(savedResources.map(r => r.id));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Crisis Resource Locator</h1>
        <p>Find local crisis support resources when you need them most</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Resources
        </button>
        <button
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Resources ({savedResources.length})
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'search' ? (
          <>
            <SearchForm
              filters={searchState.filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
              loading={searchState.loading}
            />
            <ResourceList
              resources={searchState.results}
              loading={searchState.loading}
              error={searchState.error}
              onSaveResource={handleSaveResource}
              savedResources={savedResourceIds}
            />
          </>
        ) : (
          <SavedResources
            savedResources={savedResources}
            onRemoveResource={handleRemoveResource}
            onClearAll={handleClearAll}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          <strong>Need immediate help?</strong> If you're in immediate danger, 
          call 911 or your local emergency services.
        </p>
        <p>
          This tool is for informational purposes only and does not replace 
          professional crisis intervention services.
        </p>
      </footer>
    </div>
  );
}

export default App;