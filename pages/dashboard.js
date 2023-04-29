import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Spinner, Flex } from "@chakra-ui/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session && !session.user.isAdmin) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setLoading(true);
    await fetch("/api/list-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
    setLoading(false);
  }

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center'>
        <Spinner />
      </Flex>
    );
  }

  return <div>dashboard</div>;
};

export default DashboardPage;
