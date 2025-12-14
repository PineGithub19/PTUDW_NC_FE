import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignIn } from "@/hooks/auth-session-hooks";
import { toastSuccess } from "@/components/custom-ui/toast";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type SignInFormData = z.infer<typeof signInSchema>;

function SignInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate } = useSignIn();

  const onSubmit = async (data: SignInFormData) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toastSuccess("Sign-in successful!");
          reset();
          navigate("/demo/courses");
        },
        onError: (error) => {
          console.error("Sign-in error:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <p className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign In Form
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-red-400">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-red-400">{errors.password?.message}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <Link to={"/demo/auth/register"}>Sign Up</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
