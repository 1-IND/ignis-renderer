export default function DebugContext() {
	const location = globalThis.location;
	if (location.search.length < 2) return;

	const key = location.pathname + location.search;
	const ctx = localStorage.getItem(key);
	if (ctx != null) {
		console.log('load context with key:', key);
		setContext(JSON.parse(ctx));
	} else {
		console.warn('no context with key:', key);
	}

	return <></>;
};
