import React from 'react';
import Dashboard from './components/Dashboard';
import AdminButton from './components/AdminButton';
import AdminLogin from './components/AdminLogin';
import { TimelineProvider } from './context/TimelineContext';
import { db } from './lib/database/azure';

export default function App() {
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [dbError, setDbError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const initDb = async () => {
      try {
        await db.connect();
      } catch (error) {
        setDbError(error instanceof Error ? error.message : 'Failed to connect to database');
      }
    };

    initDb();
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  const handleCloseLogin = () => {
    setShowAdminLogin(false);
  };

  if (dbError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-red-600 text-xl font-semibold mb-4">Database Connection Error</h1>
          <p className="text-gray-600">{dbError}</p>
        </div>
      </div>
    );
  }

  return (
    <TimelineProvider>
      <Dashboard isAdmin={isAdmin} />
      <AdminButton 
        onClick={() => setShowAdminLogin(true)} 
        className={isAdmin ? 'hidden' : ''} 
      />
      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleLogin} 
          onClose={handleCloseLogin} 
        />
      )}
    </TimelineProvider>
  );
}