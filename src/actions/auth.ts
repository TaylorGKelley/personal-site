'use server';

import { type FetchAction } from "./types";
import { authClient } from "@/lib/auth/client";
import { type User } from "better-auth";

export const getUser: FetchAction<User> = async () => {
  try {
    const { data } = await authClient.getSession();

    if (!data) throw new Error('No session found')

    return { data: data.user }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
