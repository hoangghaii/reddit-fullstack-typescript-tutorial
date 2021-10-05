import { FieldError } from 'generated/graphql';

export const mapFieldError = (errors: FieldError[]) => {
  return errors.reduce(
    (accumulatedErrorObj, error) => ({
      ...accumulatedErrorObj,
      [error.field]: error.message,
    }),
    {},
  );
};
