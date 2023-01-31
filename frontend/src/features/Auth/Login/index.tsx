import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "definitions";
import { TextInput } from "components";

export default function Login() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(LoginSchema),
  });

  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center my-5">Welcome Back</h1>
      <form>
        <p>Login</p>
        <article className="mb-5">
          <TextInput
            register={register}
            id="email"
            name="email"
            placeholder="Email"
            error={errors?.email?.message}
          />
        </article>
        <article className="mb-5">
          <TextInput
            register={register}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            error={errors?.password?.message}
          />
        </article>
      </form>
    </div>
  );
}
