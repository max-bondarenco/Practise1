import { computed } from 'vue';
import { useFileStore, type IFile } from '../store/file.store';

export const useFileList = () => {
  const fileStore = useFileStore();

  const handleDeleteFile = async (id: number) => {
    await fileStore.deleteFile(id);
  };

  const handleDownloadFile = async (file: IFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    files: computed(() => fileStore.files),
    handleDeleteFile,
    handleDownloadFile
  };
};
