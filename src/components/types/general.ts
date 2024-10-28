export type Expenses = {
  description: string;
  amount: number;
  type: string;
  date: string;
  category: string;
  id: string;
  userId?:string;
};