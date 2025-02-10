import { createPinia } from 'pinia';

export * from './auth'
export * from './user'
export * from './menu'
export * from './system'
export * from  './department'

const pinia = createPinia();

export default pinia;
