import { createFileRoute } from "@tanstack/react-router";
import GuestDashboard from "@/pages/GuestDashboard";
import { churchHead } from '@/lib/church-head';

export const Route = createFileRoute("/guest-dashboard")({
  head:()=>churchHead('Guest contributions','Guest contributions for SDA Chuo Kikuu.'),
  component: GuestDashboard,
});
