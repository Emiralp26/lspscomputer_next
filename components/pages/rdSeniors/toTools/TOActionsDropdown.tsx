"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TableOptionsIcon from "@/svgs/table-options";
import type { TrainingOfficers } from "@prisma/client";
import UpdateTOInfo from "./UpdateTOInfo";

interface TOActionsDropdownProps {
  trainingOfficer: TrainingOfficers;
}

const TOActionsDropdown: React.FC<TOActionsDropdownProps> = ({trainingOfficer}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="py-1 my-1 px-2 h-auto"><TableOptionsIcon height={16} width={16} className="mr-2"/>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>TO Management</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* <AddNewTrainingOfficer/> */}
        <UpdateTOInfo trainingOfficer={trainingOfficer}/>
      </DropdownMenuContent>  
    </DropdownMenu>
  );
};

export default TOActionsDropdown;