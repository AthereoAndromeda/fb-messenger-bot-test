declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            NODE_ENV?: "development" | "production";
            VERIFY_TOKEN?: string;
        }
    }
}

export {};
