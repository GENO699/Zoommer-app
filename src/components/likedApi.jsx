// likedStore.js
import create from "zustand";

const useLikedStore = create((set) => ({
  likedProducts: [],
  addToLikedProducts: (product) =>
    set((state) => ({ likedProducts: [...state.likedProducts, product] })),
}));

export default useLikedStore;
