import React from 'react';
import Header from '../r&d/Header';
import { prisma } from '@/lib/prisma';
import { TORole } from '@prisma/client';
import SeniorsTools from './SeniorsTools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TOActionsDropdown from './toTools/TOActionsDropdown';

export const TORoleExp = 
  [["Command", "CMD"], ["Advanced Training Officer", "ATO"], ["Training Officer", "TO"], 
   ["Training Officer in Training", "TiT"], ["AP Assessor", "AP"], ["Reserves", "RSV"]];

const Seniors: React.FC = () => {
  return (
    <div 
      className="relative z-10 flex flex-col items-center w-[70rem] h-[95%]  pt-16 pb-4 gap-2 bg-slate-900 rounded-md border-slate-950 border-2 overflow-auto genericScrollBar"
    >
      <Header header1="Senior Officer Database" header2="Recruitment and Development" />
      
      {/* Senior Tools */}
      <SeniorsTools />

      <div className="h-[45rem] w-full flex flex-col gap-4 items-center">
        <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th colSpan={6} className="px-4 border-t-4 border-gray-800 bg-slate-950 bg-opacity-40 text-3xl">Training Officer Roster</th>
            </tr>
            <tr>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Name</th>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Auth Code</th>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Citizen ID</th>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Discord Link</th>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Forum Link</th>
              <th className="px-4 border-b-4 border-gray-800 bg-slate-950 bg-opacity-40 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              TORoleExp.map(async ([roleName, roleEnum]) => {
                let elements = new Array();
                elements.push(
                  <tr>  
                    <th colSpan={6} className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">{roleName}</th>
                  </tr>
                )

                const officers = await prisma.trainingOfficers.findMany({
                  where: {
                    trainingOfficerRole: roleEnum as TORole
                  }
                });

                officers.forEach((officer) => {
                  elements.push(
                    <tr>
                      <td className="px-4 border-y-2 border-gray-800 text-center">{officer.trainingOfficerName}</td>
                      <td className="px-4 border-y-2 border-gray-800 text-center">{officer.authCode}</td>
                      <td className="px-4 border-y-2 border-gray-800 text-center">{officer.trainingOfficerCitizenID}</td>
                      <td className="px-4 border-y-2 border-gray-800 text-center">
                        <Button className="font-bold text-md py-0 h-auto" asChild variant="ghost">
                          <Link target="_blank" href={`https://discord.com/users/${officer.trainingOfficerDiscordID}`} className="underline">Discord Link</Link>
                        </Button>
                      </td>
                      <td className="px-4 border-y-2 border-gray-800 text-center">
                        <Button className="font-bold text-md py-0 h-auto" asChild variant="ghost">
                          <Link target="_blank" href={`https://www.roleplay.co.uk/members/a.${officer.trainingOfficerForumID}`} className="underline">Forum Link</Link>
                        </Button>
                      </td>
                      <td className="px-4 border-y-2 border-gray-800 text-center">
                        <TOActionsDropdown trainingOfficer={JSON.parse(JSON.stringify(officer))}/>
                      </td>
                    </tr>
                  )
                });

                return elements;
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seniors;