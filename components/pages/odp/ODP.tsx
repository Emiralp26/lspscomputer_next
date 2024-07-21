import ChecklistTable from "@/components/pages/odp/ChecklistTable";
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { toBinaryUUID, fromBinaryUUID } from "binary-uuid";
import { validate } from 'uuid';
import ODPHeader from '../r&d/Header';
import PPCInfo from "./PPCInfo";

type ODPWithData = Prisma.ODPGetPayload<{
  include: { trainee: true }
}>

const ODP: React.FC<{ odpUUID: string }> = async ({ odpUUID }) => {
  if (!validate(odpUUID)) return <div>Problem</div>
  
  const searchBuffer = toBinaryUUID(odpUUID);
  const odp = await prisma.oDP.findFirst({
    where: {
      ODPUUID: searchBuffer,
    },
    include: {
      trainee: true
    }
  }) as ODPWithData;

  const trainee = odp.trainee;

  return (
    <div 
      className="relative z-10 flex flex-col justify-around items-center w-[56.25rem] h-[95%]  pt-16 pb-4 gap-2 bg-slate-900 rounded-md border-slate-950 border-2 overflow-auto genericScrollBar"
    >
      <ODPHeader header1="Officer Development Plan" header2="Recruitment & Development"/>

      {/* P/PC Info */}
      <PPCInfo trainee={JSON.parse(JSON.stringify(trainee))} />
      
      {/* Recruitment */}
      <div className="h-[9rem] w-full flex justify-center items-center">
        <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th colSpan={4} className="px-4 border-4 border-gray-800 bg-slate-950 bg-opacity-40">Recruitment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center border-2 border-gray-800 bg-slate-950 bg-opacity-40">Induction Date:</th>
              <td className="text-center border-2 border-gray-800">Nikolai Svensson</td>
              <th className="text-center border-2 border-gray-800 bg-slate-950 bg-opacity-40">Induction Lead:</th>
              <td className="text-center border-2 border-gray-800">Nikolai Svensson</td>
            </tr>
            <tr>
              <th className="text-center border-2 border-gray-800 bg-slate-950 bg-opacity-40">Induction UUID:</th>
              <td colSpan={3} className="text-center border-2 border-gray-800">fd646ca2-ebe5-4d9a-9e78-e3d82bf0d8b6</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ChecklistTable odp={JSON.parse(JSON.stringify(odp))}/>

      {/* Final Assessment */}
      <div className="h-[9rem] w-full flex justify-center items-center">
        <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th colSpan={4} className="px-4 border-4 border-gray-800 bg-slate-950 bg-opacity-40">Final Assessment</th>
            </tr>
            <tr>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">FA UUID</th>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Date</th>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Passed</th>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Conducted By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center border-y-2 border-gray-800">fd646ca2-ebe5-4d9a-9e78-e3d82bf0d8b6</td>
              <td className="text-center border-y-2 border-gray-800">07/19/2024</td>
              <td className="text-center border-y-2 border-gray-800 bg-red-600"></td>
              <td className="text-center border-y-2 border-gray-800">Nikolai Svensson</td>
            </tr>
          </tbody>
        </table>
      </div>      

      {/* Independent Sign Off				 */}
      <div className="h-[6rem] w-full flex justify-center items-center">
        <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th colSpan={3} className="px-4 border-4 border-gray-800 bg-slate-950 bg-opacity-40">Independent Sign Off</th>
            </tr>
            <tr>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">ISO UUID</th>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Date</th>
              <th className="text-center border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Conducted By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center border-y-2 border-gray-800">fd646ca2-ebe5-4d9a-9e78-e3d82bf0d8b6</td>
              <td className="text-center border-y-2 border-gray-800">07/19/2024</td>
              <td className="text-center border-y-2 border-gray-800">Nikolai Svensson</td>
            </tr>
          </tbody>
        </table>
      </div>   
    </div>
  )
}

export default ODP;