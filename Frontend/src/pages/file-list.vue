<template>
  <table class="file-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Short Content</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>Encrypt</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.id">
        <td>{{ file.name }}</td>
        <td>
          {{
            file.content?.length > 30
              ? `${file.content.slice(0, 30)}...`
              : file.content
          }}
        </td>
        <td>
          <span class="edit-btn">
            <router-link :to="{ name: 'edit-file', params: { id: file.id } }">
              Edit
            </router-link>
          </span>
        </td>
        <td>
          <span @click="handleDeleteFile(file.id)" class="delete-btn">
            Delete
          </span>
        </td>
        <td>
          <span @click="handleOpenModal(file)" class="encrypt-btn"
            >Encrypt</span
          >
        </td>
        <td>
          <span
            class="encrypt-btn"
            title="Download"
            @click="handleDownloadFile(file)">
            Download
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <Modal
    v-if="!!currentFile.value"
    :file="currentFile.value"
    :can-proceed="!!method"
    @close="handleCloseModal()"
    @proceed="handleProceed()">
    <h3>Encrypt File: {{ currentFile.value.name }}</h3>
    <label for="encryption">Choose encryption method:</label>
    <select id="encryption" v-model="method">
      <option v-for="method in methods" :key="method.val" :value="method.val">
        {{ method.name }}
      </option>
    </select>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '../components/modal.vue';
import { useEncryptionModal } from '../composables/useEncryptionModal';
import { useFileList } from '../composables/useFileList';

const { files, handleDeleteFile, handleDownloadFile } = useFileList();
const {
  currentFile,
  handleCloseModal,
  handleOpenModal,
  handleProceed,
  method,
  methods
} = useEncryptionModal();
</script>

<style scoped>
.file-table {
  margin: auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.file-table th,
.file-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.file-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.file-table tr:hover {
  background-color: #f0f8ff;
}

.edit-btn,
.delete-btn,
.encrypt-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #4a90e2;

  * {
    color: #fff;
    text-decoration: none;
  }
}

.edit-btn:hover {
  background-color: #357ab8;
}

.delete-btn {
  background-color: #e74c3c;
  color: #fff;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.encrypt-btn {
  background-color: #1abc9c;
  color: #fff;
}

.encrypt-btn:hover {
  background-color: #16a085;
}

h3 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
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

:deep(.modal-body) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
