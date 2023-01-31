import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "definitions";
import { Button, FormLabel, TextInput } from "components";

export default function Signup() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { fullname: "", email: "", password: "" },
    resolver: yupResolver(RegisterSchema),
  });

  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center text-gray-600">Create an Account</h1>
      <p className="text-center text-sm text-gray-400 mt-2 mb-7">
        Welcome Back! Please enter your credentials
      </p>

      <form>
        <article className="mb-5">
          <FormLabel htmlFor="email">Fullname</FormLabel>
          <TextInput
            register={register}
            id="fullname"
            name="fullname"
            placeholder="Enter your fullname"
            error={errors?.fullname?.message}
          />
        </article>
        <article className="mb-5">
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextInput
            register={register}
            id="email"
            name="email"
            placeholder="Enter your email"
            error={errors?.email?.message}
          />
        </article>
        <article className="mb-5">
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextInput
            register={register}
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            error={errors?.password?.message}
          />
        </article>

        <Button className="w-full py-2.5 rounded-lg" borderRadius="lg">
          Sign In
        </Button>
      </form>
      <p className="text-gray-500 text-sm text-center my-4">
        Don't have an account? <span className="text-violet-600">Sign Up</span>
      </p>
    </div>
  );
}
