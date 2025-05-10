import axiosInstance from '@/utils/axiosInstance';
import { create } from 'zustand';

interface Expense {
    id: string;
    title: string;
    amount: number;
    categoryId: number;
}

interface ExpenseStore {
    expenses: Expense[];
    loading: boolean;
    error: string | null;
    fetchExpenses: () => Promise<void>;
    addExpense: (expenseData: Omit<Expense, 'id'>) => Promise<void>;
}

const useExpenseStore = create<ExpenseStore>((set) => ({
    expenses: [],
    loading: false,
    error: null,


    fetchExpenses: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get<Expense[]>('/expense');
            set({ expenses: response.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
            set({ loading: false });
        }
    },

    addExpense: async (expenseData: Omit<Expense, 'id'>) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/expense', expenseData);
            set((state) => ({ expenses: [...state.expenses, response.data] }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useExpenseStore;
