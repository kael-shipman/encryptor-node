# Encryptor

[![Build Status](http://cloud.drone.io/api/badges/cavillo/encryptor-node/status.svg)](http://cloud.drone.io/cavillo/encryptor-node)

Library for encrypt and decrypt messages using a secret key.

## Installation

```sh
npm install --save encryptor-node
```

## Import methods

```ts
// As a hole
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
