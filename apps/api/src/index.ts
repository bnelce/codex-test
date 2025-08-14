import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import pino from 'pino';
import omsRoutes from './routes/oms.js';
import { prismaPlugin } from './plugins/prisma.js';

const app = Fastify({ logger: pino({ level: 'info' }) });
await app.register(cors, { origin: true });
await app.register(helmet, { contentSecurityPolicy: false });
await app.register(rateLimit, { max: 200, timeWindow: '1 minute' });
await app.register(prismaPlugin);

await app.register(omsRoutes, { prefix: '/oms' });

app.get('/health', async () => ({ ok: true }));

const port = Number(process.env.PORT || 3333);
app.listen({ port, host: '0.0.0.0' }).then(() => {
  app.log.info(`API listening on :${port}`);
});
