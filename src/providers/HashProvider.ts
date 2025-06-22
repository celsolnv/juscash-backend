// eslint-disable-next-line max-classes-per-file
import { compareSync, hashSync } from 'bcryptjs';
import { EnvSettings } from '../configs/Env';

abstract class HashProvider {
  public abstract generateHash(payload: string): string;
  public abstract compareHash(payload: string, hashed: string): boolean;
}

const { HASH_SALT } = EnvSettings;

class BcryptHashProvider extends HashProvider {
  public generateHash(payload: string): string {
    return hashSync(payload, +HASH_SALT);
  }

  public compareHash(payload: string, hashed: string): boolean {
    return compareSync(payload, hashed);
  }
}

export { HashProvider, BcryptHashProvider };
