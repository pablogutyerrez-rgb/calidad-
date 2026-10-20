import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const temp = await mkdtemp(join(tmpdir(), 'cm-pue-porta-'));
const port = 5200 + Math.floor(Math.random() * 400);
const base = `http://127.0.0.1:${port}`;
const password = 'Pue-porta-test-2026';
const app = spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs', 'server.ts'], {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV:'production', PORT:String(port), SQLITE_PATH:join(temp,'test.sqlite'), INITIAL_ADMIN_PASSWORD:password, REQUIRE_SUPABASE:'false', SUPABASE_DATABASE_URL:'', SUPABASE_URL:'', SUPABASE_SECRET_KEY:'', ALLOW_GOOGLE_SHEETS_FALLBACK:'false', GOOGLE_SHEET_ID:'', GOOGLE_DRIVE_FOLDER_ID:'', GOOGLE_CLIENT_ID:'', GOOGLE_CLIENT_SECRET:'', GOOGLE_REFRESH_TOKEN:'', GMAIL_CLIENT_ID:'', GMAIL_CLIENT_SECRET:'', GMAIL_REFRESH_TOKEN:'' },
  stdio:'ignore'
});
const api = async (path, token, method='GET', body) => {
  const response=await fetch(base+path,{method,headers:{...(token?{Authorization:`Bearer ${token}`}:{ }),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
  return {status:response.status,body:await response.json()};
};
try {
  let ready=false;
  for(let i=0;i<100;i++){try{ready=(await fetch(`${base}/api/health`)).ok;}catch{}if(ready)break;await new Promise(done=>setTimeout(done,100));}
  assert.ok(ready,'Servidor de prueba no inició.');
  const login=await api('/api/auth/login',null,'POST',{identity:'admin',password});
  assert.equal(login.status,200);
  const token=login.body.token;
  const repository=(await api('/api/shared-repository',token)).body.repository;
  const campaign=repository.campaigns.find(item=>item.name==='Portabilidad Bitel');
  assert.ok(campaign);
  assert.equal(campaign.qualityGuidelines.length,9);
  assert.deepEqual(campaign.qualityCriterionWeights,{C1:.2,C2:.3,C3:.3,C4:.2});
  const operation=repository.operations.find(item=>item.campaignId===campaign.id&&!item.legacy&&item.status==='ACTIVA');
  assert.ok(operation);
  const advisor={id:'adv_pue_porta_test',dni:'99000881',employeeCode:'PUE-PORTA',name:'Asesora PUE Portabilidad',campaignId:campaign.id,operationId:operation.id,supervisorId:'usr_admin',status:'ACTIVO',active:true};
  const synced=await api('/api/shared-repository/sync',token,'PUT',{...repository,advisors:[...repository.advisors,advisor]});
  assert.equal(synced.status,200,JSON.stringify(synced.body));
  const evaluation=(id,saleResult,change={})=>({id,advisorId:advisor.id,evaluatorId:'usr_admin',campaignId:campaign.id,evaluationType:'QUALITY',date:'2026-10-20',time:'10:30',callId:id,saleResult,scoreTotal:1,technicalScore:1,items:campaign.qualityGuidelines.map(item=>({criterionId:item.id,compliance:item.id==='pb_3_3'&&saleResult==='NO_VENTA'?'NO_APLICA':'CUMPLE',finding:'Se verificó en la llamada.'})),...change});
  const full=await api('/api/evaluations',token,'POST',evaluation('pue_full','VENTA_CONCRETADA'));
  assert.equal(full.status,201,JSON.stringify(full.body));
  assert.equal(full.body.evaluation.scoreTotal,100,'El servidor recalcula, no acepta la nota forjada.');
  assert.equal(full.body.evaluation.qualityResult,'APROBADA');
  const partial=evaluation('pue_one_fail','VENTA_CONCRETADA');
  partial.items[0].compliance='NO_CUMPLE';
  const partialResult=await api('/api/evaluations',token,'POST',partial);
  assert.equal(partialResult.status,201,JSON.stringify(partialResult.body));
  assert.equal(partialResult.body.evaluation.scoreTotal,90);
  const below=evaluation('pue_below','VENTA_CONCRETADA');
  for(const id of ['pb_1_1','pb_2_1','pb_3_1'])below.items.find(item=>item.criterionId===id).compliance='NO_CUMPLE';
  const belowResult=await api('/api/evaluations',token,'POST',below);
  assert.equal(belowResult.status,201,JSON.stringify(belowResult.body));
  assert.equal(belowResult.body.evaluation.scoreTotal,65);
  assert.equal(belowResult.body.evaluation.qualityResult,'REPROBADA');
  const critical=evaluation('pue_critical','VENTA_CONCRETADA');
  critical.items.find(item=>item.criterionId==='pb_2_2').compliance='NO_CUMPLE';
  const criticalResult=await api('/api/evaluations',token,'POST',critical);
  assert.equal(criticalResult.status,201,JSON.stringify(criticalResult.body));
  assert.equal(criticalResult.body.evaluation.scoreTotal,0);
  assert.equal(criticalResult.body.evaluation.qualityResult,'REPROBADA');
  const noSale=await api('/api/evaluations',token,'POST',evaluation('pue_no_sale','NO_VENTA'));
  assert.equal(noSale.status,201,JSON.stringify(noSale.body));
  assert.equal(noSale.body.evaluation.scoreTotal,100);
  const edited=await api('/api/admin/evaluations/pue_no_sale',token,'PATCH',{comments:'Seguimiento posterior.'});
  assert.equal(edited.status,200,JSON.stringify(edited.body));
  const missing=evaluation('pue_missing','VENTA_CONCRETADA');missing.items[0].finding='';
  assert.equal((await api('/api/evaluations',token,'POST',missing)).status,400);
  console.log('PUE Portabilidad Bitel: 9 atributos, pesos, nota, crítico, No Aplica y observaciones verificados.');
} finally {
  app.kill();
  await new Promise(done=>setTimeout(done,400));
  const safe=resolve(temp);
  if(dirname(safe)===resolve(tmpdir())&&basename(safe).startsWith('cm-pue-porta-'))await rm(safe,{recursive:true,force:true,maxRetries:8,retryDelay:200});
}
