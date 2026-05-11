
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { MOCK_VEHICLES, MOCK_DEALERS } from "./data/mockData";
import { Vehicle, AppState, Dealer } from "./types/index";

// Page Imports
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { RentalsPage } from "./pages/RentalsPage";
import { DealersPage } from "./pages/DealersPage";
import { DealerShowroom } from "./pages/DealerShowroom";
import { VehicleDetailPage } from "./pages/VehicleDetailPage";
import { DealerSignUp } from "./pages/DealerSignUp";
import { DealerLogin } from "./pages/DealerLogin";
import { DashboardPage } from "./pages/DashboardPage";
import { VehicleListing } from "./pages/VehicleListing";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { MessagingPage } from "./pages/MessagingPage";
import { SupportPages } from "./pages/SupportPages";
import { ComparePage } from "./pages/ComparePage";
import { AdminForgotPassword } from "./pages/AdminForgotPassword";

// Layout Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CompareBar } from "./components/CompareBar";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Helper component to scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Transition wrapper for routes
const PageWrapper = () => {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      <Outlet />
    </div>
  );
};

const App = () => {
  // Persistence Logic
  const savedDealers = localStorage.getItem('nexa_dealers');
  const savedVehicles = localStorage.getItem('nexa_vehicles');
  const savedState = localStorage.getItem('nexa_state');

  const [state, setState] = useState<AppState>(savedState ? JSON.parse(savedState) : {
    userType: 'guest',
    userId: null,
    userData: null,
    isAdminAuthenticated: false,
    comparisonIds: []
  });
  
  const [dealers, setDealers] = useState<Dealer[]>(savedDealers ? JSON.parse(savedDealers) : MOCK_DEALERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(savedVehicles ? JSON.parse(savedVehicles) : MOCK_VEHICLES);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nexa_dealers', JSON.stringify(dealers));
  }, [dealers]);

  useEffect(() => {
    localStorage.setItem('nexa_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('nexa_state', JSON.stringify(state));
  }, [state]);

  const toggleComparison = (id: string) => {
    setState(prev => {
      const ids = prev.comparisonIds || [];
      if (ids.includes(id)) {
        return { ...prev, comparisonIds: ids.filter(cid => cid !== id) };
      }
      if (ids.length >= 4) {
        alert('You can compare up to 4 vehicles at a time.');
        return prev;
      }
      return { ...prev, comparisonIds: [...ids, id] };
    });
  };

  const clearComparison = () => {
    setState(prev => ({ ...prev, comparisonIds: [] }));
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FDFDFD] overflow-x-hidden">
        <Header state={state} setState={setState} />
        
        <main className="flex-grow">
          <Routes>
            <Route element={<PageWrapper />}>
              <Route path="/" element={<HomePage vehicles={vehicles} />} />
              <Route path="/listings" element={<ListingsPage vehicles={vehicles} toggleComparison={toggleComparison} comparisonIds={state.comparisonIds || []} />} />
              <Route path="/rentals" element={<RentalsPage vehicles={vehicles} />} />
              <Route path="/dealers" element={<DealersPage dealers={dealers} vehicles={vehicles} />} />
              <Route path="/dealer/:id" element={<DealerShowroom dealers={dealers} vehicles={vehicles} />} />
              <Route path="/vehicle/:id" element={<VehicleDetailPage vehicles={vehicles} dealers={dealers} state={state} toggleComparison={toggleComparison} />} />
              <Route path="/compare" element={<ComparePage vehicles={vehicles} comparisonIds={state.comparisonIds || []} toggleComparison={toggleComparison} clearComparison={clearComparison} />} />
              
              {/* Dealer Auth */}
              <Route path="/login" element={<DealerLogin dealers={dealers} setState={setState} />} />
              <Route path="/signup" element={<DealerSignUp setDealers={setDealers} setState={setState} />} />
              
              {/* Dealer Protected */}
              <Route path="/dashboard" element={<DashboardPage state={state} vehicles={vehicles} setVehicles={setVehicles} />} />
              <Route path="/list-car" element={<VehicleListing state={state} setVehicles={setVehicles} />} />
              <Route path="/messages" element={<MessagingPage state={state} />} />
              
              {/* Admin */}
              <Route path="/admin-login" element={<AdminLogin setState={setState} />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
              <Route path="/admin/dashboard" element={<AdminDashboard state={state} dealers={dealers} setDealers={setDealers} vehicles={vehicles} setVehicles={setVehicles} />} />
              
              {/* Support Pages */}
              <Route path="/faq" element={<SupportPages type="faq" />} />
              <Route path="/support" element={<SupportPages type="support" />} />
              <Route path="/privacy" element={<SupportPages type="privacy" />} />

              <Route path="*" element={<div className="p-40 text-center font-black text-3xl italic text-gray-400">Syncing Node...</div>} />
            </Route>
          </Routes>
        </main>
        
        <Footer state={state} />
        <CompareBar vehicles={vehicles} comparisonIds={state.comparisonIds || []} toggleComparison={toggleComparison} />
        <WhatsAppButton state={state} />
      </div>
    </HashRouter>
  );
};

export default App;
