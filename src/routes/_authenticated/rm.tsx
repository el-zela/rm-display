import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/church/Workspace';
import { Contributions } from '@/components/church/Contributions';
import { churchHead } from '@/lib/church-head';
export const Route=createFileRoute('/_authenticated/rm')({head:()=>churchHead('Resource Mobilization','Verified online church contributions and collection progress.'),component:()=> <Workspace module="RM" title="Resource Mobilization"><Contributions staff/></Workspace>});