import axios from "axios";

import { FormState } from "../types/main";


export const pinJSONToIPFS = async (formData: FormState) => {
  // Construct the pinataContent object
  const pinataContent: any = {
    image: "ipfs://QmZeW8PyQcUMNbuRUT5C79N7Q6sLtq5fBJJwbnYJxioeVF",
    description:
      "A degree awarded by a college or university that certifies the successful completion of a study programme",
    sellable: false,
    traits: [],
  };

  // Add mandatory fields
  pinataContent.traits.push({
    trait_type: "University",
    value: formData.university,
  });
  pinataContent.traits.push({
    trait_type: "Degree",
    value: formData.academicDegree,
  });
  pinataContent.traits.push({ trait_type: "Year", value: formData.year });
  pinataContent.traits.push({
    trait_type: "Field of Study",
    value: formData.fieldOfStudy,
  });

  // Add optional fields if they are provided
  if (formData.studentName) {
    pinataContent.traits.push({
      trait_type: "Student Name",
      value: formData.studentName,
    });
  }

  if (formData.thesisTitle) {
    pinataContent.traits.push({
      trait_type: "Thesis Title",
      value: formData.thesisTitle,
    });
  }

  // Construct the data object
  const data = JSON.stringify({
    pinataContent,
    pinataMetadata: {
      name: "metadata.json",
    },
  });

  try {
    const res = await axios.post(
      "/api/pin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.log(error);
  }
};
