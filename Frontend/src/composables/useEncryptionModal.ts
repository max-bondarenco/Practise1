import { computed, ref } from 'vue';
import type { IFile } from '../store/file.store';
import { useCryptStore } from '../store/crypt.store';
import { useRouter } from 'vue-router';

export const useEncryptionModal = () => {
  const currentFile = ref<IFile | null>(null);
  const method = ref('');
  const cryptStore = useCryptStore();
  const router = useRouter();

  const handleOpenModal = (file: IFile) => {
    currentFile.value = file;
  };

  const handleCloseModal = () => {
    currentFile.value = null;
  };

  const handleProceed = () => {
    router.push({
      name: 'encrypt',
      params: { id: currentFile.value?.id, method: method.value }
    });
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleProceed,
    currentFile: computed(() => currentFile),
    method,
    methods: computed(() => cryptStore.crypts)
  };
};
