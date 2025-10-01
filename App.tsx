
import React, { useState, useMemo } from 'react';
import { Feature } from './types';
import { FEATURES } from './constants';
import Dashboard from './components/Dashboard';
import FeatureWrapper from './components/shared/FeatureWrapper';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  const handleSelectFeature = (featureId: Feature | null) => {
    setActiveFeature(featureId);
  };

  const activeFeatureConfig = useMemo(() => {
    if (!activeFeature) return null;
    return FEATURES.find(f => f.id === activeFeature);
  }, [activeFeature]);

  return (
    <div className="min-h-screen flex">
      <Sidebar 
        features={FEATURES}
        activeFeature={activeFeature}
        onSelectFeature={handleSelectFeature}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {!activeFeatureConfig ? (
          <Dashboard features={FEATURES} onSelectFeature={handleSelectFeature} />
        ) : (
          <FeatureWrapper 
            title={activeFeatureConfig.title}
            description={activeFeatureConfig.description}
          >
            <activeFeatureConfig.component />
          </FeatureWrapper>
        )}
      </main>
    </div>
  );
};

export default App;
