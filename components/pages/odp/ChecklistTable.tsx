"use client";

import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { items } from "../../ui/checklistItems";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const initialState = {
  message: ""
}

function SubmitButton({disabled}: any) {
  const { pending } = useFormStatus() || disabled;

  return (
    <Button variant="positive" type="submit" disabled={pending || disabled}>
      {(pending) ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>: "Submit Statement"}
    </Button>
  )
}

import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { submitTOStatement } from "../toStatement/actions";

type ODPWithData = Prisma.ODPGetPayload<{
  include: { trainee: true }
}>

type Submission = {
  taskName: string;
  grade?: number;
  grader?: string;
  submissionRow?: number;
  tasks?: string;
  note?: string;
}

const ChecklistTable: React.FC<{ odp: ODPWithData, toStatementGenerator?: boolean }> = ({ odp, toStatementGenerator }) => {
  const [tasks, setTasks] = useState({}) as any;
  const [state, formAction] = useActionState(submitTOStatement, initialState);

  const editNotes = (e: ChangeEvent<HTMLTextAreaElement>, indexedItem: Submission) => {
    if (indexedItem.taskName) {
      setTasks((oldVal: { [key: string]: object; }) => {
        return {
          ...oldVal,
          [indexedItem.taskName]: {...oldVal[indexedItem.taskName], note: e.target.value}
        };
      })
    }
  }

  const editGrade = (e: string, indexedItem: Submission) => {
    if (indexedItem.taskName) {
      setTasks((oldVal: { [key: string]: object; }) => {
        return {
          ...oldVal,
          [indexedItem.taskName]: {...oldVal[indexedItem.taskName], grade: e}
        };
      })
    }
  }

  return (
    <div className="h-[45rem] w-full flex flex-col gap-4 items-center">
      <table className="text-white w-[90%] border-collapse border-4 border-gray-800">
        <thead>
          <tr>
            <th colSpan={5} className="px-4 border-4 border-gray-800 bg-slate-950 bg-opacity-40">Independent Patrol Checklist</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((elem) => {
              let elements = new Array();
              
              elements.push(
                <tr>  
                  <th className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">{Object.keys(elem)[0]}</th>
                  <th className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Passed</th>
                  <th className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Evidence ID</th>
                  <th className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Grade</th>
                  <th className="px-4 border-y-2 border-gray-800 bg-slate-950 bg-opacity-40">Marked By</th>
                </tr>
              )
              
              // let submission = JSON.parse(odp.checklist as string) as any;
              let submission = odp.checklist as Prisma.JsonObject;
              Object.values(elem)[0].forEach((item: string) => {
                let color = "bg-red-600";
                let grade = "";
                let grader = "";
                let submissionRow = "" as any;
                let indexedItem = submission?.[item] as Submission;
                let colorCellData = "" as any;

                if (indexedItem && indexedItem.grade !== undefined && indexedItem.grader !== undefined && indexedItem.submissionRow !== undefined) {
                  grade = indexedItem.grade.toString();
                  grader = indexedItem.grader;
                  submissionRow = indexedItem?.submissionRow.toString();

                  if (indexedItem.grade > 2) color = "bg-green-600"
                }
                
                if (toStatementGenerator) {
                  // Delete if the statement for only marking stuff that is not marked.
                  if (!indexedItem) indexedItem = {taskName: item} as Submission
                  colorCellData = (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="p-0 h-[90%] w-[4rem] rounded-sm">Add</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96">
                        <div className="grid gap-y-1">
                          <h2 className="font-bold leading-none text-2xl">{indexedItem.taskName}</h2>
                          <div className="flex justify-between items-center flex-row">
                            <span className="font-medium leading-none">Select Grade:</span>
                            <Select onValueChange={(e) => editGrade(e, indexedItem)}>
                              <SelectTrigger className="w-[50px] px-2 py-1">
                                <SelectValue placeholder={tasks[indexedItem.taskName]?.grade || ""}/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <span>Notes:</span>
                            <Textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => editNotes(e, indexedItem)} placeholder="Type your note here." defaultValue={tasks[indexedItem.taskName]?.note || indexedItem.note} />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                }
                elements.push(
                  <tr>
                    <td className="text-center border-y-2 border-gray-800">{item}</td>
                    <td className={cn("text-center border-y-2 border-gray-800", color)}>{colorCellData}</td>
                    <td className="text-center border-y-2 border-gray-800">{submissionRow}</td>
                    <td className="text-center border-y-2 border-gray-800">{grade}</td>
                    <td className="text-center border-y-2 border-gray-800">{grader}</td>
                  </tr>
                )
              })

              return elements
            })
          }
        </tbody>
      </table>
      {toStatementGenerator ?       
      (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="positive" size="lg" className="text-lg font-bold">Submit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Training Officer Statement</DialogTitle>
              <DialogDescription>
                Please review your TO statement below prior to submitting. Once you click submit you will automatically be directed to the trainee's ODP.
              </DialogDescription>
            </DialogHeader>

            <table className="text-white w-[90%] border-collapse border-gray-800">
              <thead>
                <tr>
                  <th className="px-4 border-b-2 border-gray-800 bg-slate-950 bg-opacity-40">Task</th>
                  <th className="px-4 border-b-2 border-gray-800 bg-slate-950 bg-opacity-40">Grade</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(tasks)?.map(( entry: any) => (
                  <tr>
                    <td className="text-center border-y-2 border-gray-800 font-light">{entry[0]}</td>
                    <td className="text-center border-y-2 border-gray-800 font-light">{entry[1].grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <DialogFooter>
              <form action={formAction}>
                <input type="text" id="data" name="data" required hidden value={JSON.stringify(tasks)}/>
                <input type="text" id="odpData" name="odpData" required hidden value={JSON.stringify(odp)}/>
                <SubmitButton disabled={Object.values(tasks).length === 0}/>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ): null}
    </div>
  )
}

export default ChecklistTable;