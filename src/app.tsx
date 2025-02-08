import { Router } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './app.css';

declare global {
	function setContext(ctx: any): void;
	// eslint-disable-next-line vars-on-top, no-var
	var loaded: true;
}

const DebugContext = clientOnly(async () => import('./components/DebugContext'));

export default function App() {
	return (
		<Router
			root={props => (
				<Suspense>
					<DebugContext />
					{props.children}
				</Suspense>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
