import React from 'react';
import Seniors from '@/components/pages/rdSeniors/Seniors';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Page: React.FC = async () => {
  const session = await getSession();
  if (!session) redirect(`/?redirect=/rdSeniors`);
  if (session.user.trainingOfficerRole !== "CMD") redirect(`/`);

  return (
    <Seniors />
  );
};

export default Page;