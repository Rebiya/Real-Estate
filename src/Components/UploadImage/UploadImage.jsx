import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { toast } from "react-toastify";
import "@mantine/core/styles.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.imgurl);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, imgurl: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djxrxjiuf",
        uploadPreset: "x2omxwjd",
        maxFiles: 1
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
          //https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/your-upload-preset/unique-image-name.jpg
          //e.g https://res.cloudinary.com/djxrxjiuf/image/upload/v1736327134/ttn3r7hmy2rekgjluvhl.jpg
          //   so it would be stored in the db in this format
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
