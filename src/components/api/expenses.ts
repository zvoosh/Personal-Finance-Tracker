import axios from "axios";
import { Expenses } from "../types";

export const expensesPut = async ({
  newExp,
  id,
}: {
  newExp: Expenses;
  id: string;
}) => {
  return axios.put(
    `https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/expenses/${id}`,
    newExp
  );
};
export const expensesDelete = async (id: string) => {
  return axios.delete(
    `https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/expenses/${id}`
  );
};