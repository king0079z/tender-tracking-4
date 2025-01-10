import { supabase } from '../lib/supabase';
import { vendors } from '../data/vendors';
import { authService } from '../services/authService';

export const initializeBidders = async () => {
  try {
    // Ensure authentication
    await authService.ensureAuthenticated();

    // Check for existing data
    const { data: existingData, error: checkError } = await supabase
      .from('timelines')
      .select('company_id');

    if (checkError) throw checkError;

    // Only initialize if no data exists
    if (!existingData || existingData.length === 0) {
      const initialData = vendors.map(vendor => ({
        company_id: vendor.companyId,
        company_name: vendor.companyName,
        nda_received_date: vendor.ndaReceived.date,
        nda_received_completed: vendor.ndaReceived.isCompleted,
        nda_signed_date: vendor.ndaSigned.date,
        nda_signed_completed: vendor.ndaSigned.isCompleted,
        rfi_sent_date: vendor.rfiSent.date,
        rfi_sent_completed: vendor.rfiSent.isCompleted,
        rfi_due_date: vendor.rfiDue.date,
        rfi_due_completed: vendor.rfiDue.isCompleted,
        offer_received_date: vendor.offerReceived.date,
        offer_received_completed: vendor.offerReceived.isCompleted
      }));

      // Insert data in smaller chunks to avoid payload size limits
      const chunkSize = 5;
      for (let i = 0; i < initialData.length; i += chunkSize) {
        const chunk = initialData.slice(i, i + chunkSize);
        const { error: insertError } = await supabase
          .from('timelines')
          .insert(chunk);

        if (insertError) throw insertError;
      }
      
      console.log('Successfully initialized bidders data');
      return true;
    }
    
    console.log('Bidders data already exists');
    return false;
  } catch (error) {
    console.error('Error initializing bidders:', error);
    throw error;
  }
};