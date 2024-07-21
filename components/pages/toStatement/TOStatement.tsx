import ChecklistTable from "@/components/pages/odp/ChecklistTable";
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { toBinaryUUID, fromBinaryUUID } from "binary-uuid";
import { validate } from 'uuid';
import ODPHeader from "../r&d/Header";
import PPCInfo from "../odp/PPCInfo";
import { getSession, login, logout } from "@/lib/auth";

type ODPWithData = Prisma.ODPGetPayload<{
  include: { trainee: true }
}>

export default async function TOStatement({ odpUUID }: { odpUUID: string}){
  if (!validate(odpUUID)) return <div>Problem</div>
  const session = await getSession()
  
  const searchBuffer = toBinaryUUID(odpUUID);
  const odp = await prisma.oDP.findFirst({
    where: {
      ODPUUID: searchBuffer,
    },
    include: {
      trainee: true
    }
  }) as ODPWithData;

  const trainee = odp?.trainee || {};

  return (
    <div 
      className="relative z-10 flex flex-col items-center w-[56.25rem] h-[95%]  pt-16 pb-4 gap-2 bg-slate-900 rounded-md border-slate-950 border-2 overflow-auto genericScrollBar"
    >
      <ODPHeader header1="Statement Generator" header2="Recruitment & Development"/>


      {/* P/PC Info */}
      <PPCInfo trainee={JSON.parse(JSON.stringify(trainee))} />
      
       {/* Training Officer Information */}
      <div className="h-[9rem] w-full flex justify-center items-center">
        <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th colSpan={4} className="px-4 border-4 border-gray-800 bg-slate-950 bg-opacity-40">Training Officer Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center border-2 border-gray-800 bg-slate-950 bg-opacity-40">Training Officer:</th>
              <td className="text-center border-2 border-gray-800">{session.user.trainingOfficerName}</td>
              <th className="text-center border-2 border-gray-800 bg-slate-950 bg-opacity-40">Officer UUID:</th>
              <td className="text-center border-2 border-gray-800">{fromBinaryUUID(Buffer.from(session.user.trainingOfficerUUID.data))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ChecklistTable odp={JSON.parse(JSON.stringify(odp))} toStatementGenerator={true} />
    </div>
  )
}