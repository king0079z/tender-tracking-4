import React, { useState, useEffect } from 'react';
import { Mail, Plus, X } from 'lucide-react';
import { db } from '../lib/database';
import EmailCommunication from './EmailCommunication';
import NewEmailForm from './NewEmailForm';

// ... rest of the imports

export default function EmailHistory({ companyId, companyName, isAdmin }: EmailHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCommunications = async () => {
    try {
      setLoading(true);
      const { rows: comms } = await db.query(
        'SELECT * FROM communications WHERE company_id = $1 ORDER BY sent_date DESC',
        [companyId]
      );

      const communicationsWithResponses = await Promise.all(comms.map(async (comm) => {
        const { rows: responses } = await db.query(
          'SELECT * FROM communication_responses WHERE communication_id = $1 ORDER BY created_at ASC',
          [comm.id]
        );

        return {
          ...comm,
          responses: responses || []
        };
      }));

      setCommunications(communicationsWithResponses);
    } catch (error) {
      console.error('Error fetching communications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCommunications();
    }
  }, [isOpen]);

  // Rest of the component remains the same
  return (
    // ... existing JSX
  );
}