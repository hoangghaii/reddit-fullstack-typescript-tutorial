import { Field, ObjectType } from 'type-graphql';
import { FieldError, IMutationResponse } from '.';
import { User } from '../entities';

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;
  errors?: FieldError[] | undefined;

  @Field({ nullable: true })
  user?: User;
}
