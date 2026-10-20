import type { Campaign, QualityGuideline } from '../types';
import { WIN_SOURCE } from './winPueSource';

export const isWinCampaign = (name = '') => /^win$/i.test(name.trim());

// PAUTA 2026: A2/A17/A35/A56 son pesos de bloque; D contiene pesos de atributo.
// La columna I es un cálculo auxiliar incompleto y no sustituye a A × D.
export const WIN_WEIGHTS = { C1: .15, C2: .30, C3: .35, C4: .20 } as const;

const guideline = (
  id: string, code: string, criterion: QualityGuideline['criterion'], name: string,
  weight: number, expected: string, failures: string, exclusion = 'Sin exclusión indicada.',
): QualityGuideline => ({ id, code, criterion, name, weight, focus: 'Calidad WIN', critical: false, noApplies: true, active: true, expected, failures, exclusion });

export const WIN_GUIDELINES: QualityGuideline[] = [
  guideline('win_1_1','1.1','C1','Saludo amigable-cercano',.20,'Se identifica con su nombre y WIN; personaliza con nombre o apellido del cliente. En OUT solicita permiso para continuar.','No se presenta, no menciona WIN, no personaliza o no solicita consentimiento cuando corresponde.'),
  guideline('win_1_2','1.2','C1','Validación comercial y cobertura',.40,'Confirma cobertura y dirección; valida tipo de predio, referencias y condiciones de instalación según casa, edificio o condominio.','No valida dirección o cobertura, tipo de predio, documentación o condiciones técnicas pertinentes.'),
  guideline('win_1_3','1.3','C1','Actitud comercial',.40,'Muestra interés por concretar la venta, usa tono natural y lenguaje sencillo; menciona un reconocimiento de WIN cuando corresponda.','Tono robotizado o desganado, tecnicismos, mala vocalización o falta de interés.'),
  guideline('win_2_1','2.1','C2','Preguntas de sondeo',.35,'Realiza al menos dos preguntas para identificar necesidad y tipo de cliente, con sondeo pertinente al producto.','No sondea, hace solo una pregunta o no identifica la necesidad.','Cliente reactivo que no permite continuar.'),
  guideline('win_2_2','2.2','C2','Escucha activa',.15,'Atiende lo expresado por el cliente, evita repreguntas innecesarias, interrupciones abruptas y distracciones.','Repregunta lo ya aclarado, no presta atención o interrumpe abruptamente.'),
  guideline('win_2_3','2.3','C2','Beneficios WIN (imagina que…)',.35,'Vincula los beneficios WIN con el uso y la necesidad del cliente mediante un ejemplo personalizado.','No hace vivir la experiencia o no aborda la necesidad detectada.','Cliente decidido para quien esta explicación no corresponde.'),
  guideline('win_2_4','2.4','C2','Ofrece la mejor alternativa',.15,'Ofrece el plan que mejor se ajusta al sondeo y propone servicios paquetizados cuando aportan valor.','Ofrece planes en abanico, sin sondeo o la alternativa más económica sin sustento.','No hay respuesta del cliente por chat o se corta la llamada.'),
  guideline('win_3_1','3.1','C3','Indagación y manejo de objeciones',.50,'Indaga la objeción y utiliza argumentos veraces; realiza al menos dos rebates para intentar concretar la venta.','No maneja la objeción o hace solo un rebate.','No se presentó una objeción ni hubo oportunidad de rebatir.'),
  guideline('win_3_2','3.2','C3','Aseguramiento',.15,'Confirma proactivamente, al menos una vez, que el cliente comprendió la información; aplica en venta y no venta.','No realiza pregunta de aseguramiento.','El cliente indica proactivamente que todo está claro.'),
  guideline('win_3_3','3.3','C3','Información correcta o completa',.35,'En venta, informa de forma correcta y completa precio, velocidad, instalación, plazos y condiciones; en no venta, información correcta y características pertinentes.','Información incorrecta o incompleta, omite condiciones o asegura fecha y horario de instalación indebidamente.'),
  guideline('win_4_1','4.1','C4','Dirige al cierre',.45,'Impulsa la decisión mediante preguntas cerradas y conduce al cierre.','No dirige al cierre, utiliza preguntas abiertas o condiciona la venta.','El cliente corta la llamada antes de la oportunidad de cierre.'),
  guideline('win_4_2','4.2','C4','Prevalidación de datos del titular',.25,'Antes del contrato valida datos personales, DNI/CE vigente y condiciones del domicilio.','No valida vigencia del documento, placa o recibos físicos y demás datos exigidos.','Solo aplica para ventas.'),
  guideline('win_4_3','4.3','C4','Registro en Inconcert',.15,'Registra correctamente la gestión de venta o no venta según el árbol de tipificaciones.','Registro incorrecto o inexistente.'),
  guideline('win_4_4','4.4','C4','Registro correcto de portabilidad (WinForce / CRM Experiencia)',.10,'En ventas con portabilidad registra documento, número, operador cedente, tipo de línea y observaciones del CRM.','Datos de portabilidad o del cliente incorrectos.','Solo aplica a ventas con portabilidad.'),
  guideline('win_4_5','4.5','C4','Despedida cordial',.05,'Cierra con una despedida cordial y cercana.','No se despide cuando tuvo oportunidad de hacerlo.','El cliente corta antes de que el asesor pueda despedirse.'),
  guideline('win_contract','Adicional','C4','Lectura del contrato',0,'Lee el script regulatorio completo y literal según la documentación legal vigente.','Omite o altera la lectura contractual.','Atributo sin peso. Solo ventas transferidas al área de Validaciones.'),
].map(item => ({ ...item, ...WIN_SOURCE[item.id as keyof typeof WIN_SOURCE] }));

// La hoja enumera estas malas prácticas, pero no establece un descuento o nota cero.
export const WIN_INCIDENTS = [
  { id:'win_voicemail', name:'Buzón de voz', description:'Permanece más de 10 segundos en casilla de voz sin respuesta.' },
  { id:'win_fraud', name:'Posible fraude', description:'Contrata con una persona que no es titular del servicio o del DNI.' },
  { id:'win_hangup', name:'Corte de llamada', description:'Corte intencional de la llamada.' },
  { id:'win_disrespect', name:'Falta de respeto', description:'Trato descortés, palabras soeces, interrupciones excesivas o no tomar la llamada.' },
  { id:'win_churn', name:'Induce a la baja como gancho de venta', description:'Ofrece periodos de prueba o baja de servicios de valor agregado.' },
] as const;

export const withWinPue = (campaign: Campaign): Campaign =>
  isWinCampaign(campaign.name) && !campaign.qualityGuidelines?.length
    ? { ...campaign, qualityGuidelines: WIN_GUIDELINES, qualityCriterionWeights: WIN_WEIGHTS, qualityCriticalErrors: [] }
    : campaign;
