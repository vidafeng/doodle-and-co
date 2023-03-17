import React, { useContext } from "react";
import { useColorMode, IconButton, Box, Text } from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";

function CartIcon() {
  const { cart } = useContext(CartContext);
  const { colorMode } = useColorMode();

  const hoverColor = { light: "gray.800", dark: "gray.100" };
  const iconColor = { light: "gray.600", dark: "gray.300" };
  const fontColor = { light: "gray.800", dark: "gray.100" };

  return (
    <Box position="relative">
      <IconButton
        aria-label="cart"
        icon={<Text fontSize="2xl">🛒</Text>}
        // transparent
        variant="ghost"
        color={iconColor[colorMode]}
        _hover={{ color: hoverColor[colorMode] }}
      />

      {cart.length > 0 && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bg={hoverColor[colorMode]}
          rounded="sm"
          p={1}
        >
          <Text fontWeight="bold">{cart.length}</Text>
        </Box>
      )}
    </Box>
  );
}

export default CartIcon;
