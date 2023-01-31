import * as Yup from "yup";

export const RegisterSchema = Yup.object()
  .shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .test("invalid", "Must include first and last name", (name) =>
        /^[a-zA-Z]+ [a-zA-Z]+/.test(name || "")
      ),
    email: Yup.string()
      .trim()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .email("Invalid email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  })
  .required();
