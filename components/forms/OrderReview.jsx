import React, {useContext} from 'react';
import { Heading, Box, Stack, StackDivider, Text, Flex, Button } from '@chakra-ui/react';
import {CartContext} from '../../context/CartContext'
import { useSelector } from 'react-redux';

export const OrderReview = () => {
    // get cart context
    // get checkout details

    const {cart} = useContext(CartContext)
    const state = useSelector((state) => state)

    const shippingPrice = subtotal > 50 ? 0 : 7.99
    const tax = subtotal * 0.08875
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const total = subtotal + tax + shippingPrice

    return (
    <Stack divier={<StackDivider/>} spacing='4'>
        <Box>
            <Heading size='xs' textTransform='uppercase'>Shipping Address</Heading>

            <Text pt='2' fontSize='sm'>{state.shippingAddress.fullName}</Text>
        
            <Text pt='2' fontSize='sm'>{state.shippingAddress.address}</Text>
            
            <Text pt='2' fontSize='sm'>{state.shippingAddress.city}</Text>
            
            <Text pt='2' fontSize='sm'>{state.shippingAddress.postalCode}</Text>
            
            <Text pt='2' fontSize='sm'>{state.shippingAddress.country}</Text>
            
        </Box>

        <Box>
            <Heading size='xs' textTransform='uppercase'>Payment Method</Heading>
            <Text>
                {state.shippingAddress.paymentMethod ? state.shippingAddress.paymentMethod :"Paypal"}
            </Text>
        </Box>

        <Box>
            <Heading size='xs' textTransform='uppercase'>Order Summary</Heading>
            <Text pt='2' fontSize='sm'>Items: ${subtotal}</Text>
            <Text pt='2' fontSize='sm'>Shipping: ${shippingPrice}</Text>
            <Text pt='2' fontSize='sm'>Tax: ${tax}</Text>
            <Text pt='2' fontSize='sm'>Total: ${total}</Text>

            <Flex justify='center' align='center' pt='4'>
                <Button colorScheme='yellow' size='sm'>Place Order</Button>
            </Flex>
        </Box>
    </Stack>
    )
}