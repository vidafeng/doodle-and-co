import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { CartProvider } from "../context/Cart";

export default function App({ Component, pageProps }) {
  // layout in app.js instead of index.js to have on all pages
  return (
    <ChakraProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ChakraProvider>
  );
}
