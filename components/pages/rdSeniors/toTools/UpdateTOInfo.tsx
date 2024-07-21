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
import { useEffect, useState } from 'react';
import type { TrainingOfficers } from "@prisma/client";
import TableOptionsIcon from '@/svgs/table-options';
import updateTrainingOfficer from "./toActions";
import { fromBinaryUUID } from 'binary-uuid';

interface UpdateTOInfoProps {
  trainingOfficer: TrainingOfficers;
}

const fields = [
  {
    name: "trainingOfficerName",
    label: "TO's Name:",
    placeholder: "Enter name",
  },
  {
    name: "trainingOfficerCitizenID",
    label: "TO's Citizen ID:",
    placeholder: "Enter citizen ID",
  },
  {
    name: "trainingOfficerForumID",
    label: "TO's Forum ID:",
    placeholder: "Enter forum ID",
  },
  {
    name: "trainingOfficerDiscordID",
    label: "TO's Discord ID:",
    placeholder: "Enter discord ID",
  }
]

type SubmitButtonProps = {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
};

function SubmitButton({ setVisibility, buttonText }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  useEffect(() => {
    if (pending) setVisibility(false)
  }, [pending])

  return (
    <Button variant="positive" type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>: buttonText}
    </Button>
  )
}

const initialState = {
  message: "",
  success: true
}

const UpdateTOInfo: React.FC<UpdateTOInfoProps> = ({ trainingOfficer }: { [key: string]: any; }) => {
  const [state, formAction] = useFormState(updateTrainingOfficer, initialState);
  const [visible, setVisibility] = useState(false)

  console.log(trainingOfficer);

  return (
    <Dialog open={visible} onOpenChange={setVisibility}>
      <DialogTrigger asChild>    
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <TableOptionsIcon height={16} width={16} className="mr-2"/> Edit Information
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Training Officer Information</DialogTitle>
          <DialogDescription>
            All fields are required.
          </DialogDescription>
        </DialogHeader>
      <form className="grid grid-cols-2 gap-y-2 gap-x-4" action={formAction}>
        {fields.map((obj) => {
          return (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor={obj.name}>{obj.label}</label>
              <Input minLength={3} type="text" id={obj.name} name={obj.name} placeholder={obj.placeholder} defaultValue={trainingOfficer[obj.name]} required/>
              <input type="text" id={"trainingOfficerUUID"} name={"trainingOfficerUUID"} defaultValue={fromBinaryUUID(Buffer.from(trainingOfficer.trainingOfficerUUID.data))} hidden/>
              <input type="text" id={"columnIndex"} name={"columnIndex"} defaultValue={trainingOfficer.columnIndex} hidden/>
            </div>
          );
        })}
          <div className="col-span-2 w-auto flex justify-center align-middle">
            <SubmitButton setVisibility={setVisibility} buttonText="Submit Change"/>
          </div>
      </form>

      </DialogContent>
    </Dialog>
  );
}

export default UpdateTOInfo;