import { defineConfig, presetWebFonts, presetWind3 } from 'unocss';

export default defineConfig({
	presets: [
		presetWind3(),
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
