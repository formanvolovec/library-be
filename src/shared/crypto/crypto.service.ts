import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  generate(password: string): string {
    const salt = 'secret';
    const hashPassword = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    return hashPassword;
  }
}
