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
export async function callSendAPI(
    response?: ReplyMessageObject
): Promise<void> {
    try {
        const link = "https://graph.facebook.com/v11.0/me/messages";

        await axios.post(link, response, {
            params: {
                access_token: PAGE_ACCESS_TOKEN,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
