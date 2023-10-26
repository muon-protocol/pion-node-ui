import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reward-server': 'https://pion-test.muon.net/',
      '/monitor/validateNewNodeData': 'https://monitor-pion.muon.net/',
      '/api/price/': 'https://pion-test.muon.net/',
      '/stats/data.json': 'https://monitor-pion.muon.net/',
    },
  },
});
