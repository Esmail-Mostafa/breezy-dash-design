import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import { Field, Form, Formik, FormikProps } from "formik";
import { userStep1 } from "@/services/tilkat/slice";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";

export const UserPage1 = forwardRef<FormikProps<any>, {}>((props, formRef) => {
  const dispatch = useDispatch(); // دلوقتي فيه نوع مضبوط
  const user = useSelector((state: any) => state.user);

  return (
    <Formik
      initialValues={{
        firstName: user.page1.firstName || "",
        lastName: user.page1.lastName || "",
        email: user.page1.email || "",
        phone: user.page1.phone || "",
        dateOfBirth: user.page1.dateOfBirth || "",
      }}
      enableReinitialize
      innerRef={formRef}
      onSubmit={(values) => {
        console.log(values);

        dispatch(userStep1(values));
      }}
    >
      <Form>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                id="firstName"
                placeholder="Enter first name"
                name="firstName"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                id="lastName"
                placeholder="Enter last name"
                name="lastName"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Field
              className="w-full border border-gray-300 rounded-md p-2"
              id="email"
              type="email"
              placeholder="Enter email address"
              name="email"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                id="phone"
                placeholder="Enter phone number"
                name="phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit">Next</Button>
        </div>
      </Form>
    </Formik>
  );
});
