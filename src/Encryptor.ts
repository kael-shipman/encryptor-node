import crypto from 'crypto';

interface IPayload {
  data: any;
  salt: string;
}

const ALGORITHM = 'aes-256-cbc';

export function encrypt(
  secret: string,
  data: unknown,
  opts: {
    algorithm?: string;
    salt?: string;
    saltLength?: number;
    stringify: false;
  },
): Buffer;
export function encrypt(
  secret: string,
  data: unknown,
  opts?: {
    algorithm?: string;
    salt?: string;
    saltLength?: number;
    stringify?: true;
  },
): string;
export function encrypt(
  secret: string,
  data: unknown,
  opts?: {
    /**
     * Optional - define the algorithm used for encryption
     * @default aes-256-cbc
     */
    algorithm?: string;

    /**
     * Optional - pass your own salt
     */
    salt?: string;

    /**
     * Optional - specify how long the generated salt string should be
     */
    saltLength?: number;

    /**
     * Optional - return encrypted data as a hex string, rather than a buffer. Defaults to true.
     */
    stringify?: boolean;
  },
): string | Buffer {
  // Prepare options
  const options = {
    algorithm: ALGORITHM,
    saltLength: 256,
    stringify: true,
    ...(opts || {}),
  };

  try {
    const salt = options.salt || crypto.randomBytes(options.saltLength).toString('hex');
    const payload: IPayload = {
      data,
      salt,
    };
    const cipher = crypto.createCipher(options.algorithm, secret);
    const encrypted = Buffer.concat(
      [
        cipher.update(new Buffer(JSON.stringify(payload), 'utf8')),
        cipher.final(),
      ],
    );
    return options.stringify !== false ? encrypted.toString('hex') : encrypted;
  } catch (error) {
    throw Error(`Unable to encrypt message: ${error.message}`);
  }
}

export const decrypt = <T = unknown>(
  secret: string,
  data: string | Buffer,
  opts?: { algorithm?: string; },
): T => {
  const options = {
    algorithm: ALGORITHM,
    ...(opts || {}),
  };

  try {
    const decipher = crypto.createDecipher(options.algorithm, secret);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.isBuffer(data) ? data : new Buffer(data, 'hex')),
      decipher.final(),
    ]);
    const payload: IPayload = JSON.parse(decrypted.toString());
    return payload.data;
  } catch (error) {
    throw Error(`Unable to decrypt message: ${error.message}`);
  }
};
