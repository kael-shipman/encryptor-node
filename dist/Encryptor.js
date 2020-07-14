"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
function encrypt(secret, data, opts) {
    // Prepare options
    const options = Object.assign({ algorithm: ALGORITHM, saltLength: 256, stringify: true }, (opts || {}));
    try {
        const salt = options.salt || crypto_1.default.randomBytes(options.saltLength).toString('hex');
        const payload = {
            data,
            salt,
        };
        const cipher = crypto_1.default.createCipher(options.algorithm, secret);
        const encrypted = Buffer.concat([
            cipher.update(new Buffer(JSON.stringify(payload), 'utf8')),
            cipher.final(),
        ]);
        return options.stringify !== false ? encrypted.toString('hex') : encrypted;
    }
    catch (error) {
        throw Error(`Unable to encrypt message: ${error.message}`);
    }
}
exports.encrypt = encrypt;
exports.decrypt = (secret, data, opts) => {
    const options = Object.assign({ algorithm: ALGORITHM }, (opts || {}));
    try {
        const decipher = crypto_1.default.createDecipher(options.algorithm, secret);
        const decrypted = Buffer.concat([
            decipher.update(Buffer.isBuffer(data) ? data : new Buffer(data, 'hex')),
            decipher.final(),
        ]);
        const payload = JSON.parse(decrypted.toString());
        return payload.data;
    }
    catch (error) {
        throw Error(`Unable to decrypt message: ${error.message}`);
    }
};
//# sourceMappingURL=Encryptor.js.map