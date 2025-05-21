import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Group } from "@mantine/core";
import "./UploadImage.css";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image_url || "");
  const [isUploading, setIsUploading] = useState(false);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // Initialize Cloudinary widget
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djxrxjiuf",
        uploadPreset: "x2omxwjd",
        maxFiles: 1,
        sources: ["local", "url", "camera"],
        cropping: true,
        multiple: false,
        clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
        maxImageFileSize: 2000000, // 2MB
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1"
          }
        }
      },
      (err, result) => {
        if (err) {
          console.error("Cloudinary error:", err);
          toast.error("Failed to upload image");
          setIsUploading(false);
          return;
        }

        if (result.event === "success") {
          setIsUploading(false);
          setImageURL(result.info.secure_url);
          toast.success("Image uploaded successfully!");
        } else if (result.event === "upload-added") {
          setIsUploading(true);
          toast.info("Uploading image...");
        } else if (result.event === "close") {
          setIsUploading(false);
        }
      }
    );
  }, []);

  const handleNext = () => {
    if (!imageURL) {
      toast.error("Please upload a property image");
      return;
    }
    
    setPropertyDetails(prev => ({ 
      ...prev, 
      image_url: imageURL 
    }));
    nextStep();
  };

  const handleOpenUploader = () => {
    if (isUploading) {
      toast.info("Please wait for current upload to complete");
      return;
    }
    widgetRef.current?.open();
  };

  return (
    <div className="flexColCenter uploadWrapper">
      <div className="uploadInstructions">
        <h3>Property Image Upload</h3>
        <p>Upload a high-quality image of your property (max 2MB)</p>
      </div>

      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={handleOpenUploader}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>{isUploading ? "Uploading..." : "Click to Upload"}</span>
        </div>
      ) : (
        <div className="uploadedImageContainer">
          <div 
            className="uploadedImage"
            onClick={handleOpenUploader}
          >
            <img 
              src={imageURL} 
              alt="Uploaded property" 
              onError={() => {
                setImageURL("");
                toast.error("Error loading image, please upload again");
              }}
            />
            <div className="imageOverlay">
              <span>Click to change image</span>
            </div>
          </div>
        </div>
      )}

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!imageURL || isUploading}
          loading={isUploading}
        >
          {isUploading ? "Uploading..." : "Next"}
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;