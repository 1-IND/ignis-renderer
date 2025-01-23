import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: 'none',
			fonts: {
				text: ['SourceHanSansCN', 'Segoe UI Emoji'],
				digit: ['Torus', 'Segoe UI Emoji'],
			},
		}),
	],
	shortcuts: [
		['bg', 'bg-cover w-full h-full left-0 absolute z--100'],
	],
});
