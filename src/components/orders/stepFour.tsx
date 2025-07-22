import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";


const productPrices: Record<string, number> = {
  laptop: 999,
  phone: 699,
  tablet: 499,
  headphones: 199,
};
function StepFour() {
  const { page1, page2, page3 } = useSelector((state: any) => state[0]);
  console.log(page1, page2, page3);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{page1.firstName}</p>
            <p>{page1.lastName}</p>
            <p>{page1.email}</p>
            <p>{page1.phone}</p>
            <p>{page1.company}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="flex justify-between">
              <span>{page2.product} × {page2.quantity}</span>
              <span className="font-medium">${page2.quantity * productPrices[page2.product]}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Delivery & Payment</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Payment: Credit Card</p>
            <p>Delivery: 123 Main St, City, State 12345</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-primary">${page2.quantity * productPrices[page2.product]}</span>
        </div>
      </div>
    </div>
  );
}

export default StepFour;
