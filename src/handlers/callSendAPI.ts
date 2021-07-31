import axios from "axios";
import { ReplyMessageObject } from "src/schema/webhook";

const { PAGE_ACCESS_TOKEN } = process.env;

if (!PAGE_ACCESS_TOKEN) {
    throw new Error("Token not Found!");
}

/**
 * Sends response messages via the Send API
 * @param sender_psid
 * @param response
 */
export function callSendAPI(
    sender_psid: string,
    response?: ReplyMessageObject["message"]
): void {
    // Construct the message body
    const request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    };

    axios
        .post("https://graph.facebook.com/v11.0/me/messages", request_body, {
            params: {
                access_token: PAGE_ACCESS_TOKEN,
            },
        })
        .then(res => {
            console.log("sent");
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
            console.log("oofed");
        });
}
