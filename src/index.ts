import fastify from "fastify";
import { buildServer } from "./server";

const app = fastify({
    logger: {
        prettyPrint: true,
    },
});

(async () => {
    const server = await buildServer(app);
    server.listen(8080, "0.0.0.0");
})();
