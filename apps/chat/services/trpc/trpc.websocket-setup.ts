import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from 'ws';

export function startWebSocketServer(router:any) {

  const wss = new WebSocketServer({ port: 3003 });

  const trpcWSHandler = applyWSSHandler({
    wss,
    router,
    createContext: async () => {
      return {}; // Return an empty context or whatever context you need
    }
  } as any);

  wss.on('connection', (ws) => {
    console.log(`➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`➖ Connection (${wss.clients.size})`);
    });
  });

  console.log('✅ WebSocket Server listening on ws://localhost:3003');

  process.on('SIGTERM', () => {
    console.log('SIGTERM');
    trpcWSHandler.broadcastReconnectNotification();
    wss.close();
  });
}
