// ============================================================
// 🔹TypeDefination — Type definitions for the application
// ============================================================

declare global {
  interface Students {
    name: string;
    age: number;
    batch_id: number;
    fees_status: "PAID" | "UNPAID";
  }

  interface Batches {
    batch_name: string;
    subject: string;
  }

  interface Fees {
    amount: number;
    payment_date: Date;
    mode: "CASH" | "ONLINE" | "CARD";
    student_id: number;
  }
}

export {};
