import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { useThemeStore } from './stores/themeStore';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <Router>
      <div className={`flex h-screen ${theme}`}>
        <Sidebar />
        <main className="flex-1 overflow-auto bg-background text-foreground p-6">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;