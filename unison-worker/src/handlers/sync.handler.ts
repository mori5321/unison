export const SyncHandler = (request: Request) => {
	const upgradeHeader = request.headers.get('Upgrade');
	if (!upgradeHeader || upgradeHeader !== 'websocket') {
		return new Response('Expected websocket', { status: 426 });
	}

	const websocketPair = new WebSocketPair();
	const [client, server] = Object.values(websocketPair);

	server.accept();
	server.addEventListener('message', (event) => {
		console.log('Received message from client', event.data);
	});

	return new Response(null, {
		status: 101,
		webSocket: client,
	});
};
