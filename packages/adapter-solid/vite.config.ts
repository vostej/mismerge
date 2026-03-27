import { defineConfig } from 'vite';
import { resolve } from 'path';
import solid from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		solid(),
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
				'solid-js',
				'solid-js/web',
				'@mismerge/core',
				'@mismerge/core/web',
				'@mismerge/core/colors'
			]
		},
		copyPublicDir: false
	}
});
