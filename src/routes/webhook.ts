import { FastifyPluginCallback } from "fastify";
import { handleMessage, handlePostback } from "../handlers";
import { Entry } from "src/schema/webhook";

interface ReqInterface {
    Querystring: {
        ["hub.mode"]: string;
        ["hub.verify_token"]: string;
        ["hub.challenge"]: string;
    };
    // Params: {}
    // Headers: {}
    Body: {
        object: string;
        entry: Entry[];
    };
}

const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = process.env;

if (!VERIFY_TOKEN || !PAGE_ACCESS_TOKEN) {
    throw new Error("Token not Found!");
}

const route: FastifyPluginCallback = (app, opts, done) => {
    app.get<ReqInterface>("/", (req, res) => {
        const {
            "hub.mode": mode,
            "hub.verify_token": token,
            "hub.challenge": challenge,
        } = req.query;

        if (mode && token) {
            // Checks the mode and token sent is correct
            if (mode === "subscribe" && token === VERIFY_TOKEN) {
                // Responds with the challenge token from the request
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.status(403).send();
            }
        } else {
            res.status(404).send();
        }
    });

    app.post<ReqInterface>("/", (req, res) => {
        const body = req.body;

        if (body.object === "page") {
            for (const entry of body.entry) {
                const webhook_event = entry.messaging[0];

                const sender_psid = webhook_event.sender.id;

                if (webhook_event.message) {
                    handleMessage(sender_psid, webhook_event.message);
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback);
                }
            }

            res.status(200).send("EVENT_RECEIVED");
        } else {
            res.status(404).send();
        }
    });

    done();
};

export default {
    path: "/webhook",
    route,
};
