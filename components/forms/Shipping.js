import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";

const shippingAddressSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.number().required("Postal Code is required"),
  country: yup.string().required("Country is required"),
});

const ShippingAddressForm = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.shippingAddress);
  const [error, setError] = useState({});

  const [formValues, setFormValues] = useState(
    address
      ? address
      : { fullName: "", address: "", city: "", postalCode: "", country: "" }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate form
    // dispatch data to redux store
    try {
      await shippingAddressSchema.validate(formValues, { abortEarly: false });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(({ path, message }) => {
          validationErrors[path] = message;
        });
      }
      setError(validationErrors);
      return;
    }

    dispatchEvent({ type: address / saveShippingAddress, payload: formValues });

    // redirect to next form
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <Input
          placeholder="Your Name"
          name="fullName"
          onChange={handleChange}
          value={formValues.fullName}
        ></Input>
        <FormHelperText id="fullName-helper-text" color="red">
          {error.fullName}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          placeholder="Address"
          name="address"
          onChange={handleChange}
          value={formValues.address}
        ></Input>
        <FormHelperText id="address-helper-text" color="red">
          {error.address}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input
          placeholder="City"
          name="city"
          onChange={handleChange}
          value={formValues.city}
        ></Input>
        <FormHelperText id="city-helper-text" color="red">
          {error.city}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
        <Input
          placeholder="Postal Code"
          name="postalCode"
          onChange={handleChange}
          value={formValues.postalCode}
        ></Input>
        <FormHelperText id="postalCode-helper-text" color="red">
          {error.postalCode}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="country">Country</FormLabel>
        <Select
          placeholder="Select your country"
          name="country"
          onChange={handleChange}
          value={formValues.country}
        >
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </Select>
        <FormHelperText id="country-helper-text" color="red">
          {error.country}
        </FormHelperText>
      </FormControl>
      <Flex display="flex" justifyContent="flex-end">
        <Button type="submit" mt={4}>
          Continue
        </Button>
      </Flex>
    </form>
  );
};

export default ShippingAddressForm;
