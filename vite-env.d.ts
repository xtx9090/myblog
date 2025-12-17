/// <reference types="vite/client" />

declare module '@vitejs/plugin-vue' {
  import type { Plugin } from 'vite'
  const plugin: () => Plugin
  export default plugin
}