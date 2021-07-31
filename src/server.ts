import { FastifyInstance } from "fastify";

function registerRoutes(app: FastifyInstance) {
    app.get("/", (req, res) => {
        res.status(200).send("test");
    });
}

export async function buildServer(
    app: FastifyInstance
): Promise<FastifyInstance> {
    registerRoutes(app);

    return app;
}
