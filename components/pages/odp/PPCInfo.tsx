"use client";

import { Button } from "@/components/ui/button";
import { Trainees } from "@prisma/client";
import Link from "next/link";

const PPCInfo: React.FC<{ trainee: Trainees }> = ({ trainee }) => {
  return (
    <div className="h-[6rem] w-full flex justify-center items-center">
      <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
        <thead>
          <tr>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">Name:</th>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">Join Date:</th>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">Collar Number:</th>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">Character ID:</th>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">
              <Button className="font-bold text-md py-0 h-auto" asChild variant="ghost">
                <Link target="_blank" href={`https://www.roleplay.co.uk/members/a.${trainee.traineeForumID}`} className="underline">Forum Link</Link>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center border-2 border-gray-800">{trainee.traineeName}</td>
            <td className="text-center border-2 border-gray-800">{new Date(trainee.joinDate).toDateString()}</td>
            <td className="text-center border-2 border-gray-800">{trainee.traineeCollarNumber}</td>
            <td className="text-center border-2 border-gray-800">{trainee.traineeCitizenID}</td>
            <th className="px-4 border-2 border-gray-800 bg-slate-950 bg-opacity-40">
              <Button className="font-bold text-md py-0 h-auto" asChild variant="ghost">
                <Link target="_blank" href={`https://discord.com/users/${trainee.traineeDiscordID}`} className="underline">Discord Link</Link>
              </Button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PPCInfo;