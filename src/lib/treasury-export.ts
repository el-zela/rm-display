import type { Database } from '@/integrations/supabase/types';
import { totals } from './church-permissions';
type Entry=Database['public']['Tables']['treasury_transactions']['Row'];
export async function exportTreasury(format:'pdf'|'excel',rows:Entry[],currency:string,opening=0){
  const title='Treasury Financial & Collection Report';
  const selected=rows.filter(r=>r.currency===currency);
  const head=['Date','Type','Category','Name / Payee','Reference','Status',`Amount (${currency})`];
  const body=selected.map(r=>[r.transaction_date,r.kind,r.category,r.counterparty,r.reference,r.status,Number(r.amount)]);
  const summary=totals(rows,currency);
  const subtotal=Object.entries(selected.filter(r=>['approved','synced'].includes(r.status)).reduce<Record<string,number>>((acc,r)=>{const key=`${r.kind} · ${r.category}`;acc[key]=(acc[key]??0)+Number(r.amount);return acc;},{}));
  const summaryRows=[['Opening balance',opening],['Online RM',summary.online],['Manual collections',summary.manual],['Approved expenses',summary.expenses],['Conference remittances',summary.remittances],['Closing balance',summary.balance+opening],...subtotal];
  const image=await new Promise<HTMLImageElement|null>(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src='/sdaLogo.png';});
  if(format==='pdf'){
    const [{jsPDF},{default:autoTable}]=await Promise.all([import('jspdf'),import('jspdf-autotable')]);const doc=new jsPDF({orientation:'landscape'});
    if(image)doc.addImage(image,'PNG',139,9,18,18);
    doc.setTextColor(22,56,74);doc.setFontSize(14);doc.text('Seventh Day Adventist Church',148.5,34,{align:'center'});doc.setFontSize(11);doc.text('Chuo Kikuu',148.5,40,{align:'center'});doc.text(title,148.5,47,{align:'center'});
    autoTable(doc,{startY:54,head:[head],body,headStyles:{fillColor:[22,56,74]},styles:{fontSize:8}});
    doc.addPage();doc.text(`${currency} · Totals and category subtotals`,14,16);autoTable(doc,{startY:23,head:[['Summary',`Amount (${currency})`]],body:summaryRows,headStyles:{fillColor:[217,163,0],textColor:[22,56,74]}});doc.save('treasury-financial-report.pdf');
  }else{
    const XLSX=await import('xlsx');const sheet=XLSX.utils.aoa_to_sheet([['Seventh Day Adventist Church'],['Chuo Kikuu'],[title],[],head,...body,[],['Summary',`Amount (${currency})`],...summaryRows]);sheet['!cols']=head.map(()=>({wch:24}));sheet['!merges']=[0,1,2].map(r=>({s:{r,c:0},e:{r,c:6}}));const book=XLSX.utils.book_new();XLSX.utils.book_append_sheet(book,sheet,'Treasury');XLSX.writeFile(book,'treasury-financial-report.xlsx');
  }
}