import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data || req.body;

  console.log("Request Body:", req.body); // Log the entire request body
  console.log("User Email:", userEmail);  // Log the userEmail

  if (!userEmail) {
    return res.status(400).send({ message: "User email is required" });
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created", residency });
  } catch (err) {
    console.error("Error:", err); // Log the error for debugging
    if (err.code === "P2002") {
      return res.status(400).send({ message: "A residency with the provided address already exists" });
    }
    res.status(500).send({ message: err.message });
  }
});

// Other route handlers...

// getting all documents/residencies

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send('All residencies');
});

// get document/residency by id
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send('Residency');
  } catch (err) {
    throw new Error(err.message);
  }
});

// update document/residency by id
export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, address, city, country, image, facilities } = req.body;

  try {
    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
      },
    });
    res.json(updatedResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});

// delete document/residency by id
export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.residency.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    throw new Error(err.message);
  }
});
