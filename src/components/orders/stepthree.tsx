import React from "react";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikProps, Form, Field } from "formik";
import { step3 } from "@/services/redex/actions";
function Stepthree({
  formRef,
}: {
  formRef: React.RefObject<FormikProps<any>>;
}) {
  const dispatch = useDispatch();
  const page3 = useSelector((state: any) => state[0].page3);

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        paymentMethod: page3.paymentMethod || "credit",
        address: page3.address || "",
        city: page3.city || "",
        state: page3.state || "",
        zip: page3.zip || "",
        deliveryDate: page3.deliveryDate || "",
      }}
      onSubmit={(values) => {
        dispatch(step3(values));
      }}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={values.paymentMethod}
                  onValueChange={(value) => {
                    setFieldValue("paymentMethod", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Delivery Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Field
                  className="w-full border border-gray-300 rounded-md p-2"
                  id="address"
                  placeholder="Enter street address"
                  name="address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Field
                    className="w-full border border-gray-300 rounded-md p-2"
                    id="city"
                    placeholder="Enter city"
                    name="city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Field
                    className="w-full border border-gray-300 rounded-md p-2"
                    id="state"
                    placeholder="Enter state"
                    name="state"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Field
                    className="w-full border border-gray-300 rounded-md p-2"
                    id="zip"
                    placeholder="Enter ZIP code"
                    name="zip"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                <Field
                  className="w-full border border-gray-300 rounded-md p-2"
                  id="deliveryDate"
                  type="date"
                  name="deliveryDate"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Stepthree;
