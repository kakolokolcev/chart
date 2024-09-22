import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-unresolved
import '@/app/styles/index.scss';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
