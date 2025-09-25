import axios from 'axios';
import { defineStore } from 'pinia';

export interface ICrypt {
  name: string;
  val: string;
}

export const useCryptStore = defineStore('crypts', {
  state: () => ({ crypts: [] as ICrypt[] }),
  getters: {},
  actions: {
    async getAllCrypts() {
      const { data } = await axios.get<ICrypt[]>(
        'http://localhost:3000/crypts'
      );

      this.crypts = data;
    },

    async encryptFile(data: any) {
      const { data: newContent } = await axios.post<string>(
        'http://localhost:3000/crypts',
        data
      );

      return newContent;
    }
  }
});
