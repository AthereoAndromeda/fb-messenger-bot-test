import { Postback, ReplyMessageObject } from "src/schema/webhook";
import { callSendAPI } from "./callSendAPI";

/**
 * Handles messaging_postbacks events
 * @param sender_psid
 * @param received_postback
 */
export function handlePostback(
    sender_psid: string,
    received_postback: Postback
): void {
    let response: ReplyMessageObject;

    // Get the payload for the postback
    const payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === "yes") {
        response = {
            recipient: {
                id: sender_psid,
            },

            message: { text: "Thanks!" },
        };
    } else if (payload === "no") {
        response = {
            recipient: {
                id: sender_psid,
            },
            message: { text: "Oops, try sending another image." },
        };
    } else {
        response = {
            recipient: {
                id: sender_psid,
            },
            message: { text: "Something went Wrong!" },
        };
    }

    // Send the message to acknowledge the postback
    callSendAPI(response);
}
