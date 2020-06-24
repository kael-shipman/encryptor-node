export declare const encrypt: (secret: string, data: unknown, opts?: {
    /**
     * Optional - define the algorithm used for encryption
     * @default aes-256-cbc
     */
    algorithm?: string | undefined;
    /**
     * Optional - pass your own salt
     */
    salt?: string | undefined;
    /**
     * Optional - specify how long the generated salt string should be
     */
    saltLength?: number | undefined;
} | undefined) => string;
export declare const decrypt: <T = unknown>(secret: string, data: string, opts?: {
    algorithm?: string | undefined;
} | undefined) => T;
