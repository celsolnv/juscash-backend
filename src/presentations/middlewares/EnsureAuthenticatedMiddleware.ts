import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JWTProvider } from '../../providers/TokenProvider';
import { HttpStatus } from '../../utils/exceptions/HttpException';
import { UserTypeormRepository } from '../../modules/users/repositories/typeorm/UserTypeormRepository';
import { send } from '../../libs/return';
import { StatusEnum } from '../../entities/User';

const EnsureAuthenticatedMiddleware = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userRepository = new UserTypeormRepository();
      const tokenProvider = new JWTProvider();

      let authorization: string | null = null;

      if (request.headers.authorization) {
        authorization = request.headers.authorization;
      } else if (request.query.token) {
        authorization = `Bearer ${String(request.query.token)}`;
      }

      if (!authorization) {
        return send(response, {
          success: false,
          message: 'Token não fornecido',
          status: HttpStatus.UNAUTHORIZED
        });
      }

      const [, token] = authorization.split(' ');

      if (!token) {
        return send(response, {
          success: false,
          message: 'Token não fornecido',
          status: HttpStatus.UNAUTHORIZED
        });
      }

      const payload = tokenProvider.verifyToken(token) as JwtPayload;

      const id = payload.sub?.toString() as string;

      const userExist = await userRepository.findByIdComplete(id);

      if (!userExist) {
        return send(response, {
          success: false,
          message: 'Usuário não encontrado',
          status: HttpStatus.UNAUTHORIZED
        });
      }

      if (userExist.status === StatusEnum.inactive) {
        return send(response, {
          success: false,
          message: 'Usuário inativo',
          status: HttpStatus.UNAUTHORIZED
        });
      }

      request.user = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
      };

      return next();
    } catch (error) {
      console.error('Erro no middleware de autenticação:', error);
      return send(response, {
        success: false,
        message: 'Token inválido',
        status: HttpStatus.UNAUTHORIZED
      });
    }
  };
};

export { EnsureAuthenticatedMiddleware };
