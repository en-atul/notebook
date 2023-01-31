import * as Yup from "yup";

export const CreateNoteSchema = Yup.object()
  .shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    content:
      Yup.string()
      .required("Required"),
  })
  .required();
