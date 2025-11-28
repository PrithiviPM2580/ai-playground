// ============================================================
// 🔹Constants — Application-wide constant values
// ============================================================

// ------------------------------------------------------
// Students Data
// ------------------------------------------------------
export const CREATE_STUDENTS: Students[] = [
  { name: "Ramesh Thapa", age: 17, batch_id: 1, fees_status: "PAID" },
  { name: "Sita Magar", age: 16, batch_id: 1, fees_status: "UNPAID" },
  { name: "Krishna Karki", age: 18, batch_id: 1, fees_status: "PAID" },
  { name: "Nirmala Rai", age: 17, batch_id: 2, fees_status: "PAID" },
  { name: "Bikram Lama", age: 18, batch_id: 2, fees_status: "UNPAID" },
  { name: "Asha KC", age: 16, batch_id: 2, fees_status: "PAID" },
  { name: "Laxmi Tamang", age: 17, batch_id: 3, fees_status: "PAID" },
  {
    name: "Prakash Basnet",
    age: 18,
    batch_id: 3,
    fees_status: "UNPAID",
  },
  { name: "Anisha Shrestha", age: 16, batch_id: 3, fees_status: "PAID" },
  { name: "Deepak Shahi", age: 19, batch_id: 4, fees_status: "UNPAID" },
  {
    name: "Rupesh Chaudhary",
    age: 18,
    batch_id: 4,
    fees_status: "PAID",
  },
  {
    name: "Mina Budhathoki",
    age: 16,
    batch_id: 4,
    fees_status: "PAID",
  },
  { name: "Rita Bohara", age: 17, batch_id: 5, fees_status: "PAID" },
  { name: "Govind Thapa", age: 18, batch_id: 5, fees_status: "UNPAID" },
  {
    name: "Saraswati Gurung",
    age: 16,
    batch_id: 5,
    fees_status: "PAID",
  },
];

// ------------------------------------------------------
// Batches Data
// ------------------------------------------------------
export const CREATE_BATCHES: Batches[] = [
  { batch_name: "Batch A", subject: "Math" },
  { batch_name: "Batch B", subject: "Science" },
  { batch_name: "Batch C", subject: "English" },
  { batch_name: "Batch D", subject: "Computer" },
  { batch_name: "Batch E", subject: "Accountancy" },
];

// ------------------------------------------------------
// Fees Data
// ------------------------------------------------------
export const CREATE_FEES: Fees[] = [
  {
    amount: 1500,
    payment_date: new Date("2024-01-15"),
    mode: "CASH",
    student_id: 1,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-02-15"),
    mode: "ONLINE",
    student_id: 1,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-01-10"),
    mode: "CASH",
    student_id: 2,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-01-20"),
    mode: "CARD",
    student_id: 3,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-01-14"),
    mode: "ONLINE",
    student_id: 4,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-01-09"),
    mode: "CASH",
    student_id: 5,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-01-11"),
    mode: "CARD",
    student_id: 6,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-01-12"),
    mode: "ONLINE",
    student_id: 7,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-01-18"),
    mode: "CASH",
    student_id: 8,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-01-17"),
    mode: "CASH",
    student_id: 9,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-01-20"),
    mode: "CARD",
    student_id: 10,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-01-19"),
    mode: "ONLINE",
    student_id: 11,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-01-21"),
    mode: "CASH",
    student_id: 12,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-01-15"),
    mode: "CARD",
    student_id: 13,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-01-11"),
    mode: "ONLINE",
    student_id: 14,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-01-09"),
    mode: "CASH",
    student_id: 15,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-03-15"),
    mode: "CARD",
    student_id: 1,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-03-18"),
    mode: "CASH",
    student_id: 3,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-02-18"),
    mode: "ONLINE",
    student_id: 5,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-02-20"),
    mode: "CASH",
    student_id: 6,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-02-10"),
    mode: "ONLINE",
    student_id: 8,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-02-14"),
    mode: "CARD",
    student_id: 9,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-02-12"),
    mode: "CASH",
    student_id: 11,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-02-09"),
    mode: "CARD",
    student_id: 12,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-02-17"),
    mode: "CASH",
    student_id: 14,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-02-19"),
    mode: "ONLINE",
    student_id: 15,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-03-01"),
    mode: "CARD",
    student_id: 2,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-03-02"),
    mode: "CASH",
    student_id: 4,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-03-03"),
    mode: "ONLINE",
    student_id: 7,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-03-04"),
    mode: "CASH",
    student_id: 10,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-03-06"),
    mode: "ONLINE",
    student_id: 13,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-04-01"),
    mode: "CASH",
    student_id: 5,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-04-02"),
    mode: "ONLINE",
    student_id: 9,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-04-04"),
    mode: "CASH",
    student_id: 12,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-04-05"),
    mode: "ONLINE",
    student_id: 1,
  },
  {
    amount: 1600,
    payment_date: new Date("2024-04-06"),
    mode: "CARD",
    student_id: 4,
  },
  {
    amount: 1400,
    payment_date: new Date("2024-04-07"),
    mode: "CASH",
    student_id: 7,
  },
  {
    amount: 1700,
    payment_date: new Date("2024-04-08"),
    mode: "ONLINE",
    student_id: 10,
  },
  {
    amount: 1500,
    payment_date: new Date("2024-04-10"),
    mode: "CASH",
    student_id: 3,
  },
  {
    amount: 1800,
    payment_date: new Date("2024-04-11"),
    mode: "CARD",
    student_id: 15,
  },
];
