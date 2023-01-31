import * as Yup from 'yup'

export const NoteSchema = Yup.object()
  .shape(
    {
      chiefComplaint: Yup.string().notRequired(),
      patientNotes: Yup.string().notRequired(),
      plan: Yup.string().notRequired(),
      prescribeMedication: Yup.boolean().notRequired(),
      pharmacyService: Yup.string().notRequired(),
      icdCodes: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string(),
            value: Yup.string(),
          }),
        )
        .notRequired(),
      medications: Yup.array()
        .of(
          Yup.object().shape({
            medicationName: Yup.array().of(
              Yup.object().shape({
                medicationName: Yup.string(),
                medicationId: Yup.string(),
              }),
            ),
            medicationInstruction: Yup.string(),
            quantity: Yup.number(),
            daySupply: Yup.number(),
            refillNumber: Yup.number(),
            paymentType: Yup.string(),
            cardHolderId: Yup.string(),
            rxGroup: Yup.string(),
            rxBin: Yup.string(),
            pcn: Yup.string(),
          }),
        )
        .notRequired()
        .when('prescribeMedication', {
          is: (val: boolean) => val,
          then: Yup.array()
            .of(
              Yup.object().shape({
                medicationName: Yup.array()
                  .of(
                    Yup.object().shape({
                      medicationName: Yup.string(),
                      medicationId: Yup.string(),
                    }),
                  )
                  .compact(v => !v?.medicationName)
                  .required('Medication Required')
                  .ensure(),
                medicationInstruction: Yup.string().required(
                  'Medication instruction is required',
                ),
                quantity: Yup.number()
                  .typeError('Must be number')
                  .required('Quantity is required'),
                daySupply: Yup.number()
                  .typeError('Must be number')
                  .required('Day supply is required'),
                refillNumber: Yup.number(),
                paymentType: Yup.string(),
                cardHolderId: Yup.string(),
                rxGroup: Yup.string(),
                rxBin: Yup.string(),
                pcn: Yup.string(),
              }),
            )
            .required('Required'),
        }),
      duration: Yup.number().required().nullable(),
      appointmentType: Yup.string().required().label('appointment type'),
    },
    [['prescribeMedication', 'medications']],
  )
  .required()
export const UpdateNoteSchema = Yup.object()
  .shape(
    {
      chiefComplaint: Yup.string().notRequired(),
      patientNotes: Yup.string().notRequired(),
      plan: Yup.string().notRequired(),
      prescribeMedication: Yup.boolean().notRequired(),
      pharmacyService: Yup.string().notRequired(),
      icdCodes: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string(),
            value: Yup.string(),
          }),
        )
        .notRequired(),
      medications: Yup.array()
        .of(
          Yup.object().shape({
            medicationName: Yup.array().of(
              Yup.object().shape({
                medicationName: Yup.string(),
                medicationId: Yup.string(),
              }),
            ),
            medicationInstruction: Yup.string(),
            quantity: Yup.number(),
            daySupply: Yup.number(),
            refillNumber: Yup.number(),
            paymentType: Yup.string(),
            cardHolderId: Yup.string(),
            rxGroup: Yup.string(),
            rxBin: Yup.string(),
            pcn: Yup.string(),
          }),
        )
        .notRequired()
        .when('prescribeMedication', {
          is: (val: boolean) => val,
          then: Yup.array()
            .of(
              Yup.object().shape({
                medicationName: Yup.array()
                  .of(
                    Yup.object().shape({
                      medicationName: Yup.string(),
                      medicationId: Yup.string(),
                    }),
                  )
                  .compact(v => !v?.medicationName)
                  .required('Medication Required')
                  .ensure(),
                medicationInstruction: Yup.string().required(
                  'Medication instruction is required',
                ),
                quantity: Yup.number()
                  .typeError('Must be number')
                  .required('Quantity is required'),
                daySupply: Yup.number()
                  .typeError('Must be number')
                  .required('Day supply is required'),
                refillNumber: Yup.number(),
                paymentType: Yup.string(),
                cardHolderId: Yup.string(),
                rxGroup: Yup.string(),
                rxBin: Yup.string(),
                pcn: Yup.string(),
              }),
            )
            .required('Required'),
        }),
    },
    [['prescribeMedication', 'medications']],
  )
  .required()
export type NoteFormProps = Yup.InferType<typeof NoteSchema>
export type UpdateNoteFormProps = Yup.InferType<typeof UpdateNoteSchema>
