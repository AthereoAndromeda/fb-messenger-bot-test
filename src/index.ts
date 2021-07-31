import fastify from "fastify";

const app = fastify({
    logger: {
        prettyPrint: true,
    },
});

app.listen(8080);
