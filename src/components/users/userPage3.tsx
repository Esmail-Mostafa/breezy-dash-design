import React, { forwardRef, RefObject } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Form, Formik, FormikProps } from "formik";
const accessLevels = ["Basic", "Standard", "Premium", "Full Access"];
const permissionsList = [
  "View Users",
  "Create Users",
  "Edit Users",
  "Delete Users",
  "View Reports",
  "Create Reports",
  "View Analytics",
  "Manage Settings",
];
export const UserPage3 = forwardRef<FormikProps<any>, {}>((props, formRef) => {
  return (
    <Formik
      ref={formRef}
      initialValues={{
        accessLevel: "",
        permissions: [],
        notifications: {
          email: false,
          sms: false,
          push: false,
        },
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      
      <Form>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Access Level *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {accessLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {permissionsList.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox id={permission} />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary">View Users</Badge>
              <Badge variant="secondary">Create Users</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Notifications</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sms-notifications" />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="push-notifications" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
});
