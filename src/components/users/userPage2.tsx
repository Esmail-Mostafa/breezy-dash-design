import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userStep2 } from "@/services/tilkat/slice";
const roles = ["Admin", "Editor", "Viewer"];
const departments = ["HR", "Finance", "IT", "Marketing"];

export const UserPage2 = forwardRef<FormikProps<any>, {}>((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  console.log(user.page2, "sssssssssssssssssssssssssss");

  return (
    <Formik
      innerRef={ref}
      enableReinitialize
      initialValues={{
        username: user.page2.username,
        password: user.page2.password,
        confirmPassword: user.page2.confirmPassword,
        role: user.page2.role,
        department: user.page2.department,
      }}
      onSubmit={(values) => {
        dispatch(userStep2(values));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Field
                className="w-full border border-gray-300 rounded-md p-2"
                name="username"
                placeholder="Enter username"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Field
                  className="w-full border border-gray-300 rounded-md p-2"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Field
                  className="w-full border border-gray-300 rounded-md p-2"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={values.role}
                  onValueChange={(value) => {
                    setFieldValue("role", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={values.department}
                  onValueChange={(value) => {
                    setFieldValue("department", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});

UserPage2.displayName = 'UserPage2';
