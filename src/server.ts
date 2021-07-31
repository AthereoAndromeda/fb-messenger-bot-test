import { FastifyInstance } from "fastify";
import webhook from "./routes/webhook";

async function registerRoutes(app: FastifyInstance) {
    app.get("/", (req, res) => {
        res.status(200).send("test");
    });

    app.register(webhook.route, {
        prefix: webhook.path,
    });
}

export async function buildServer(
    app: FastifyInstance
): Promise<FastifyInstance> {
    await registerRoutes(app);

    return app;
}
