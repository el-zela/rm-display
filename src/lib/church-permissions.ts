export type Module = 'RM' | 'TREASURY' | 'ADMIN';
export function hasModuleAccess(permissions: string[], module: Module, active = true) {
  return active && (module === 'RM' ? permissions.includes('rm_view') : module === 'TREASURY' ? permissions.includes('treasury_view') : permissions.includes('manage_users') || permissions.includes('manage_roles'));
}
export function canApprove(permissions: string[], actor: string, entry: { created_by: string; status: string }) {
  return permissions.includes('treasury_approve') && entry.status === 'pending_approval' && actor !== entry.created_by;
}
export function totals(rows: { kind: string; amount: number; currency: string; status: string }[], currency: string) {
  const sum = (kind: string) => rows.filter(r => r.currency === currency && r.kind === kind && ['approved','synced'].includes(r.status)).reduce((a,r) => a + Number(r.amount),0);
  const online = sum('online_rm'), manual = sum('collection'), expenses = sum('expense'), remittances = sum('remittance');
  return { online, manual, expenses, remittances, balance: online + manual - expenses - remittances };
}