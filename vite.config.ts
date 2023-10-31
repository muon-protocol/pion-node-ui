import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reward-server': 'https://app.muon.net/',
      '/monitor/validateNewNodeData': 'https://app.muon.net/',
      '/api/price/': 'https://app.muon.net/',
      '/stats/data': 'https://app.muon.net/',
    },
  },
});
