import { Context } from '../types';
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-errors';

export const checkAuth: MiddlewareFn<Context> = (
  { context: { req } },
  next,
) => {
  if (!req.session.userId)
    throw new AuthenticationError(
      'Not authenticated to perform GraphQL operation',
    );
  return next();
};
