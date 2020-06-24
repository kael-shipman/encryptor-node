# Encryptor

[![Build Status](http://cloud.drone.io/api/badges/cavillo/encryptor-node/status.svg)](http://cloud.drone.io/cavillo/encryptor-node)

Library for encrypt and decrypt messages using a secret key.

## Installation

```sh
npm install --save encryptor-node
```

## Import methods

```ts
// As a whole
import * as Encryptor from 'encryptor-node';

// Each method
import { encrypt, decrypt } from 'encryptor-node';
```


## Encrypting and decrypting a message or object

```ts
import { encrypt, decrypt } from 'encryptor-node';

const secret = 's3cr3t!';
const payload = { message: 'This is an very important message' };

// Encrypting
const encrypted = encrypt(secret, payload);
console.log(encrypted); // e20f64009fe0daa88......

// Decrypting
const result = decrypt(secret, encrypted);
console.log(result); // { message: 'This is an very important message' }
```

## Extra Options

The `encrypt` function takes an additional optional `options` hash consisting of the following:

```ts
{
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
}
```

This is provided to allow the developer somewhat more control over the internals of the library.
The `decrypt` function takes an options hash with just the `algorithm` key.

The algorithm must be compatible with the built-in node crypto library.

