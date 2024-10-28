export type Expenses = {
  description: string;
  amount: number;
  type: string;
  date: string;
  category: string;
  id: string;
  userId?:string;
};

export type UserType = {
  username: string;
  password: string;
  id: string;
};