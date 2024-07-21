"use server";

import { toBinaryUUID, fromBinaryUUID } from "binary-uuid";
import * as uuid from "uuid"
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function updateTrainingOfficer(prevState: any, formData: FormData) {
  if (!(await getSession())) return {message: "Session invalid", success: false};
  console.log(formData);
  const newTrainingOfficer = await prisma.trainingOfficers.update({
    where: {
      columnIndex: parseInt(formData.get("columnIndex") as string),
      trainingOfficerUUID: toBinaryUUID(formData.get("trainingOfficerUUID") as string)
    },
    data: {
      trainingOfficerName: formData.get("trainingOfficerName") as string,
      trainingOfficerCitizenID: formData.get("trainingOfficerCitizenID") as string,
      trainingOfficerForumID: formData.get("trainingOfficerForumID") as string,
      trainingOfficerDiscordID: formData.get("trainingOfficerDiscordID") as string,
    },
  })

  redirect("/rdSeniors");
  return {message: "Success", success: true};
}