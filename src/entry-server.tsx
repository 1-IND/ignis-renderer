// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang='en'>
				<head>
					<meta charset='utf-8' />
					<link rel='preconnect' href='fonts/SourceHanSansCN-Bold.otf' />
					<link rel='preconnect' href='fonts/seguiemj.ttf' />
					<link rel='preconnect' href='fonts/Torus-Regular.ttf' />
					<link rel='preconnect' href='fonts/Torus-SemiBold.ttf' />

					<meta name='viewport' content='width=device-width, initial-scale=1' />
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
