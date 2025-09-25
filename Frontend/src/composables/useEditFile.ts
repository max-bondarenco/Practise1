import type { SubmissionHandler } from 'vee-validate';
import { useFileStore, type IFile } from '../store/file.store';
import type { IFileFormValues } from './useAddFile';
import { useRoute, useRouter } from 'vue-router';

export const useEditFile = () => {
  const fileStore = useFileStore();
  const route = useRoute();
  const router = useRouter();

  const handleSubmit: SubmissionHandler<IFileFormValues> = async (values) => {
    await fileStore.updateFile(+route.params.id!, values);
    router.push({ name: 'file-list' });
  };

  return { handleSubmit, file: route.meta.file as IFile };
};
