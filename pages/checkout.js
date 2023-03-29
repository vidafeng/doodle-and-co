import React from "react";
import ShippingAddressForm from "../components/forms/Shipping";
import { useSelector, useDispatch } from "react-redux";
import {
  Progress,
  Card,
  CardHeader,
  CardFooter,
  Heading,
  CardBody,
} from "@chakra-ui/react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.currentStep);
  console.log(activeStep);

  const steps = [
    { name: "Shipping", component: <ShippingAddressForm /> },
    { name: "Payment", component: <div>Payment</div> },
    { name: "Review", component: <div>Review</div> },
  ];

  return (
    <div>
      <Progress value={activeStep} max={steps.length} />
      <Card>
        <CardHeader>{steps[activeStep].name}</CardHeader>
        <CardBody>{steps[activeStep].component}</CardBody>
      </Card>
    </div>
  );
};

export default CheckoutPage;
