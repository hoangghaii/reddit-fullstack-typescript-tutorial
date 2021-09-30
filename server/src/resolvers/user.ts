import argon2 from 'argon2';
import { RegisterInput, UserMutationResponse, LoginInput } from '../types';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities';
import { validateRegisterInput } from '../utils';
import { Context } from 'apollo-server-core';

@Resolver()
export class UserResolver {
  //register
  @Mutation((_returns) => UserMutationResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
  ): Promise<UserMutationResponse> {
    const validateRegisterInputErrors = validateRegisterInput(registerInput);
    if (validateRegisterInputErrors !== null)
      return {
        code: 400,
        success: false,
        ...validateRegisterInputErrors,
      };

    try {
      const { username, email, password } = registerInput;

      const existingUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (existingUser)
        return {
          code: 400,
          success: false,
          message: 'Duplicate username or email',
          errors: [
            {
              field: existingUser.username === username ? 'username' : 'email',
              message: `${
                existingUser.username === username ? 'Username' : 'Email'
              } already taken`,
            },
          ],
        };

      const hashedPassword = await argon2.hash(password);

      const newUser = User.create({
        username,
        password: hashedPassword,
        email,
      });

      return {
        code: 200,
        success: true,
        message: 'User registration successfull',
        user: await User.save(newUser),
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //login
  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { req }: Context,
  ): Promise<UserMutationResponse> {
    try {
      const { usernameOrEmail, password } = loginInput;

      const existingUser = await User.findOne(
        usernameOrEmail.includes('@')
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail },
      );
      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: 'User not found',
          errors: [
            {
              field: 'usernameOrEmail',
              message: 'Username or email incorrect',
            },
          ],
        };

      const passwordVaild = await argon2.verify(
        existingUser.password,
        password,
      );
      if (!passwordVaild)
        return {
          code: 400,
          success: false,
          message: 'Wrong password',
          errors: [
            {
              field: 'password',
              message: 'Password incorrect',
            },
          ],
        };

      //session: userId = existingUser.id

      return {
        code: 200,
        success: true,
        message: 'Login successfully',
        user: existingUser,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }
}
