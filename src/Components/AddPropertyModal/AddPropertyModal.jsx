import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import "@mantine/core/styles.css";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetail from "../BasicDetail/BasicDetail";
import Facilities from "../Facilities/Facilities";

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
        size="sm"
        color="blue"
        radius="lg"
      >
        <Stepper.Step
          label="Location"
        >
          <AddLocation
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Upload Image"
        >
          <UploadImage
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Add Basic Detail"
        >
          <BasicDetail
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step
          label="facilities and status"
        >
          <Facilities
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <p>Completed! Click back to review your steps.</p>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default AddPropertyModal;
