import React from "react";
import { Stack, Heading, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const OrderSummary = ({ total }) => {
  const router = useRouter();
  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
      <Heading size='md'>Order Summary</Heading>
      <Stack spacing='6'>
        <Flex justifyContent='space-between'>
          <Heading size='sm'>{`Subtotal `}</Heading>
          <Heading size='sm'>{`$ ${total.toFixed(2)}`}</Heading>
        </Flex>
      </Stack>
      <Button
        size='lg'
        fontSize='md'
        bg='gray.900'
        color='white'
        _dark={{ bg: "gray.50", color: "gray.900" }}
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default OrderSummary;
