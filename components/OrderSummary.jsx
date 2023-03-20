import React from 'react'
import {Stack, Heading, Flex, Button} from '@chakra-ui/react'

const OrderSummary = ({total}) => {
  return (
<Stack>
    <Heading size='md'>Order Summary</Heading>
    <Stack>
        <Flex>
            <Heading size='sm'>{`Subtotal `}</Heading>
            <Heading size='sm'>{`$ ${total}`}</Heading>
        </Flex>
    </Stack>
    <Button siz='lg' fontSize='md' bg='gray.900' color='white' _dark={{ bg: "gray.50", color: "gray.900" }}
></Button>
</Stack>
  )
}

export default OrderSummary