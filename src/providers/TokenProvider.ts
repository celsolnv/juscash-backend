// eslint-disable-next-line max-classes-per-file
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { EnvSettings } from '../configs/Env';

abstract class TokenProvider {
  public abstract generateToken(
    subject: string,
    expiresIn: number,
    payload?: object
  ): {
    token: string;
    expiresIn: number;
  };
  public abstract verifyToken(token: string): string | object;
}

class JWTProvider extends TokenProvider {
  public generateToken(
    subject: string,
    expiresIn = 86400,
    payload = {}
  ): { token: string; expiresIn: number } {
    const token = sign(payload, EnvSettings.JWT_HASH, {
      expiresIn,
      subject
    });

    return {
      token,
      expiresIn
    };
  }

  public verifyToken(token: string): JwtPayload | string {
    return verify(token, EnvSettings.JWT_HASH);
  }
}

export { TokenProvider, JWTProvider };
