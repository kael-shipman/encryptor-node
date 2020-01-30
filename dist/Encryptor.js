"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var ALGORITHM = 'aes-256-cbc';
var Encryptor = /** @class */ (function () {
    function Encryptor() {
    }
    Encryptor.prototype.encrypt = function (secret, data) {
        try {
            var salt = crypto_1.default.randomBytes(256).toString('hex');
            var payload = {
                data: data,
                salt: salt,
            };
            var cipher = crypto_1.default.createCipher(ALGORITHM, secret);
            var encrypted = Buffer.concat([
                cipher.update(new Buffer(JSON.stringify(payload), 'utf8')),
                cipher.final(),
            ]).toString('hex');
            return encrypted;
        }
        catch (error) {
            throw Error('Unable to encrypt message');
        }
    };
    Encryptor.prototype.decrypt = function (secret, data) {
        try {
            var decipher = crypto_1.default.createDecipher(ALGORITHM, secret);
            var decrypted = Buffer.concat([decipher.update(new Buffer(data, 'hex')), decipher.final()]);
            var payload = JSON.parse(decrypted.toString());
            return payload.data;
        }
        catch (error) {
            throw Error('Unable to decrypt message');
        }
    };
    return Encryptor;
}());
exports.default = Encryptor;
//# sourceMappingURL=Encryptor.js.map