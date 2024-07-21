"use server";

import Login from "@/components/pages/mainPage/login";
import ODPHeader from "@/components/pages/r&d/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { getSession, login } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toBinaryUUID } from "binary-uuid";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Home: React.FC<{ searchParams: { redirect?: string | undefined } }> = async ({ searchParams }) => {
  return (
    <Login searchParams={searchParams}/>
  );
}

export default Home;