import { onBeforeMount } from 'vue';
import { useFileStore } from '../store/file.store';
import { useCryptStore } from '../store/crypt.store';

export const useFirstLoad = () => {
  const fileStore = useFileStore();
  const cryptStore = useCryptStore();

  onBeforeMount(async () => {
    await fileStore.getAllFiles();
    await cryptStore.getAllCrypts();
  });
};
