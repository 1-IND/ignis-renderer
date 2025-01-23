// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang='en'>
				<head>
					<meta charset='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					{/* <link rel='icon' href='/favicon.ico' /> */}
					<style>
						{`
							@font-face {
								font-family: 'SourceHanSansCN';
								src: url('/assets/fonts/SourceHanSansCN-Bold.otf');
								font-weight: bold;
							}
							@font-face {
								font-family: 'Segoe UI Emoji';
								src: url('/assets/fonts/seguiemj.ttf');
							}
							@font-face {
								font-family: 'Torus';
								src: url('/assets/fonts/Torus-Regular.otf');
							}
							@font-face {
								font-family: 'Torus';
								src: url('/assets/fonts/Torus-SemiBold.otf');
								font-weight: semibold;
							}
						`}
					</style>
					{assets}
				</head>
				<body>
					<div id='app'>{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
