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
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0)
    const total = subtotal + tax + shippingPrice

}