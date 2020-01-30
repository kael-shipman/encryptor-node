# Encryptor

[![Build Status](http://cloud.drone.io/api/badges/cavillo/encryptor-node/status.svg)](http://cloud.drone.io/cavillo/encryptor-node)

Library for encrypt and decrypt messages using a secret key.

## Installation

```sh
npm install --save encryptor-node
```

## Encrypting and decrypting a message or object

```ts
import Encryptor from 'encryptor-node';

const secret = 's3cr3t!';
const obj = {
  message: 'This is an very important message',
};
const encryptor = new Encryptor();

// Encrypting
const encrypted = safe.encrypt(secret, obj);

// Decrypting
const result = safe.decrypt(secret, encrypted);
```
