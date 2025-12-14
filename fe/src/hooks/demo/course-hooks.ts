import supabase from "@/query/supabaseClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const response = await supabase.from("instructors").select("*");
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
};

export const useFetchLevels = () => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const response = await supabase.from("levels").select("*");
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: ["createCourse"],
    mutationFn: async (payload: unknown) => {
      const response = await supabase.from("courses").insert(payload).single();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
};

export const useFetchCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await supabase.from("courses").select("*");
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
};
