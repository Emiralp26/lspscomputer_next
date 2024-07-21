"use server";

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { toBinaryUUID, fromBinaryUUID } from "binary-uuid";
import { prisma } from "@/lib/prisma";
import * as uuid from "uuid";
import { getSession } from "@/lib/auth";

type Submission = {
  taskName: string;
  grade?: number;
  grader?: string;
  submissionRow?: number;
  submissionUUID?: string;
  note?: string;
}

type TrainingData = {
  grade: number;
  note?: string;
}

export async function submitTOStatement(prevState: { message: string, success?: boolean}, formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/");

  const odpData = JSON.parse(formData.get("odpData") as string);
  const data = JSON.parse(formData.get("data") as string) as Array<TrainingData>;
  let ODPBuffer = Buffer.from(odpData.ODPUUID.data);

  const res = await prisma.oDPEvidenceSubmissions.create({
    data: {
      isTOStatement: 1,
      submissionUUID: toBinaryUUID(uuid.v4()),
      gradingOfficerName: session.user.trainingOfficerName,
      gradingOfficerUUID: Buffer.from(session.user.trainingOfficerUUID.data),
      submissionFor: data,
      traineeODPUUID: Buffer.from(odpData.ODPUUID.data),
      traineeUUID: Buffer.from(odpData.trainee.uuid.data)
    }
  })
  
  //TODO: Log here, evidence submission successful!
  const odp = await prisma.oDP.findFirst({ where: { ODPUUID: ODPBuffer } })
  if (odp?.checklist !== null){
    let checklist = (odp?.checklist as { [key: string]: Submission; })
    for (let [k, v] of Object.entries(data)) {
      let task = checklist[k];
      
      //check if item is in checklist and if grade is < 2 update it
      if (task && task.grade as any < 2) {
        task.grade = v.grade;
        task.submissionRow = res.columIndex;
        task.grader = session.user.trainingOfficerName;
        task.submissionUUID = fromBinaryUUID(res.submissionUUID);
        task.note = v.note;
      }else {
        if (odp !== null){
          task = {
            taskName: k,
            grade: v.grade,
            note: v.note || "",
            submissionUUID: fromBinaryUUID(res.submissionUUID),
            submissionRow: res.columIndex,
            grader: session.user.trainingOfficerName
          }
        }
      }

      checklist[k] = task;
    }

    //update ODP file
    const updateRes = await prisma.oDP.update({ where: { ODPUUID: ODPBuffer }, data: {
      checklist: checklist
    }})
  }

  revalidatePath("/odp/[odpUUID]", "page");
  redirect(`/odp/${fromBinaryUUID(ODPBuffer)}`);
}