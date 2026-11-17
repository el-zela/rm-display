import { createFileRoute,Link } from "@tanstack/react-router";
import { churchHead } from '@/lib/church-head';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute("/")({
  head:()=>churchHead('Church workspace','Resource Mobilization and Treasury for Seventh Day Adventist Church, Chuo Kikuu.'),
  component:()=> <main className="grid min-h-screen place-items-center px-6"><div className="text-center"><img className="mx-auto mb-6 h-20 w-20 rounded-lg bg-primary p-3 object-contain" src="/sdaLogo.png" alt="SDA church logo"/><h1 className="text-3xl text-primary">Seventh Day Adventist Church</h1><p className="mt-3 text-muted-foreground">Chuo Kikuu</p><Button asChild className="mt-8"><Link to="/auth">Open church workspace</Link></Button></div></main>,
});
