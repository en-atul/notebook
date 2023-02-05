import * as Yup from "yup";

export const RegisterSchema = Yup.object()
  .shape({
    fullname: Yup.string()
      .max(50, "Too Long!")
      .required("Fullname Required")
      .test("invalid", "Must include first and last name", (name) =>
        /^[a-zA-Z]+ [a-zA-Z]+/.test(name || "")
      ),
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .min(8, "Password Must Be atleast of 8 Character")
      .max(50, "Password Too Long")
      .required("Password Required"),
  })
  .required();
