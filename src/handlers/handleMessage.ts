import { Attachment, Message, ReplyMessageObject } from "src/schema/webhook";
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
    if (received_message.text) {
        let response: ReplyMessageObject;

        if (received_message.text === "c!lol") {
            response = {
                recipient: {
                    id: sender_psid,
                },
                message: { text: "AMOGUS!" },
            };
        } else {
            response = {
                recipient: {
                    id: sender_psid,
                },
                message: { text: "Hemlo" },
            };
        }

        callSendAPI(response);
    } else if (received_message.attachments) {
        // Takes sent picture
        const attachment_url = received_message.attachments[0].payload.url;

        const attachment: Attachment = {
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
        };

        const response: ReplyMessageObject = {
            recipient: {
                id: sender_psid,
            },
            message: {
                attachment,
            },
        };

        callSendAPI(response);
    }
}
