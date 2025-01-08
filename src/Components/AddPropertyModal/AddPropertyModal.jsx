import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import "@mantine/core/styles.css";
import UploadImage from "../UploadImage/UploadImage";

const AddPropertyModal = () => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
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

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
        size="lg"
        color="blue"
        radius="md"
      >
        <Stepper.Step
          label="Location"
          description="Add Specific Country ,City ,SubCity"
        >
          <AddLocation
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Upload Image"
          description="Browse and Upload Image"
        >
          <UploadImage
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <p>Step 3 content: Get full access</p>
        </Stepper.Step>
        <Stepper.Completed>
          <p>Completed! Click back to review your steps.</p>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default AddPropertyModal;
