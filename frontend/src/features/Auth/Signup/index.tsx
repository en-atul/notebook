import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "definitions";
import { Button, FormError, FormLabel, TextInput } from "components";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION, USER_QUERY } from "services";

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { fullname: "", email: "", password: "" },
    resolver: yupResolver(RegisterSchema),
  });

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onError(error, clientOptions) {
      console.log("errrrr");
      //       const errMessage = err?.response?.errors[0]?.message;
      //       const fieldName = err?.response?.errors[0]?.extensions?.name;

      //       if (["fullname", "email", "password"].includes(fieldName)) {
      //         setError(fieldName, { type: "manual", message: errMessage });
      //       } else alert(errMessage);
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: USER_QUERY,
        data: { user: data.signup },
      });
    },
  });

  const submit = (values: Yup.InferType<typeof RegisterSchema>) => {
    signup({ variables: values });
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center text-gray-600">Create an Account</h1>
      <p className="text-center text-sm text-gray-400 mt-2 mb-7">
        Welcome Back! Please enter your credentials
      </p>

      <form onSubmit={handleSubmit(submit)}>
        <article className="mb-5">
          <FormLabel htmlFor="email">Fullname</FormLabel>
          <TextInput
            register={register}
            id="fullname"
            name="fullname"
            placeholder="Enter your fullname"
            error={errors?.fullname?.message}
          />
          <FormError id="fullname" error={errors?.fullname?.message} />
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
          Sign Up
        </Button>
      </form>
      <p className="text-gray-500 text-sm text-center my-4">
        Already have an account?{" "}
        <Link to="/login">
          <span className="text-violet-600">Sign In</span>
        </Link>
      </p>
    </div>
  );
}
