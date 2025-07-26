import React, { forwardRef, RefObject } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { FormikProps } from "formik";

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Dubai",
  "Asia/Kolkata",
];

export const UserPage4 = forwardRef<FormikProps<any>, {}>((props, formRef) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio">Bio / Description</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about this user..."
          className="h-24"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="City, Country" />
        </div>
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="profilePicture">Profile Picture URL</Label>
        <Input
          id="profilePicture"
          placeholder="https://example.com/profile.jpg"
        />
      </div>

      <Separator />

      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Review User Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p>
              <strong>Username:</strong> johndoe
            </p>
            <p>
              <strong>Role:</strong> Manager
            </p>
          </div>
          <div>
            <p>
              <strong>Department:</strong> IT
            </p>
            <p>
              <strong>Access Level:</strong> Standard
            </p>
            <p>
              <strong>Permissions:</strong> 5 selected
            </p>
            <p>
              <strong>Location:</strong> New York, USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
