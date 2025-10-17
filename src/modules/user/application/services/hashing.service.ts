import { Injectable } from '@nestjs/common';
import { HashingServicePort } from 'src/modules/user/domain/ports/in/hashing-service.port';
import * as bcrypt from 'bcrypt';
import { USER_CONSTANTS } from 'src/modules/user/const';

@Injectable()
export class HashingService implements HashingServicePort {
  readonly DEFAULT_SALT_ROUNDS: number = USER_CONSTANTS.BCRYPT_SALT_ROUNDS;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.DEFAULT_SALT_ROUNDS);

    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
