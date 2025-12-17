import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CalendarHomePage } from './pages/CalendarHomePage';
import { MonthlyViewPage } from './pages/MonthlyViewPage';
import { CurrentMonthView } from './pages/CurrentMonthView';
import { MonthSelectionView } from './pages/MonthSelectionView';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calendar" element={<CalendarHomePage />} />
            <Route path="/monthly" element={<MonthlyViewPage />} />
            <Route path="/current-month" element={<CurrentMonthView />} />
            <Route path="/month-selection" element={<MonthSelectionView />} />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;