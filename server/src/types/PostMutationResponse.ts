import { Field, ObjectType } from 'type-graphql';
import { FieldError, IMutationResponse } from '.';
import { Post } from '../entities';

@ObjectType({ implements: IMutationResponse })
export class PostMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;
  errors?: FieldError[] | undefined;

  @Field({ nullable: true })
  post?: Post;
}
