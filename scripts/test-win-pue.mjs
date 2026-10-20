import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const temp = await mkdtemp(join(tmpdir(), 'cm-pue-win-'));
const port = 5600 + Math.floor(Math.random() * 350);
const base = `http://127.0.0.1:${port}`;
const password = 'Pue-win-test-2026';
const app = spawn(process.execPath, process.env.TEST_SERVER_BUILD === '1' ? ['dist/server.cjs'] : ['node_modules/tsx/dist/cli.mjs', 'server.ts'], {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV:'production', PORT:String(port), SQLITE_PATH:join(temp,'test.sqlite'), INITIAL_ADMIN_PASSWORD:password, REQUIRE_SUPABASE:'false', SUPABASE_DATABASE_URL:'', SUPABASE_URL:'', SUPABASE_SECRET_KEY:'', ALLOW_GOOGLE_SHEETS_FALLBACK:'false', GOOGLE_SHEET_ID:'', GOOGLE_DRIVE_FOLDER_ID:'', GOOGLE_CLIENT_ID:'', GOOGLE_CLIENT_SECRET:'', GOOGLE_REFRESH_TOKEN:'', GMAIL_CLIENT_ID:'', GMAIL_CLIENT_SECRET:'', GMAIL_REFRESH_TOKEN:'' },
  stdio:'ignore',
});
const api = async (path, token, method='GET', body) => {
  const response = await fetch(base+path,{method,headers:{...(token?{Authorization:`Bearer ${token}`}:{ }),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
  return {status:response.status,body:await response.json()};
};
try {
  let ready=false;
  for(let i=0;i<120;i++){try{ready=(await fetch(`${base}/api/health`)).ok;}catch{}if(ready)break;await new Promise(done=>setTimeout(done,100));}
  assert.ok(ready,'Servidor de prueba no inició.');
  const login=await api('/api/auth/login',null,'POST',{identity:'admin',password});
  assert.equal(login.status,200);
  const token=login.body.token;
  const repository=(await api('/api/shared-repository',token)).body.repository;
  const campaign=repository.campaigns.find(item=>item.name==='WIN');
  assert.ok(campaign);
  assert.equal(campaign.qualityGuidelines.length,16);
  assert.deepEqual(campaign.qualityCriterionWeights,{C1:.15,C2:.30,C3:.35,C4:.20});
  assert.equal(campaign.qualityGuidelines.find(item=>item.id==='win_contract').weight,0);
  const operation=repository.operations.find(item=>item.campaignId===campaign.id&&!item.legacy&&item.status==='ACTIVA');
  assert.ok(operation);
  const advisor={id:'adv_pue_win_test',dni:'99000882',employeeCode:'PUE-WIN',name:'Asesora PUE WIN',campaignId:campaign.id,operationId:operation.id,supervisorId:'usr_admin',status:'ACTIVO',active:true};
  const synced=await api('/api/shared-repository/sync',token,'PUT',{...repository,advisors:[...repository.advisors,advisor]});
  assert.equal(synced.status,200,JSON.stringify(synced.body));
  const evaluation=(id,saleResult,change={})=>({id,advisorId:advisor.id,evaluatorId:'usr_admin',campaignId:campaign.id,evaluationType:'QUALITY',date:'2026-10-20',time:'10:30',callId:id,saleResult,scoreTotal:1,technicalScore:1,items:campaign.qualityGuidelines.map(item=>({criterionId:item.id,compliance:saleResult==='NO_VENTA'&&['win_4_2','win_4_4','win_contract'].includes(item.id)?'NO_APLICA':'CUMPLE',finding:'Hallazgo de prueba.'})),...change});
  const full=await api('/api/evaluations',token,'POST',evaluation('win_full','VENTA_CONCRETADA'));
  assert.equal(full.status,201,JSON.stringify(full.body));
  assert.equal(full.body.evaluation.scoreTotal,100);
  assert.equal(full.body.evaluation.qualityResult,undefined,'La fuente no define umbral aprobatorio.');
  const noSale=evaluation('win_no_sale','NO_VENTA',{qualityIncidentIds:['win_disrespect']});
  noSale.items.find(item=>item.criterionId==='win_4_1').compliance='NO_CUMPLE';
  const noSaleResult=await api('/api/evaluations',token,'POST',noSale);
  assert.equal(noSaleResult.status,201,JSON.stringify(noSaleResult.body));
  assert.equal(noSaleResult.body.evaluation.scoreTotal,86,'El peso del bloque activo se redistribuye al excluir atributos.');
  assert.deepEqual(noSaleResult.body.evaluation.qualityIncidentIds,['win_disrespect']);
  const contract=evaluation('win_contract_failed','VENTA_CONCRETADA');
  contract.items.find(item=>item.criterionId==='win_contract').compliance='NO_CUMPLE';
  assert.equal((await api('/api/evaluations',token,'POST',contract)).body.evaluation.scoreTotal,100,'El atributo adicional no tiene peso.');
  const missing=evaluation('win_missing','VENTA_CONCRETADA');missing.items.pop();
  assert.equal((await api('/api/evaluations',token,'POST',missing)).status,400);
  const invalid=evaluation('win_invalid_incident','VENTA_CONCRETADA',{qualityIncidentIds:['unknown']});
  assert.equal((await api('/api/evaluations',token,'POST',invalid)).status,400);
  console.log('Pauta WIN: 16 atributos, pesos, venta/no venta, no aplica, incidencias y nota verificados.');
} finally {
  app.kill();
  await new Promise(done=>setTimeout(done,400));
  const safe=resolve(temp);
  if(dirname(safe)===resolve(tmpdir())&&basename(safe).startsWith('cm-pue-win-'))await rm(safe,{recursive:true,force:true,maxRetries:8,retryDelay:200});
}
