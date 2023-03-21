import React from 'react'
import {Stack, Heading, Flex, Button} from '@chakra-ui/react'

const OrderSummary = ({total}) => {
  return (
<Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
    <Heading size='md'>Order Summary</Heading>
    <Stack spacing='6'>
        <Flex justifyContent='space-between'>
            <Heading size='sm'>{`Subtotal `}</Heading>
            <Heading size='sm'>{`$ ${total}`}</Heading>
        </Flex>
    </Stack>
    <Button siz='lg' fontSize='md' bg='gray.900' color='white' _dark={{ bg: "gray.50", color: "gray.900" }}
>Checkout</Button>
</Stack>
  )
}

export default OrderSummary