import { useRoute, useRouter } from 'vue-router';
import { useFileStore, type IFile } from '../store/file.store';
import * as yup from 'yup';
import { computed } from 'vue';
import type { SubmissionHandler } from 'vee-validate';
import { useCryptStore } from '../store/crypt.store';

export const useEncrypt = () => {
  const route = useRoute();
  const router = useRouter();
  const cryptStore = useCryptStore();
  const fileStore = useFileStore();
  const file = route.meta.file as IFile;
  const method = route.params.method;

  const validationSchema = computed(() => {
    let schema = yup.object().shape({
      content: yup.string().optional().default(''),
      method: yup.string().required(),
      operation: yup.string().required('Select operation type')
    });

    if (method === 'csr') {
      schema = schema.shape({
        key: yup
          .number()
          .required('Key is required')
          .min(0, 'Key must not be negative')
      });
    } else if (method === 'tms') {
      schema = schema.shape({
        key: yup
          .string()
          .required('Key is required')
          .test(
            'is-valid-trithemius',
            'Key must be two/three numbers or a string shorter than content',
            function (value) {
              if (!value) return false;
              const content = this.parent.content || '';

              const parts = value
                .split(',')
                .map((p) => p.trim().replace(/\s+/gi, ' '));
              if (parts.length === 2 || parts.length === 3) {
                return parts.every((p) => /^-?\d+$/.test(p));
              }

              return value.length <= content.length;
            }
          )
      });
    } else if (method === 'boo') {
      schema = schema.shape({
        key: yup.string().required('Poem is required'),
        rows: yup
          .number()
          .optional()
          .min(1, 'Matrix should have at least one row'),
        cols: yup
          .number()
          .optional()
          .min(1, 'Matrix should have at least one column'),
        filler: yup
          .string()
          .optional()
          .default(' ')
          .min(0)
          .max(1, 'Filler symbol must be a singular character')
      });
    } else if (method === 'gam') {
      schema = schema.shape({
        key: yup.string().required('Key is required')
      });
    }

    return schema;
  });

  const handleSubmit: SubmissionHandler = async (values) => {
    try {
      if (values.operation === 'key') {
        const key: any = await cryptStore.keygen(values);
        alert(
          `Your public key is ${key.publicKey}\nYour private key is ${key.privateKey}`
        );
      } else {
        const newContent = await cryptStore.encryptFile(values);
        file.content = newContent;
      }
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  const handleSave = async () => {
    await fileStore.updateFile(file.id, {
      name: file.name,
      content: file.content
    });

    router.push({ name: 'file-list' });
  };

  return {
    method,
    file,
    validationSchema,
    handleSubmit,
    handleSave
  };
};
