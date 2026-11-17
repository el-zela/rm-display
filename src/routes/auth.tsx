import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { lovable } from '@/integrations/lovable';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { churchHead } from '@/lib/church-head';

export const Route = createFileRoute("/auth")({
  head:()=>churchHead('Sign in','Sign in to the SDA Chuo Kikuu church workspace.'),
  component: Auth,
});

function Auth(){const navigate=useNavigate(),[busy,setBusy]=useState(false),[error,setError]=useState('');useEffect(()=>{void supabase.auth.getUser().then(({data})=>{if(data.user)void navigate({to:'/dashboard',replace:true});});},[navigate]);const login=async(provider:'google'|'lovable')=>{setBusy(true);setError('');try{const result=await lovable.auth.signInWithOAuth(provider,{redirect_uri:`${window.location.origin}/auth`});if(result.error)throw result.error;const {data}=await supabase.auth.getUser();if(data.user)await navigate({to:'/dashboard',replace:true});}catch(e){setError(e instanceof Error?e.message:'Sign-in failed');}finally{setBusy(false);}};return <main className="flex min-h-screen flex-col items-center justify-center px-6"><img src="/sdaLogo.png" alt="SDA church logo" className="mb-6 h-20 w-20 object-contain"/><h1 className="text-center text-3xl text-primary">Seventh Day Adventist Church</h1><p className="mt-2 text-muted-foreground">Chuo Kikuu</p><div className="mt-10 w-full max-w-sm space-y-3"><Button className="h-12 w-full" disabled={busy} onClick={()=>login('google')}>Continue with Google</Button><Button variant="outline" className="h-12 w-full" disabled={busy} onClick={()=>login('lovable')}>Sign in with Lovable</Button>{error&&<p role="alert" className="text-sm text-destructive">{error}</p>}</div></main>;}
