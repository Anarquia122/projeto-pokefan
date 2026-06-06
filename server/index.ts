import 'dotenv/config';

import { config } from "./config";
import { OpenRouterService } from "./openrouterService";
import { createServer } from "./server";

async function start() {
    const routerService = new OpenRouterService(config);

    const app = await createServer(routerService);

    await app.listen({ port: 3000 });

    console.log('Server running on http://localhost:3000');
}

start();