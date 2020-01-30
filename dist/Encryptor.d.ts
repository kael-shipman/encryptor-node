export default class Encryptor {
    constructor();
    encrypt(secret: string, data: any): string;
    decrypt(secret: string, data: string): any;
}
