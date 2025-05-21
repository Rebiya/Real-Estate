import { useState } from "react";
import { Stepper, Button, Group, Text } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import "@mantine/core/styles.css";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetail from "../BasicDetail/BasicDetail";
import Facilities from "../Facilities/Facilities";
import { createResidency } from "../../utils/api";
import { toast } from "react-toastify";

// Initial state object for property details
const initialPropertyState = {
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
  user_email: ""
};

const AddPropertyModal = () => {
  const [active, setActive] = useState(0);
  const { user, getAccessTokenSilently } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    ...initialPropertyState,
    user_email: user?.email || ""
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const resetForm = () => {
    setPropertyDetails({
      ...initialPropertyState,
      user_email: user?.email || ""
    });
    setActive(0);
  };

const handleComplete = async () => {
  if (isSubmitting) return;
  
  try {
    setIsSubmitting(true);
    const token = await getAccessTokenSilently();
    
    if (!propertyDetails.image_url) {
      throw new Error("Please upload a property image");
    }

    await createResidency(propertyDetails, token);
    toast.success("Property created successfully!");
    resetForm();
    setOpened(false); // Close the modal here
  } catch (error) {
    toast.error(error.message || "Failed to create property");
    console.error("Creation error:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div
      style={{
        padding: "30px",
        borderRadius: "10px",
        color: "black",
        maxWidth: "80%",
        margin: "0 auto"
      }}
    >
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
        size="sm"
        color="blue"
        radius="lg"
      >
        <Stepper.Step label="Location">
          <AddLocation
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Upload Image">
          <UploadImage
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Add Basic Detail">
          <BasicDetail
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Facilities and Status">
          <Facilities
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            onComplete={handleComplete}
            isSubmitting={isSubmitting}
            setActiveStep={setActive}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <Text ta="center" fw={500} size="lg" mt="md">
            Property created successfully!
          </Text>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={resetForm}>
              Add Another Property
            </Button>
          </Group>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default AddPropertyModal;