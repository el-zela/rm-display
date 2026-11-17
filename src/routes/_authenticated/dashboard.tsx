import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/church/Workspace';
import { Contributions } from '@/components/church/Contributions';
import { churchHead } from '@/lib/church-head';
export const Route=createFileRoute('/_authenticated/dashboard')({head:()=>churchHead('Dashboard','Your SDA Chuo Kikuu contribution dashboard and available church modules.'),component:()=> <Workspace title="Church dashboard"><Contributions/></Workspace>});