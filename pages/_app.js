import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { CartProvider } from "../context/CartContext";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // layout in app.js instead of index.js to have on all pages
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
