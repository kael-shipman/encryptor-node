# Encryptor
Library for encrypt and decrypt messages using a secret key.

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
