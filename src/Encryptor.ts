import crypto from 'crypto';

interface IPayload {
  data: any;
  salt: string;
}

const ALGORITHM = 'aes-256-cbc';

export default class Encryptor {

  constructor() {}

  encrypt(secret: string, data: any): string {
    try {
      const salt = crypto.randomBytes(256).toString('hex');
      const payload: IPayload = {
        data,
        salt,
      };
      const cipher = crypto.createCipher(ALGORITHM, secret);
      const encrypted = Buffer.concat(
        [
          cipher.update(new Buffer(JSON.stringify(payload), 'utf8')),
          cipher.final(),
        ],
      ).toString('hex');
      return encrypted;
    } catch (error) {
      throw Error('Unable to encrypt message');
    }
  }

  decrypt(secret: string, data: string): any {
    try {
      const decipher = crypto.createDecipher(ALGORITHM, secret);
      const decrypted = Buffer.concat([decipher.update(new Buffer(data, 'hex')), decipher.final()]);
      const payload: IPayload = JSON.parse(decrypted.toString());
      return payload.data;
    } catch (error) {
      throw Error('Unable to decrypt message');
    }
  }
}
