"use server";

import { toBinaryUUID, fromBinaryUUID } from "binary-uuid";
import * as uuid from "uuid"
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function GenerateAuthorizationCode(){
  var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var authCode = "";
  for (var i = 12; i > 0; --i) authCode += characters[Math.floor(Math.random() * characters.length)]

  return ["LSPS", authCode?.match(RegExp(".{1,4}", 'g'))?.join("-")].join("-");
}

export async function addNewTrainingOfficer(prevState:any, formData: FormData) {
  if (!(await getSession())) return {message: "Session invalid", success: false};

  const newTrainingOfficer = await prisma.trainingOfficers.create({
    data: {
      authCode: GenerateAuthorizationCode(),
      trainingOfficerName: formData.get("trainingOfficerName") as string,
      trainingOfficerCitizenID: formData.get("trainingOfficerCitizenID") as string,
      trainingOfficerForumID: formData.get("trainingOfficerForumID") as string,
      trainingOfficerDiscordID: formData.get("trainingOfficerDiscordID") as string,
      trainingOfficerUUID: toBinaryUUID(uuid.v4()),      
    }
  })

  redirect("/rdSeniors");
  return {message: "Success", success: true};
}