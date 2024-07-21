"use client";

import { Input } from "@/components/ui/input";
import ODPHeader from "../r&d/Header";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { login } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant="positive" type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>: "Login"}
    </Button>
  )
}

const initialState = {
  message: "",
  success: true
}

type LoginProps = {
  searchParams: {
    redirect?: string | undefined;
  };
};

const Login: React.FC<LoginProps> = ({ searchParams }) => {
  const [state, formAction] = useFormState(login, initialState);
  // toast("Failed to login. Check your authorization code.")

  useEffect(() => {
    if (state?.success !== undefined && !state?.success) toast("Failed to login. Check your authorization code.")
  }, [state])
  
  return (
    <div 
      className="relative z-10 flex flex-col items-center w-[41.5rem] h-[24rem] pt-16 pb-4 gap-2 bg-slate-900 rounded-md border-slate-950 border-2 overflow-auto genericScrollBar"
    >
      <ODPHeader header1="Police Database" header2="Recruitment & Development"/>
      <div className="relative text-white/75 w-[90%] h-[6rem] font-light text-sm">
        Please enter your authorization code below. If you do not have an authorization code reach out to a recruitment and development senior for assistance.
      </div>

      <div className="relative text-white w-[60%] h-[6rem] font-light text-sm">
        <form 
          className="flex flex-col items-center"
          action={formAction}
        >
          <Input type="password" id="authCode" name="authCode" maxLength={19} placeholder="LSPS-XXXX-XXXX-XXXX"/>
          <input type="text" id="redirect" name="redirect" defaultValue={searchParams.redirect} hidden />
          <br />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

export default Login;