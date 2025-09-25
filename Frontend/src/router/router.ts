import { createWebHistory, createRouter } from 'vue-router';
import AddFile from '../pages/add-file.vue';
import EditFile from '../pages/edit-file.vue';
import Info from '../pages/info.vue';
import FileList from '../pages/file-list.vue';
import { preloadFile } from '../store/file.store';
import Encrypt from '../pages/encrypt/encrypt.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'info',
      component: Info,
      path: '/'
    },
    {
      name: 'add-file',
      component: AddFile,
      path: '/add'
    },
    {
      name: 'edit-file',
      component: EditFile,
      path: '/edit/:id',
      beforeEnter: preloadFile
    },
    {
      name: 'file-list',
      component: FileList,
      path: '/files'
    },
    {
      name: 'encrypt',
      component: Encrypt,
      path: '/encrypt/:method/:id',
      beforeEnter: preloadFile
    }
  ]
});
