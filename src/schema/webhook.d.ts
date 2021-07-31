export interface Message {
    mid: string;
    text: string;
    attachments: Attachment[];
}

export interface Attachment {
    type: "image" | "video" | "audio" | "file";
    payload: {
        url: string;
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
