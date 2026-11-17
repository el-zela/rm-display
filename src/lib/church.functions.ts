import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';

export const getUserRbacContext = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: profile, error } = await context.supabase.from('profiles').select('*').eq('id',context.userId).single();
  if(error) throw new Error('Your church profile is unavailable.');
  const { data: assignments } = await context.supabase.from('rbac_user_roles').select('role_key').eq('user_id',context.userId);
  const roles = (assignments ?? []).map(r=>r.role_key).filter((r): r is string=>Boolean(r));
  const { data: permissions } = await context.supabase.from('rbac_role_permissions').select('permission_key').in('role_key',roles);
  return { profile, userId: context.userId, roles, active: profile.active, permissions: profile.active ? (permissions ?? []).map(p=>p.permission_key).filter((p): p is string=>Boolean(p)) : [] };
});

export const getTreasury = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed } = await context.supabase.rpc('has_permission',{p_key:'treasury_view'});
  if(!allowed) throw new Error('Treasury access denied');
  const { data: transactions, error } = await context.supabase.from('treasury_transactions').select('*').order('created_at',{ascending:false});
  if(error) throw new Error('Could not load the Treasury ledger.');
  const { data: accounts } = await context.supabase.from('treasury_accounts').select('*');
  const { data: audit } = await context.supabase.rpc('has_permission',{p_key:'audit_view'});
  const flags = audit ? (await context.supabase.from('treasury_audit_flags').select('*').order('created_at',{ascending:false})).data ?? [] : [];
  const logs = audit ? (await context.supabase.from('treasury_audit_logs').select('*').order('created_at',{ascending:false})).data ?? [] : [];
  return { transactions: transactions ?? [], accounts: accounts ?? [], flags, logs };
});

export const recordEntry = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({kind:z.enum(['collection','expense','remittance']),amount:z.number().positive(),currency:z.enum(['TZS','KES']),category:z.string().min(1),counterparty:z.string().trim().min(1),phone:z.string(),reference:z.string().trim().min(1),date:z.string(),notes:z.string(),attachment:z.union([z.literal(''),z.string().url().startsWith('https://')]),breakdown:z.record(z.number().nonnegative())})).handler(async ({data,context})=>{
  if(data.kind==='remittance' && Math.abs(Object.values(data.breakdown).reduce((a,b)=>a+b,0)-data.amount)>0.01) throw new Error('Remittance breakdown must equal the total.');
  const {data:id,error}=await context.supabase.rpc('record_treasury_entry',{p_kind:data.kind,p_amount:data.amount,p_currency:data.currency,p_category:data.category,p_counterparty:data.counterparty,p_phone:data.phone,p_reference:data.reference,p_date:data.date,p_notes:data.notes,p_attachment:data.attachment,p_breakdown:data.breakdown});
  if(error) throw new Error(error.message); return {id};
});
export const approveEntry=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid()})).handler(async ({data,context})=>{const {error}=await context.supabase.rpc('approve_treasury_entry',{p_id:data.id});if(error)throw new Error(error.message);return {success:true};});
export const flagEntry=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid(),note:z.string().trim().min(5),severity:z.enum(['low','medium','high'])})).handler(async ({data,context})=>{const {error}=await context.supabase.rpc('flag_treasury_entry',{p_id:data.id,p_note:data.note,p_severity:data.severity});if(error)throw new Error(error.message);return {success:true};});
export const getAccessManagement=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async ({context})=>{
  const {data:allowed}=await context.supabase.rpc('has_permission',{p_key:'manage_users'});if(!allowed)throw new Error('Access denied');
  const [users,roles,permissions,assignments,logs]=await Promise.all([context.supabase.from('profiles').select('*'),context.supabase.from('rbac_roles').select('*'),context.supabase.from('rbac_role_permissions').select('*'),context.supabase.from('rbac_user_roles').select('*'),context.supabase.from('rbac_audit_logs').select('*').order('created_at',{ascending:false}).limit(100)]);
  if(users.error)throw new Error('Could not load users'); return {users:users.data??[],roles:roles.data??[],permissions:permissions.data??[],assignments:assignments.data??[],logs:logs.data??[]};
});
export const saveAccess=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({userId:z.string().uuid(),role:z.string(),active:z.boolean()})).handler(async ({data,context})=>{const {error}=await context.supabase.rpc('set_user_access',{p_user:data.userId,p_role:data.role,p_active:data.active});if(error)throw new Error(error.message);return {success:true};});
export const getContributions=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async ({context})=>{const {data,error}=await context.supabase.from('rm_contributions').select('*').order('created_at',{ascending:false});if(error)throw new Error('Could not load contributions');return data??[];});