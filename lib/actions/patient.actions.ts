"use server"
// import { users } from "../appwrite.config"
import { ID,Query } from "node-appwrite";
  import { parseStringify } from "../utils";

  import {
    BUCKET_ID,
    DATABASE_ID,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
    users,
  } from "../appwrite.config";


export const createUser = async (user: CreateUserParams) => {
    try {
      const newuser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
     return parseStringify(newuser);
    } catch (error: any) {
      // Check existing user
      if (error && error?.code === 409) {
        const documents = await users.list([
          Query.equal("email", [user.email]),
        ]);
  
        return documents?.users[0];
      }
      // console.error("An error occurred while creating a new user:", error);
    }
};
// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
  
// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};