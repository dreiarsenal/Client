import axiosInstance from '@/utils/axiosInstance';
import { create } from 'zustand';

interface Category {
    id: string;
    title: string;
    icon: string;
}

interface CategoryStore {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (title: string, icon: string) => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    isLoading: false,
    error: null,


    fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/categories');
            set({ categories: response.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },


    createCategory: async (title, icon) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post('/categories', { title, icon });
            set((state) => ({ categories: [...state.categories, response.data], isLoading: false }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useCategoryStore;
