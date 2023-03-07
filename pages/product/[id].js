import React from "react";
import { useRouter } from "next/router";
import { data } from "../../utils/data";
import {
  Container,
  SimpleGrid,
  Flex,
  Image,
  Heading,
  Stack,
  Box,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = data.products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <SimpleGrid columns={[1, 2]}>
        <Flex>
          <Image
            src={`/images${product.image}`}
            alt={product.title}
            rounded={"md"}
            align={"center"}
            fit={"cover"}
            h={"100%"}
            w={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.title}
            </Heading>
            <Text>$ {product.price}</Text>
          </Box>
          <Text>{product.description}</Text>
          <Flex flexGrow={1} alignItems={"end"}>
            <Button>Add to Cart</Button>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default ProductPage;
