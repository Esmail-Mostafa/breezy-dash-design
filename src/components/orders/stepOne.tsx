import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, FormikProps } from "formik";
import { step1 } from "@/services/redex/actions";

function StepOne({ formRef }: { formRef: React.RefObject<FormikProps<any>> }) {
  const dispatch = useDispatch();
  const page1 = useSelector((state: any) => state[0].page1);

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        firstName: page1.firstName,
        lastName: page1.lastName,
        email: page1.email,
        phone: page1.phone,
        company: page1.company,
      }}
      onSubmit={(values) => {
        dispatch(step1(values));
      }}
      enableReinitialize
    >
      <Form>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                name="firstName"
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                name="lastName"
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Field
              className="w-full border border-gray-300 rounded-md p-2"
              name="email"
              type="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Field
              className="w-full border border-gray-300 rounded-md p-2"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Field
              className="w-full border border-gray-300 rounded-md p-2"
              name="company"
              placeholder="Enter company name"
            />
          </div>
          <div className="mt-6"></div>
        </div>
      </Form>
    </Formik>
  );
}

export default StepOne;
