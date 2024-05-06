// https://ipfs.io/ipfs/QmWYdPCE6smSu4WqTA5f9QmdPXwmHHCPjhfLC2BFvxhk2E
// ipfs://QmWYdPCE6smSu4WqTA5f9QmdPXwmHHCPjhfLC2BFvxhk2E

import axios from "axios";

import { FormState } from "../types/main";

const JWT =
  "***REMOVED_PINATA_JWT***

export const pinJSONToIPFS = async (formData: FormState) => {
  // Construct the pinataContent object
  const pinataContent: any = {
    image: "ipfs://QmZeW8PyQcUMNbuRUT5C79N7Q6sLtq5fBJJwbnYJxioeVF",
    description:
      "This is an academic degree awarded by a college or university that certifies the successful completion of a degree programme. Please note that this is only a prototype and does not provide any information about the legitimacy of the data.",
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
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.log(error);
  }
};
