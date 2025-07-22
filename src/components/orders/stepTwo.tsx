import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Formik, Form, Field, FormikProps } from "formik";
import { step2 } from "@/services/redex/actions";

const productPrices: Record<string, number> = {
  laptop: 999,
  phone: 699,
  tablet: 499,
  headphones: 199,
};
const StepTwo = ({
  formRef,
}: {
  formRef: React.RefObject<FormikProps<any>>;
}) => {
  const dispatch = useDispatch();
  const page2 = useSelector((state: any) => state[0].page2);

  return (
    <Formik
      initialValues={{
        product: "laptop",
        quantity: "1",
        requirements: "",
      }}
      innerRef={formRef}
      onSubmit={(values) => {
        dispatch(step2(values));
      }}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          {/* Select Product */}
          <div className="space-y-2">
            <Label htmlFor="product">Select Product</Label>
            <Select
              value={values.product}
              onValueChange={(value) => {
                setFieldValue("product", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laptop">Laptop - $999</SelectItem>
                <SelectItem value="phone">Smartphone - $699</SelectItem>
                <SelectItem value="tablet">Tablet - $499</SelectItem>
                <SelectItem value="headphones">Headphones - $199</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity & Unit Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Field
                name="quantity"
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input
                value={
                  values.product ? `$${productPrices[values.product]}` : "$0.00"
                }
                disabled
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Special Requirements</Label>
            <Field
              as={Textarea}
              name="requirements"
              rows={3}
              placeholder="Enter any special requirements or notes"
            />
          </div>

          {/* Total Cost */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Estimated Cost:</span>
              <span className="text-xl font-bold text-primary">
                $
                {values.product
                  ? values.quantity * productPrices[values.product]
                  : 0}
                .00
              </span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepTwo;
