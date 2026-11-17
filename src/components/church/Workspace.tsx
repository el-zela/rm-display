import { useEffect, type ReactNode } from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { Settings, LogOut, LayoutDashboard, Wallet, HeartHandshake } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getUserRbacContext } from '@/lib/church.functions';
import { hasModuleAccess, type Module } from '@/lib/church-permissions';
import { Button } from '@/components/ui/button';

export function useChurchAccess(){ const fetch=useServerFn(getUserRbacContext); return useQuery({queryKey:['church-access'],queryFn:()=>fetch(),refetchInterval:15000,refetchOnWindowFocus:true}); }
export function Workspace({children,module,title}:{children:ReactNode;module?:Module;title:string}){
  const access=useChurchAccess(),navigate=useNavigate(),cache=useQueryClient(),router=useRouter();
  useEffect(()=>{if(access.isError || (access.data && module && !hasModuleAccess(access.data.permissions,module,access.data.active))){toast.error('You do not have access to this module.');void navigate({to:'/dashboard',replace:true});}},[access.isError,access.data,module,navigate]);
  if(access.isPending)return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading church workspace…</div>;
  if(!access.data)return <div className="grid min-h-screen place-items-center"><Button asChild><Link to="/auth">Sign in</Link></Button></div>;
  const {permissions,profile,active}=access.data;
  const signOut=async()=>{await cache.cancelQueries();cache.clear();await supabase.auth.signOut();await navigate({to:'/auth',replace:true});void router.invalidate();};
  return <div className="min-h-screen bg-background"><header className="border-b bg-card"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4"><Link to="/dashboard" className="flex items-center gap-3"><img src="/sdaLogo.png" alt="SDA church logo" className="h-11 w-11 object-contain"/><div><div className="text-sm font-semibold text-primary">Seventh Day Adventist Church</div><div className="text-xs text-muted-foreground">Chuo Kikuu</div></div></Link><div className="flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:block">{profile.full_name || 'Church member'}</span><Button variant="ghost" size="icon" title="Sign out" aria-label="Sign out" onClick={signOut}><LogOut/></Button></div></div></header><nav className="border-b bg-card/80"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-2"><Button variant="ghost" asChild><Link to="/dashboard"><LayoutDashboard/>Dashboard</Link></Button>{hasModuleAccess(permissions,'RM',active)&&<Button variant="ghost" asChild><Link to="/rm"><HeartHandshake/>RM Module</Link></Button>}{hasModuleAccess(permissions,'TREASURY',active)&&<Button variant="ghost" asChild><Link to="/treasury"><Wallet/>Treasury</Link></Button>}{hasModuleAccess(permissions,'ADMIN',active)&&<Button variant="ghost" asChild><Link to="/admin"><Settings/>User & Access</Link></Button>}</div></nav><main className="mx-auto max-w-7xl px-5 py-9"><div className="mb-7"><p className="mb-2 text-xs font-semibold uppercase text-gold-dark">Chuo Kikuu · Church workspace</p><h1 className="text-3xl text-primary">{title}</h1></div>{!active?<p className="text-destructive">Your account is inactive. Contact a church administrator.</p>:module&&!hasModuleAccess(permissions,module,active)?null:children}</main></div>;
}