"use client"

import { Button } from '@/components/ui/button';
import ToolIcon from '@/svgs/tool';
import TablePlusIcon from '@/svgs/table-plus';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddNewTrainingOfficer from './tools/AddNewTrainingOfficer';

const SeniorsTools: React.FC = () => {
  return (
    <div className="h-[3rem] w-[90%] flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='py-1 px-2 gap-1'><ToolIcon height={16} width={16}/>Senior Tools</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>TO Management</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <AddNewTrainingOfficer/>
        </DropdownMenuContent>  
      </DropdownMenu>
    </div>
  );
}

export default SeniorsTools;