<template>
  <Form @submit="handleSubmit as any" :validation-schema="fileSchema">
    <Field name="name" v-slot="{ field, errors, errorMessage }">
      <input v-bind="field" type="text" placeholder="Enter filename:" />
      <div class="error" v-if="errors.length">{{ errorMessage }}</div>
    </Field>

    <Field name="content" v-slot="{ field, errors, errorMessage }">
      <textarea rows="10" v-bind="field" placeholder="Enter file content:" />
      <div class="error" v-if="errors.length">{{ errorMessage }}</div>
    </Field>

    <button type="submit">Create file</button>
  </Form>
</template>

<script setup lang="ts">
import { fileSchema, useAddFile } from '../composables/useAddFile';
import { Form, Field } from 'vee-validate';

const { handleSubmit } = useAddFile();
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: Arial, sans-serif;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  outline: none;
}

.error {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-left: 1rem;
  margin-top: -1rem;
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type='submit']:hover {
  background-color: #357ab8;
}

button[type='submit']:active {
  background-color: #2c5d90;
}
</style>
