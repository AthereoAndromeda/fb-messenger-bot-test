import { buildServer } from "../src/server";
import fastify from "fastify";

const app = fastify();

describe("Test Endpoints", () => {
    beforeAll(async () => {
        await buildServer(app);
    });

    afterAll(async () => {
        app.close();
    });

    describe("GET", () => {
        it("/", async () => {
            const res = await app.inject({
                url: "/",
                method: "GET",
            });

            expect(res.body).toBe("test");
            return;
        });
    });
});
