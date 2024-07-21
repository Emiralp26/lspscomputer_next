import TOStatement from "@/components/pages/toStatement/TOStatement"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import React from "react"

interface TOStatementProps {
  params: {
    odpUUID: string;
  };
  searchParams: {
    redirect?: string | undefined;
  };
}

const TOStatementFunction: React.FC<TOStatementProps> = async ({ params, searchParams }) => {
  if (!(await getSession())) redirect(`/?redirect=/toStatement/${params.odpUUID}`);

  return <TOStatement odpUUID={params.odpUUID} />;
}

export default TOStatementFunction;