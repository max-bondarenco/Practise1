<template>
  <Form @submit="handleSubmit" :validation-schema="validationSchema">
    <Field v-show="false" v-model="method" name="method"></Field>

    <Field name="operation" v-slot="{ field, errorMessage, errors }">
      <select v-bind="field">
        <option hidden value="">Select operation type</option>
        <option value="enc">Encrypt</option>
        <option value="dec">Decrypt</option>
      </select>
      <div class="error" v-if="errors.length">{{ errorMessage }}</div>
    </Field>

    <Field
      v-model="file.content"
      name="content"
      v-slot="{ field, errorMessage, errors }">
      <textarea rows="10" v-bind="field" placeholder="Enter file content:" />
      <div class="error" v-if="errors.length">{{ errorMessage }}</div>
    </Field>

    <template v-if="method === 'csr'">
      <Field name="key" v-slot="{ field, errorMessage, errors }">
        <input type="number" v-bind="field" placeholder="Enter key:" />
        <div class="error" v-if="errors.length">{{ errorMessage }}</div>
      </Field>
    </template>

    <div class="buttons">
      <button type="submit">Proceed</button>
      <button @click="handleSave" type="button">Save file</button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useEncrypt } from '../../composables/useEncrypt';
import { Form, Field } from 'vee-validate';

const { file, method, validationSchema, handleSubmit, handleSave } =
  useEncrypt();
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

.buttons {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

button {
  width: 100%;
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

button:hover {
  background-color: #357ab8;
}

button:active {
  background-color: #2c5d90;
}

select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s;
}

select:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

option {
  padding: 0.5rem;
}
</style>
