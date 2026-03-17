"use server";

import { type FormActionState } from "./types/FormActionState";
import { MailtrapClient } from "mailtrap";

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
    const mailClient = new MailtrapClient({
      token: process.env.MAILTRAP_API_KEY as string,
      bulk: false,
      sandbox: false,
    });

    await mailClient.send({
      from: {
        email: values.email,
        name: values.name,
      },
      to: [
        {
          email: "contact@taylorkelley.dev",
          name: "Taylor Kelley",
        },
      ],
      subject: "Contacting from taylorkelley.dev",
      text: values.description,
    });

    return {
      success: true,
      values: {
        name: "",
        email: "",
        description: "",
      },
    };
  } catch (error) {
    return {
      success: false,
      values,
      error: (error as Error).message,
    };
  }
}
