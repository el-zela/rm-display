import {describe,it,expect} from 'vitest';
import {hasModuleAccess,canApprove,totals} from './church-permissions';
describe('module boundaries',()=>{
  it('RM Admin cannot access Treasury',()=>expect(hasModuleAccess(['rm_view','rm_export'],'TREASURY')).toBe(false));
  it('inactive users cannot access modules',()=>expect(hasModuleAccess(['treasury_view'],'TREASURY',false)).toBe(false));
  it('assistant cannot approve own expense',()=>expect(canApprove(['treasury_view','expense_record'],'assistant',{created_by:'assistant',status:'pending_approval'})).toBe(false));
  it('treasurer cannot approve their own pending entry',()=>expect(canApprove(['treasury_approve'],'treasurer',{created_by:'treasurer',status:'pending_approval'})).toBe(false));
  it('treasurer can approve another author',()=>expect(canApprove(['treasury_approve'],'treasurer',{created_by:'assistant',status:'pending_approval'})).toBe(true));
  it('auditor cannot approve',()=>expect(canApprove(['treasury_view','audit_view','audit_flag'],'auditor',{created_by:'assistant',status:'pending_approval'})).toBe(false));
  it('approved balance excludes pending entries and other currencies',()=>expect(totals([{kind:'collection',amount:500,currency:'TZS',status:'approved'},{kind:'expense',amount:100,currency:'TZS',status:'approved'},{kind:'remittance',amount:50,currency:'TZS',status:'approved'},{kind:'collection',amount:999,currency:'TZS',status:'pending_approval'},{kind:'collection',amount:900,currency:'KES',status:'approved'}],'TZS').balance).toBe(350));
});