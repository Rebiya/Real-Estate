import React from "react";
import {
  TextInput,
  Box,
  Textarea,
  Group,
  Button,
  NumberInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetail = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 20 ? "Must be greater than 20 Millions" : null,
    }
  });

  const { title, description, price} = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        title,
        description,
        price,
      }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
       
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        <NumberInput
          withAsterisk
          label="Price"
          placeholder="50 M"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetail;
