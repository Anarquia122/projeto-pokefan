import Fastify from "fastify";
import { OpenRouterService } from "./openrouterService";
import { request } from "http";
import cors from "@fastify/cors";

export const createServer = async (routerService: OpenRouterService) => {
    const app = Fastify({ logger: false });

    await app.register(cors, {
        origin: true
    })

    app.post('/chat', {
        schema: {
            body: {
                type: 'object',
                required: ['question'],
                properties: {
                    question: {
                        type: 'string',
                        minLength: 5
                    }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const { question } = await request.body as { question: string}
            const response = await routerService.generate(question)
            return reply.send(response)
        } catch (error) {
            console.error('error handling /chat request: ', error)
            return reply.code(500)
        }
    })

    return app;
}