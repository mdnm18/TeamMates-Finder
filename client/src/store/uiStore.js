import { create } from 'zustand';

const useUIStore = create((set) => ({
  theme: 'system', // 'light', 'dark', 'system'
  isMobileNavVisible: true,
  setTheme: (theme) => set({ theme }),
  toggleMobileNav: (isVisible) => set({ isMobileNavVisible: isVisible }),
}));

export default useUIStore;
