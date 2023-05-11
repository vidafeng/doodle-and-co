import React, { useContext } from "react";
import {
  Flex,
  Stack,
  Image,
  Box,
  Text,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  const { updateQty } = useContext(CartContext);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify='space-between'
      align='center'
    >
      <Stack direction={"row"} spacing='5' width='full'>
        <Image
          src={`/images${item.image}`}
          alt={item.name}
          width='120px'
          height='120px'
          loading='lazy'
          borderRadius='md'
        />
        <Box pt='4'>
          <Stack spacing='0.5'>
            <Text fontWeight='medium'>{item.name}</Text>
            <Text fontSize='sm' color='gray.600' _dark={{ color: "gray.400" }}>
              {item.description}
            </Text>
          </Stack>
          {/* TO DO: show quanttiy */}
        </Box>
      </Stack>
      <Flex width='full' justify='space-between' display='flex'>
        <Text
          fontWeight='medium'
          fontSize='lg'
          color='gray.800'
          _dark={{ color: "gray.200" }}
        >
          ${item.price.toFixed(2)}
        </Text>
        <Text
          fontWeight='medium'
          fontSize='lg'
          color='gray.800'
          _dark={{ color: "gray.200" }}
        >
          <Button
            size='sm'
            mx='1'
            onClick={() =>
              item.qty > 1
                ? updateQty(item.id, item.qty - 1)
                : removeFromCart(item.id)
            }
          >
            -
          </Button>
          {item.qty}
          <Button
            size='sm'
            mx='1'
            onClick={() => updateQty(item.id, item.qty + 1)}
          >
            +
          </Button>
        </Text>
        <CloseButton onClick={() => removeFromCart(item.id)} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
