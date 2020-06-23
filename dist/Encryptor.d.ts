export declare const encrypt: (secret: string, data: any) => string;
export declare const decrypt: <T = unknown>(secret: string, data: string) => T;
