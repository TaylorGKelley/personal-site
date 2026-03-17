export type FormActionState<T> =
  | { success: true; values: T }
  | {
      success: false;
      values: T;
      error: string;
    };
