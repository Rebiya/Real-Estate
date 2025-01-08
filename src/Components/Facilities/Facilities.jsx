import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.bedrooms,
      bathroom: propertyDetails.bathroom,
      status: propertyDetails.status
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathroom: (value) =>
        value < 1 ? "Must have at least one bathroom" : null
    }
  });

  const { bedrooms, bathroom, status } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        bedrooms,
        status,
        bathroom
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user, getAccessTokenSilently } = useAuth0();
  const token = getAccessTokenSilently();
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          bedrooms,
          status,
          bathroom
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        propertyid: "",
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        subcity: "",
        imgurl: null,
        status: "",
        propertyType: "",
        bedrooms: 0,
        bathroom: 0,
        staffemail: user?.email
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    }
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
          label="current status of the house"
          min={0}
          {...form.getInputProps("status")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
