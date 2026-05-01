import { create } from "zustand";

interface SearchState {
  query: string;
  location: string;
  propertyType: string[];
  priceRange: [number, number];
  bedrooms: number | null;
  setQuery: (query: string) => void;
  setLocation: (location: string) => void;
  setPropertyType: (types: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setBedrooms: (bedrooms: number | null) => void;
  resetFilters: () => void;
}

const initialState = {
  query: "",
  location: "",
  propertyType: [],
  priceRange: [0, 10000000] as [number, number],
  bedrooms: null,
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,
  setQuery: (query) => set({ query }),
  setLocation: (location) => set({ location }),
  setPropertyType: (propertyType) => set({ propertyType }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setBedrooms: (bedrooms) => set({ bedrooms }),
  resetFilters: () => set(initialState),
}));
