// userStore.js
import create from 'zustand';

const useUserStore = create((set) => ({
  userEmail: '', 
  setUserEmail: (email) => set({ userEmail: email }), 
}));

export default useUserStore;
