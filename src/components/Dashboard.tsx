import React from 'react';
import { Clock, Users, AlertCircle } from 'lucide-react';
import BiddersList from './BiddersList';
import RFITimeline from './RFITimeline';
import StatusSummary from './StatusSummary';
import NotificationPanel from './NotificationPanel';
import { useTimeline } from '../context/TimelineContext';

interface DashboardProps {
  isAdmin: boolean;
}

export default function Dashboard({ isAdmin }: DashboardProps) {
  const { timelines } = useTimeline();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <span className="ml-2 text-lg sm:text-xl font-semibold">Tender Track</span>
            </div>
            <NotificationPanel />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-8">
          <StatusSummary />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <BiddersList isAdmin={isAdmin} />
          </div>
          <div className="order-first lg:order-none mb-4 lg:mb-0">
            <RFITimeline />
          </div>
        </div>
      </main>
    </div>
  );
}