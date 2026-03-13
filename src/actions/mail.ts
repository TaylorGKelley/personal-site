"use server";

import { type FormActionState } from "./types/FormActionState";

export type ContactForm = {
  email: string;
  name: string;
  description: string;
};

export async function sendContactEmail(
  initialState: FormActionState<ContactForm>,
  formData: FormData,
): Promise<FormActionState<ContactForm>> {
  const values = Object.fromEntries(formData.entries()) as ContactForm;
  try {
    return initialState;
  } catch (error) {
    return {
      values,
      error: (error as Error).message,
    };
  }
}
