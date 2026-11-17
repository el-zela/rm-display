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
    const {default:ExcelJS}=await import('exceljs');const book=new ExcelJS.Workbook();const sheet=book.addWorksheet('Treasury');
    sheet.columns=head.map(()=>({width:24}));sheet.addRows([[],[],[],[],['Seventh Day Adventist Church'],['Chuo Kikuu'],[title],[],head,...body,[],['Summary',`Amount (${currency})`],...summaryRows]);
    for(const n of [5,6,7]){sheet.mergeCells(n,1,n,7);const cell=sheet.getCell(n,1);cell.alignment={horizontal:'center'};cell.font={bold:true,size:n===5?16:12,color:{argb:'FF16384A'}};}
    if(image){const response=await fetch('/sdaLogo.png');const buffer=await response.arrayBuffer();const imageId=book.addImage({buffer,extension:'png'});sheet.addImage(imageId,{tl:{col:3,row:0},ext:{width:65,height:65}});}
    for(const n of [9,11+body.length]){sheet.getRow(n).eachCell(cell=>{cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:n===9?'FF16384A':'FFD9A300'}};cell.font={bold:true,color:{argb:n===9?'FFFFFFFF':'FF16384A'}};});}
    const buffer=await book.xlsx.writeBuffer();const url=URL.createObjectURL(new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));const link=document.createElement('a');link.href=url;link.download='treasury-financial-report.xlsx';link.click();URL.revokeObjectURL(url);
  }
}