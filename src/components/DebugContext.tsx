export default function DebugContext() { // Provide help for debugging & headless browser rendering
	const location = globalThis.location;
	if (location.search.length >= 2) {
		const key = location.pathname + location.search;
		const ctx = localStorage.getItem(key);
		if (ctx != null) {
			console.log('load context with key:', key);
			setContext(JSON.parse(ctx));
		} else {
			console.warn('no context with key:', key);
		}
	}

	// Used by headless browser rendering logic
	// ref: https://docs.solidjs.com/solid-start/reference/client/client-only
	// > ... but will only render *after hydration* and will never load on the server.
	globalThis.window.loaded = true;

	return <></>;
};
