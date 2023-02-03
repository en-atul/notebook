import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "definitions";
import { Button, FormError, FormLabel, TextInput } from "components";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {  LOGIN_QUERY, USER_QUERY } from "services";
import { useMutation } from "@apollo/client";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(LoginSchema),
  });

 
  // {
  //   onSuccess: (data) => {
  //     if (data?.login) {
  //       queryClient.setQueryData(queryKeys.auth, data.login);
  //     }
  //   },
  //   onError: (err: any) => {
  //     const errMessage = err?.response?.errors[0]?.message;
  //     const fieldName = err?.response?.errors[0]?.extensions?.name;

  //     if (["email", "password"].includes(fieldName)) {
  //       setError(fieldName, { type: "manual", message: errMessage });
  //     } else alert(errMessage);
  //   },
  // }
  const [login, { loading }] = useMutation(LOGIN_QUERY, {
    onError(error, clientOptions) {
      console.log("errrrr", error);
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: USER_QUERY,
        data: { user: data.login },
      });
    },
  });

  const submit = (values: Yup.InferType<typeof LoginSchema>) => {
    login({ variables: { input: values } });
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center text-gray-600">Welcome Back</h1>
      <p className="text-center text-sm text-gray-400 mt-2 mb-7">
        Welcome Back! Please enter your credentials
      </p>

      <form onSubmit={handleSubmit(submit)}>
        <article className="mb-5">
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextInput
            register={register}
            id="email"
            name="email"
            placeholder="Enter your email"
            error={errors?.email?.message}
          />
          <FormError id="email" error={errors?.email?.message} />
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
          <FormError id="password" error={errors?.password?.message} />
        </article>

        <Button className="py-2.5" type="submit" isSubmitting={loading}>
          Sign In
        </Button>
      </form>
      <p className="text-gray-500 text-sm text-center my-4">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-violet-600">Sign Up</span>
        </Link>
      </p>
    </div>
  );
}
