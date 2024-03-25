import {Gender} from "@prisma/client";
import {z} from "zod";

const createAdmin = z.object({
  password: z.string({required_error: "Password is Required"}),
  admin: z.object({
    name: z.string({required_error: " Name is Required!"}),
    email: z.string({required_error: "Email is Required!"}),
    contactNumber: z.string({required_error: "Contact Number is Required!"}),
  }),
});

const createDoctor = z.object({
  password: z.string({required_error: "Password is Required!"}),
  doctor: z.object({
    name: z.string({required_error: "Name is Required!"}),
    email: z.string({required_error: "Email is Required!"}),
    contactNumber: z.string({required_error: "Contact Number is Required!"}),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Registration Number is Required!",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.FEMALE, Gender.MALE]),
    appointmentFee: z.number({required_error: "Appointment fee is Required!"}),

    qualification: z.string({required_error: "Qualification is Required!"}),
    currentWorkingPlace: z.string({
      required_error: "Current Working Place is Required!",
    }),
    designation: z.string({required_error: "Designation is Required!"}),
  }),
});

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    name: z.string({
      required_error: "Name is required!",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});
export const userValidations = {
  createAdmin,
  createDoctor,
  createPatient
};
