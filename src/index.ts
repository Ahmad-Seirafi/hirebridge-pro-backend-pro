import { env } from './config/config.js';
import { connectDB } from './db/mongoose.js';
import app from './app.js';
import http from 'node:http';
import { initSocket } from './socket.js';

async function bootstrap() {
  await connectDB();
  const server = http.createServer(app);
  initSocket(server);
  server.listen(env.PORT, () => console.log(`🚀 HireBridge Pro API listening on http://localhost:${env.PORT}`));
}
bootstrap().catch((e) => { console.error(e); process.exit(1); });
