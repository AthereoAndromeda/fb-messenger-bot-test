interface QuickReply {
    content_type: "text" | "user_phone_number" | "user_email";
    title: string;
    payload: string | number;
}

export interface ReplyMessageObject {
    messaging_type?: "RESPONSE" | "UPDATE" | "MESSAGE_TAG";
    recipient: {
        id: string;
    };
    message: {
        text?: string;
        attachment?: Attachment;
        quick_replies?: QuickReply;
    };
}

/**
 * Message to be sent. Either `text` or `attachments` is required.
 */
export interface Message {
    mid?: string;
    text?: string;
    attachments?: Attachment[];
    quick_replies?: QuickReply[];
    metadata?: string;
}

export interface Attachment {
    type: "image" | "video" | "audio" | "file" | "template";
    payload: {
        url?: string;
        template_type?: "generic" | "button" | "media" | "receipt";
        [element: string]: unknown;
    };
}

export interface Postback {
    mid: string;
    title: string;
    payload: string;
    referral: {
        ref: string;
        source: string;
        type: string;
    };
}

export interface Entry {
    id: string;
    time: number;
    messaging: {
        sender: {
            id: string;
        };
        recipient: {
            id: string;
        };
        timestamp: number;
        message: Message;
        postback: Postback;
    }[];
}
