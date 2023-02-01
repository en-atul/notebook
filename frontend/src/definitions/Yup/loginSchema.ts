import * as Yup from "yup";

export const LoginSchema = Yup.object()
  .shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().required("Password Required"),
  })
  .required();
