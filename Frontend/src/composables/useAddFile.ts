import type { SubmissionHandler } from 'vee-validate';
import * as yup from 'yup';
import { useFileStore } from '../store/file.store';
import { useRouter } from 'vue-router';

export interface IFileFormValues {
  name: string;
  content?: string;
}

export const fileSchema: yup.ObjectSchema<IFileFormValues> = yup.object({
  name: yup
    .string()
    .required('File name is required')
    .max(30, 'File name is too long'),
  content: yup.string().optional().default('')
});

export const useAddFile = () => {
  const fileStore = useFileStore();
  const router = useRouter();

  const handleSubmit: SubmissionHandler<IFileFormValues> = async (values) => {
    await fileStore.createFile(values);
    router.push({ name: 'file-list' });
  };

  return { handleSubmit };
};
