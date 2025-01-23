import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor() {}

  async generateKey(): Promise<string> {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt'],
    );

    const jwk = await crypto.subtle.exportKey('jwk', key);

    return jwk.k;
  }
}
