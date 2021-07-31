import { Attachment, Message } from "src/schema/webhook";
import { callSendAPI } from "./callSendAPI";

/**
 * Handles messages events
 * @param sender_psid
 * @param received_message
 */
export function handleMessage(
    sender_psid: string,
    received_message: Message
): void {
    let response;

    if (received_message.text) {
        if (received_message.text === "c!lol") {
            response = {
                text: "AMOGUS!",
            };
        } else {
            response = {
                text: "Hemlo",
            };
        }
    } else if (received_message.attachments) {
        const attachment_url = received_message.attachments[0].payload.url;

        response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: "Is this the right picture?",
                            subtitle: "Tap a button to answer.",
                            image_url: attachment_url,
                            buttons: [
                                {
                                    type: "postback",
                                    title: "Yes!",
                                    payload: "yes",
                                },
                                {
                                    type: "postback",
                                    title: "No!",
                                    payload: "no",
                                },
                            ],
                        },
                    ],
                },
            } as Attachment,
        };
    }

    callSendAPI(sender_psid, response);
}
