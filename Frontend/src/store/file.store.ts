import axios from 'axios';
import { defineStore } from 'pinia';
import type { IFileFormValues } from '../composables/useAddFile';
import type { RouteLocationNormalizedGeneric } from 'vue-router';

export interface IFile {
  id: number;
  name: string;
  content: string;
}

export const useFileStore = defineStore('files', {
  state: () => ({ files: [] as IFile[] }),
  getters: {},
  actions: {
    async getAllFiles() {
      const { data } = await axios.get<IFile[]>('http://localhost:3000/files');
      this.files = data;
    },

    async createFile(fd: IFileFormValues) {
      const { data } = await axios.post<IFile>(
        'http://localhost:3000/files',
        fd
      );
      this.files.unshift(data);
    },

    async updateFile(id: number, fd: IFileFormValues) {
      const { data } = await axios.patch<IFile>(
        `http://localhost:3000/files/${id}`,
        fd
      );

      const oldFile = this.files.find((f) => f.id === id);
      oldFile!.name = data.name;
      oldFile!.content = data.content || '';
    },

    async getFileById(id: number) {
      const { data } = await axios.get<IFile>(
        `http://localhost:3000/files/${id}`
      );

      return data;
    },

    async deleteFile(id: number) {
      await axios.delete(`http://localhost:3000/files/${id}`);

      this.files = this.files.filter((f) => f.id !== id);
    }
  }
});

export const preloadFile = async (to: RouteLocationNormalizedGeneric) => {
  const fileStore = useFileStore();
  to.meta.file = await fileStore.getFileById(+to.params.id!);
};
