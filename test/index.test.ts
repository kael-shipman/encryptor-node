import { expect } from 'chai';
import 'mocha';

import { encrypt, decrypt } from '../dist';

// TODO
describe('Testing Encryptions', async () => {
  const secret = 's3cr3t!';
  const obj = {
    message: 'This is an very important message',
  };

  it('Encrypting and decrypting a message using same secret key', async () => {
    // Encrypting
    const encrypted = encrypt(secret, obj);

    // Decrypting
    const result = decrypt<{ message: string; }>(secret, encrypted);

    expect(result).to.have.property('message');
    expect(obj.message).to.equal(result.message);
  });

  it('Encrypting and decrypting a message using a different secret key', async () => {
    const secret2 = 'secret!';

    // Encrypting
    const encrypted = encrypt(secret, obj);

    // Decrypting
    expect(() => {
      decrypt<{ message: string; }>(secret2, encrypted);
    }).to.throw();
  });

  it('Encrypting same message twice with same secret different encryptions', async () => {
    // Encrypting
    const encrypted = encrypt(secret, obj);

    // Encrypting
    const encrypted2 = encrypt(secret, obj);

    expect(encrypted).to.not.equal(encrypted2);
  });

  it('Should change behavior when passed different options', () => {
    expect(encrypt(secret, obj)).to.have.length.above(1000);
    expect(encrypt(secret, obj, { saltLength: 10 })).to.have.length.below(500);

    expect(encrypt(secret, obj)).not.to.equal(encrypt(secret, obj));
    expect(encrypt(secret, obj, { salt: "1234" })).to.equal(encrypt(secret, obj, { salt: "1234" }));

    expect(
      encrypt(secret, obj, { algorithm: 'aes-256-cbc', salt: "12345" })
    ).not.to.equal(
      encrypt(secret, obj, { algorithm: 'aes-128-cbc', salt: "12345" })
    );
  });
});
