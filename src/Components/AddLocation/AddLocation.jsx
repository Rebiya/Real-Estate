import React from "react";
import { useForm } from "@mantine/form";
import useCountries from "../../hooks/useCountries";
import "@mantine/core/styles.css";

import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import Map from "../Map/Map";
const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      subcity: propertyDetails?.subcity
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      subcity: (value) => validateString(value)
    }
  });

  const { country, city, subcity } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, subcity, country }));
      nextStep();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row"
        }}
      >
        {/* left side */}
        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="city"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="subcity"
            {...form.getInputProps("subcity", { type: "input" })}
          />
        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map subcity={subcity} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">
          Next Step
        </Button>
      </Group>
    </form>
  );
};

export default AddLocation;
