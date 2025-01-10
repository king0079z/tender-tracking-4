import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CompanyTimeline } from '../types/milestones';
import { db } from '../lib/database/azure';
import { sortTimelines } from '../utils/timelineUtils';
import { generateNotifications } from '../utils/notificationUtils';
import { Notification } from '../types/notifications';
import { formatTimelineData } from '../utils/formatters';

interface TimelineContextType {
  timelines: CompanyTimeline[];
  updateTimeline: (updatedTimeline: CompanyTimeline) => Promise<void>;
  loading: boolean;
  error: string | null;
  retry: () => Promise<void>;
  notifications: Notification[];
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const [timelines, setTimelines] = useState<CompanyTimeline[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimelines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { rows } = await db.query('SELECT * FROM timelines ORDER BY updated_at DESC');
      
      if (rows) {
        const formattedTimelines = rows.map(formatTimelineData);
        const sortedTimelines = sortTimelines(formattedTimelines);
        setTimelines(sortedTimelines);
        
        const newNotifications = await generateNotifications(sortedTimelines);
        setNotifications(newNotifications);
      }
    } catch (err) {
      console.error('Error in fetchTimelines:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch timelines');
      setTimelines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimelines();
  }, [fetchTimelines]);

  const updateTimeline = async (timeline: CompanyTimeline) => {
    try {
      await db.query(
        `UPDATE timelines 
         SET nda_received_date = $1,
             nda_received_completed = $2,
             nda_signed_date = $3,
             nda_signed_completed = $4,
             rfi_sent_date = $5,
             rfi_sent_completed = $6,
             rfi_due_date = $7,
             rfi_due_completed = $8,
             offer_received_date = $9,
             offer_received_completed = $10,
             updated_at = NOW()
         WHERE company_id = $11`,
        [
          timeline.ndaReceived.date,
          timeline.ndaReceived.isCompleted,
          timeline.ndaSigned.date,
          timeline.ndaSigned.isCompleted,
          timeline.rfiSent.date,
          timeline.rfiSent.isCompleted,
          timeline.rfiDue.date,
          timeline.rfiDue.isCompleted,
          timeline.offerReceived.date,
          timeline.offerReceived.isCompleted,
          timeline.companyId
        ]
      );

      await fetchTimelines();
    } catch (err) {
      console.error('Error updating timeline:', err);
      throw err;
    }
  };

  return (
    <TimelineContext.Provider value={{ 
      timelines, 
      updateTimeline,
      loading,
      error,
      retry: fetchTimelines,
      notifications
    }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}