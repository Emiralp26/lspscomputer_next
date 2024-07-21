"use client";

import TablePlusIcon from '@/svgs/table-plus';
import { DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { addNewTrainingOfficer } from './seniorsActions';
import { useEffect, useState } from 'react';

const fields = [
  {
    name: "trainingOfficerName",
    label: "New TO's Name:",
    placeholder: "Enter TiT's Name",
  },
  {
    name: "trainingOfficerCitizenID",
    label: "New TO's Citizen ID:",
    placeholder: "Enter TiT's Citizen ID",
  },
  {
    name: "trainingOfficerForumID",
    label: "New TO's Forum ID:",
    placeholder: "Enter TiT's Forum ID",
  },
  {
    name: "trainingOfficerDiscordID",
    label: "New TO's Discord ID:",
    placeholder: "Enter TiT's Discord ID",
  }
]

type SubmitButtonProps = {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

function SubmitButton({ setVisibility }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  useEffect(() => {
    if (pending) setVisibility(false)
  }, [pending])

  return (
    <Button variant="positive" type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>: "Add New Training Officer"}
    </Button>
  )
}

const initialState = {
  message: "",
  success: true
}

const AddNewTrainingOfficer: React.FC = () => {
  const [state, formAction] = useFormState(addNewTrainingOfficer, initialState);
  const [visible, setVisibility] = useState(false)

  return (
    <Dialog open={visible} onOpenChange={setVisibility}>
      <DialogTrigger asChild>    
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <TablePlusIcon height={16} width={16} className="mr-2"/> Add New Training Officer
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Training Officer</DialogTitle>
          <DialogDescription>
            All fields are required.
          </DialogDescription>
        </DialogHeader>
      <form className="grid grid-cols-2 gap-y-2 gap-x-4" action={formAction}>
        {fields.map((obj) => {
          return (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor={obj.name}>{obj.label}</label>
              <Input minLength={3} type="text" id={obj.name} name={obj.name} placeholder={obj.placeholder} required/>
            </div>
          );
        })}

          <div className="col-span-2 w-auto flex justify-center align-middle">
            <SubmitButton setVisibility={setVisibility} />
          </div>
      </form>

      </DialogContent>
    </Dialog>
  );
}

export default AddNewTrainingOfficer;