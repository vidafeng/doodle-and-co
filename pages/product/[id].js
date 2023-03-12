import React from "react";
import { useRouter } from "next/router";
import { data } from "../../utils/data";
import db from "../../utils/db";
import Product from "../../models/Product";
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

const ProductPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // dummy data
  // const product = data.products.find((product) => product.id === parseInt(id));

  const { product } = props;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxW={"container.xl"} my={3}>
      <SimpleGrid columns={[1, 2]} spacing={2}>
        <Flex>
          <Image
            src={`/images${product.image}`}
            alt={product.name}
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
              {product.name}
            </Heading>
            <Text
              color="gray.900"
              _dark={{ color: "gray.400" }}
              fontWeight={300}
              fontSize={"2xl"}
            >
              $ {product.price}
            </Text>
          </Box>
          <Text
            color="gray.500"
            _dark={{ color: "gray.400" }}
            fontWeight={300}
            fontSize={"lg"}
          >
            {product.description}
          </Text>
          <Flex flexGrow={1} alignItems={"end"}>
            <Button
              rounded={"md"}
              w={"full"}
              mt={8}
              py={6}
              size={"lg"}
              bg="gray.800"
              _dark={{ bg: "gray.50", color: "gray.700" }}
              color="white"
              textTransform="uppercase"
            >
              Add to Cart
            </Button>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

// nextjs getServerSideProps
// when page is requested, will pre-render the page
// props/data from getServideSide will be passed to the page
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  // make connection to db
  await db.connect();
  const product = await Product.findOne({ id }).lean();
  await db.disconnect();

  return {
    props: { product: db.convertDocToObj(product) },
  };
}

export default ProductPage;
