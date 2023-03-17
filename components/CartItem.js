import React, { useContext } from "react";
import {
  Flex,
  Stack,
  Image,
  Box,
  Text,
  useColorMode,
  CloseButton,
} from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction={"row"} spacing="5" width="full">
        <Image
          src={`/images${item.image}`}
          alt={image.title}
          width="120px"
          height="120px"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{item.title}</Text>
            <Text
              fontSize="sm"
              color={useColorMode("gray.600", "gray.400")}
            ></Text>
          </Stack>
        </Box>
      </Stack>
      <Flex width="full" justify="space-between" display="flex">
        <Text
          fontWeight="medium"
          fontSize="lg"
          color={useColorMode("gray.800", "gray.200")}
        >
          {item.price}
        </Text>
        <CloseButton onClick={() => removeFromCart(item.id)} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
