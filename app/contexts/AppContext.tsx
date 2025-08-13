import React, { createContext, useContext, useEffect, useState } from 'react';

interface DashboardData {
  notesToday: number;
  avgTimeSaved: string;
  codingAccuracy: string;
  revenueImpact: string;
}

interface AppContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const fetchDashboardData = async (): Promise<void> => {
    try {
      // Replace with actual API call
      const mockData: DashboardData = {
        notesToday: 12,
        avgTimeSaved: '14 min',
        codingAccuracy: '94%',
        revenueImpact: '$2,847'
      };
      setDashboardData(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <AppContext.Provider value={{ dashboardData, isLoading, isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => useContext(AppContext);