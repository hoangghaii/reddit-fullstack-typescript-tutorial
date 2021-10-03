import { AuthenticationError } from 'apollo-server-errors';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities';
import {
  Context,
  CreatePostInput,
  PostMutationResponse,
  UpdatePostInput,
} from '../types';

@Resolver()
export class PostResolver {
  //create new post
  @Mutation((_return) => PostMutationResponse)
  async createPost(
    @Arg('createPostInput') { title, text }: CreatePostInput,
  ): Promise<PostMutationResponse> {
    try {
      const newPost = Post.create({ title, text });

      await newPost.save();

      return {
        code: 200,
        success: true,
        message: 'Post created successfull',
        post: newPost,
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

  //get all posts
  @Query((_return) => [Post])
  async posts(): Promise<Post[]> {
    return await Post.find();
  }

  //get detail post
  @Query((_return) => PostMutationResponse)
  async post(
    @Arg('id', (_type) => ID) id: number,
  ): Promise<PostMutationResponse> {
    try {
      const post = await Post.findOne(id);

      if (!post)
        return {
          code: 400,
          success: false,
          message: 'Post not found',
          errors: [
            {
              field: 'id',
              message: 'id not found',
            },
          ],
        };

      return {
        code: 200,
        success: true,
        post,
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

  //update post
  @Mutation((_return) => PostMutationResponse)
  async updatePost(
    @Arg('updatePostInput') { id, title, text }: UpdatePostInput,
  ): Promise<PostMutationResponse> {
    try {
      const existingPost = await Post.findOne(id);

      if (!existingPost)
        return {
          code: 400,
          success: false,
          message: 'Post not found',
          errors: [
            {
              field: 'id',
              message: 'id not found',
            },
          ],
        };

      (existingPost.title = title), (existingPost.text = text);
      await existingPost.save();

      return {
        code: 200,
        success: true,
        post: existingPost,
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

  //delete post
  @Mutation((_return) => PostMutationResponse)
  async deletePost(
    @Arg('id', (_type) => ID) id: number,
    @Ctx() { req }: Context,
  ): Promise<PostMutationResponse> {
    try {
      console.log(req.session.userId);
      if (!req.session.userId)
        throw new AuthenticationError(
          'Not authenticated to perform GraphQL operation',
        );

      const existingPost = await Post.findOne(id);

      if (!existingPost)
        return {
          code: 400,
          success: false,
          message: 'Post not found',
          errors: [
            {
              field: 'id',
              message: 'id not found',
            },
          ],
        };

      await Post.delete(id);

      return {
        code: 200,
        success: true,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error - ${error.message}`,
      };
    }
  }
}
