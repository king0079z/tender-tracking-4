import React, { useState } from 'react';
import { db } from '../lib/database';

interface NewEmailFormProps {
  companyId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NewEmailForm({ companyId, onCancel, onSuccess }: NewEmailFormProps) {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    sent_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await db.query(
        `INSERT INTO communications (company_id, subject, content, sent_date, created_by)
         VALUES ($1, $2, $3, $4, $5)`,
        [companyId, formData.subject, formData.content, formData.sent_date, 'Admin']
      );

      onSuccess();
    } catch (error) {
      console.error('Error adding communication:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  return (
    // ... existing JSX
  );
}