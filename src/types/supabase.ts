export interface Database {
  public: {
    Tables: {
      timelines: {
        Row: {
          id: string;
          company_id: string;
          company_name: string;
          nda_received_date: Date | null;
          nda_received_completed: boolean;
          nda_signed_date: Date | null;
          nda_signed_completed: boolean;
          rfi_sent_date: Date | null;
          rfi_sent_completed: boolean;
          rfi_due_date: Date | null;
          rfi_due_completed: boolean;
          offer_received_date: Date | null;
          offer_received_completed: boolean;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          id?: string;
          company_id: string;
          company_name: string;
          nda_received_date?: Date | null;
          nda_received_completed?: boolean;
          nda_signed_date?: Date | null;
          nda_signed_completed?: boolean;
          rfi_sent_date?: Date | null;
          rfi_sent_completed?: boolean;
          rfi_due_date?: Date | null;
          rfi_due_completed?: boolean;
          offer_received_date?: Date | null;
          offer_received_completed?: boolean;
          created_at?: Date;
          updated_at?: Date;
        };
        Update: {
          id?: string;
          company_id?: string;
          company_name?: string;
          nda_received_date?: Date | null;
          nda_received_completed?: boolean;
          nda_signed_date?: Date | null;
          nda_signed_completed?: boolean;
          rfi_sent_date?: Date | null;
          rfi_sent_completed?: boolean;
          rfi_due_date?: Date | null;
          rfi_due_completed?: boolean;
          offer_received_date?: Date | null;
          offer_received_completed?: boolean;
          created_at?: Date;
          updated_at?: Date;
        };
      };
    };
  };
}