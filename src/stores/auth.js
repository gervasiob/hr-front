
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    comercialRole: false,
  }),
  actions: {
    setComercialRole(value) {
      this.comercialRole = value;
    },
  },
});
