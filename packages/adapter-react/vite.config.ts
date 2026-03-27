import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ['src/lib/**/*']
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			formats: ['es']
		},
		rollupOptions: {
			output: {
				entryFileNames: 'index.js'
			},
			external: [
				'react',
				'react-dom',
				'react/jsx-runtime',
				'@vostej/core',
				'@vostej/core/web',
				'@vostej/core/colors'
			]
		},
		copyPublicDir: false
	}
});
