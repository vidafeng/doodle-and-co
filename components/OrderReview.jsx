import React, { useContext, useState, useEffect } from "react";
import {
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
  Flex,
  Button,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";
import { useSelector } from "react-redux";
import {
  usePayPalScriptReducer,
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const OrderReview = () => {
  // get cart context
  // get checkout details

  const router = useRouter();

  const { cart, clearCart } = useContext(CartContext);
  const state = useSelector((state) => state);
  const toast = useToast();

  const { data: session } = useSession();

  // subtotal needs to go first, following variables needs access
  const subtotal = Number(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = Number(subtotal > 50 ? 0 : 7.99);
  const tax = Number((subtotal * 0.08875).toFixed(2));
  const total = subtotal + tax + shippingPrice;

  const [displayPaypalButton, setDisplayPaypalButton] = useState(false);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderIdDB, setOrderIdDB] = useState("");

  useEffect(() => {
    console.log("orderIdDB", orderIdDB);
  }, [orderIdDB]);

  useEffect(() => {
    if (displayPaypalButton) {
      // async bc making api call
      const loadPaymentScript = async () => {
        const response = await fetch("/api/keys/paypal", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { clientId } = await response.json();
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
      };
      loadPaymentScript();
    }
  }, [displayPaypalButton]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setOrderLoading(true);
    // save order details to database
    const user_id = session.user._id;
    const orderItems = cart.map((cartItem) => {
      return {
        name: cartItem.name,
        description: cartItem.description,
        image: cartItem.image,
        quantity: cartItem.qty ? cartItem.qty : 1,
      };
    });
    const shippingAddress = state.shippingAddress;
    const isPaid = false;
    const isDelivered = false;
    const paymentMethod = "paypal";

    const reqBody = {
      user_id,
      orderItems,
      shippingAddress,
      isPaid,
      isDelivered,
      paymentMethod,
      subtotal,
      shippingPrice,
      tax,
      total,
    };

    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        let responseData = data;
        // console.log("this is response data", responseData.data._id);
        setOrderIdDB(responseData.data._id);
        // console.log("inside data order review:", data);
        setDisplayPaypalButton(true);
      })

      .catch((err) => {
        setError(true);
      });
    setOrderLoading(false);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: total,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  // use authorizes payment
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      console.log("details", details);

      // update order status in db
      const { id: payment_id, status } = details;
      const email_address = details.payer.email_address;

      setIsPaid(true);
      toast({
        title: "Payment Successful!",
        description: "Thank you for your order",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      try {
        const response = await fetch("/api/payment/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payment_id, status, email_address }),
        });
        const data = response.json();
        // clear the cart
        clearCart();
        // redirect to confirmation page
        router.push(`/order/${orderIdDB}`);
      } catch (err) {
        setError(true);
      }
    });
  };

  const onError = (error) => {
    setError(true);
    toast({
      title: "Oops, something went wrong!",
      description: { error },
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Shipping Address
        </Heading>

        <Text pt='2' fontSize='sm'>
          {state.shippingAddress.fullName}
        </Text>

        <Text pt='2' fontSize='sm'>
          {state.shippingAddress.address}
        </Text>

        <Text pt='2' fontSize='sm'>
          {state.shippingAddress.city}
        </Text>

        <Text pt='2' fontSize='sm'>
          {state.shippingAddress.postalCode}
        </Text>

        <Text pt='2' fontSize='sm'>
          {state.shippingAddress.country}
        </Text>
      </Box>

      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Payment Method
        </Heading>
        <Text>
          {state.shippingAddress.paymentMethod
            ? state.shippingAddress.paymentMethod
            : "Paypal"}
        </Text>
      </Box>

      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Order Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          Items: ${subtotal}
        </Text>
        <Text pt='2' fontSize='sm'>
          Shipping: ${shippingPrice}
        </Text>
        <Text pt='2' fontSize='sm'>
          Tax: ${tax}
        </Text>
        <Text pt='2' fontSize='sm'>
          Total: ${total}
        </Text>

        <Flex justify='center' align='center' pt='4'>
          {displayPaypalButton ? (
            isPending ? (
              <CircularProgress isIndeterminate color='blue.300' />
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            )
          ) : (
            <Button
              onClick={handlePlaceOrder}
              colorScheme='yellow'
              loading={orderLoading.toString()}
              size='sm'
            >
              Place Order
            </Button>
          )}
        </Flex>
      </Box>
    </Stack>
  );
};

export default OrderReview;
