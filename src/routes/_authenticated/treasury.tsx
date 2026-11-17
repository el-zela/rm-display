import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/church/Workspace';
import { TreasuryDashboard } from '@/components/treasury/TreasuryDashboard';
import { churchHead } from '@/lib/church-head';
export const Route=createFileRoute('/_authenticated/treasury')({head:()=>churchHead('Treasury','Church collections, expenses, remittances and financial review.'),component:()=> <Workspace module="TREASURY" title="Treasury"><TreasuryDashboard/></Workspace>});