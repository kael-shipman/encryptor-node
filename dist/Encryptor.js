"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
exports.encrypt = (secret, data) => {
    try {
        const salt = crypto_1.default.randomBytes(256).toString('hex');
        const payload = {
            data,
            salt,
        };
        const cipher = crypto_1.default.createCipher(ALGORITHM, secret);
        const encrypted = Buffer.concat([
            cipher.update(new Buffer(JSON.stringify(payload), 'utf8')),
            cipher.final(),
        ]).toString('hex');
        return encrypted;
    }
    catch (error) {
        throw Error('Unable to encrypt message');
    }
};
exports.decrypt = (secret, data) => {
    try {
        const decipher = crypto_1.default.createDecipher(ALGORITHM, secret);
        const decrypted = Buffer.concat([decipher.update(new Buffer(data, 'hex')), decipher.final()]);
        const payload = JSON.parse(decrypted.toString());
        return payload.data;
    }
    catch (error) {
        throw Error('Unable to decrypt message');
    }
};
//# sourceMappingURL=Encryptor.js.map