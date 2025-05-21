import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import useProperties from "../../hooks/useProperties";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setActiveStep
}) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { refetch: refetchProperties } = useProperties();

  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.bedrooms,
      bathroom: propertyDetails.bathrooms,
      parking: propertyDetails.parking
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathroom: (value) => (value < 1 ? "Must have at least one bathroom" : null)
    }
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently();
      return createResidency(
        {
          ...propertyDetails,
          bedrooms: form.values.bedrooms,
          parking: form.values.parking,
          bathrooms: form.values.bathroom,
          user_email: user?.email
        },
        token
      );
    },
    onSuccess: () => {
      toast.success("Property added successfully!");
      resetForm();
      refetchProperties();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create property");
      console.error("Creation error:", error);
    }
  });

  const resetForm = () => {
    setPropertyDetails({
      title: "",
      description: "",
      price: 0,
      country: "",
      city: "",
      subcity: "",
      image_url: "",
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      user_email: user?.email || ""
    });
    if (setActiveStep) {
      setActiveStep(0);
    }
  };

  const handleSubmit = () => {
    if (!propertyDetails.image_url) {
      toast.error("Please upload a property image");
      return;
    }
    
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails(prev => ({
        ...prev,
        bedrooms: form.values.bedrooms,
        parking: form.values.parking,
        bathrooms: form.values.bathroom
      }));
      mutate();
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathroom")}
        />
        <TextInput
          label="Parking"
          {...form.getInputProps("parking")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>Back</Button>
          <Button type="submit" color="green" loading={isLoading}>
            {isLoading ? "Creating..." : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;