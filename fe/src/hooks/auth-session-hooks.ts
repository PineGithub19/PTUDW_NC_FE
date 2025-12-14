import supabase from "@/query/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const SignUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const SignIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const SignOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      SignUp(email, password),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      SignIn(email, password),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => SignOut(),
  });
};
