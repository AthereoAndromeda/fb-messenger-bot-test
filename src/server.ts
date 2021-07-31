import { FastifyInstance } from "fastify";

export async function buildServer(
    app: FastifyInstance
): Promise<FastifyInstance> {
    return app;
}
