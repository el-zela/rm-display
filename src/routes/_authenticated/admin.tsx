import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/church/Workspace';
import { UserAccessManagement } from '@/components/admin/UserAccessDrawer';
import { churchHead } from '@/lib/church-head';
export const Route=createFileRoute('/_authenticated/admin')({head:()=>churchHead('User & Access Management','Manage church staff access and review administrative changes.'),component:()=> <Workspace module="ADMIN" title="User & Access Management"><UserAccessManagement/></Workspace>});