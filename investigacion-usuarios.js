const form = document.querySelector('#researchForm');
const roleSelect = document.querySelector('#participantRole');
const roleGuide = document.querySelector('#roleGuide');
const actionStatus = document.querySelector('#actionStatus');

const roleQuestions = {
  estudiante: [
    '¿Cómo te enteras hoy de tareas, fechas y resultados? Cuéntame un caso reciente.',
    'Si no recuerdas tu código o una pantalla no responde, ¿a quién pedirías ayuda?',
    '¿Qué parte del prototipo usarías más y cuál evitarías? ¿Por qué?'
  ],
  docente: [
    '¿Cómo entregas contenidos y actividades actualmente? ¿Qué información cambia con frecuencia?',
    '¿Qué errores o dudas frecuentes de estudiantes debería ayudar a resolver la plataforma?',
    '¿Quién debe revisar y aprobar la información antes de publicarla?'
  ],
  administracion: [
    '¿Cómo se crean, recuperan y desactivan los códigos de acceso?',
    '¿Qué datos pueden mostrarse en una pantalla compartida y cuáles deben permanecer privados?',
    '¿Qué consultas necesitan atención humana y a qué área se deben derivar?'
  ],
  tecnico: [
    '¿Qué conexión, energía y mantenimiento están disponibles para las estaciones?',
    '¿Cómo se actualizará el contenido y quién atenderá fallas?',
    '¿Qué debería pasar si se pierde internet o una sesión queda abierta?'
  ],
  otro: [
    '¿Qué relación tienes con la estación virtual y cuándo la usarías?',
    '¿Qué información necesitarías encontrar y qué te impediría usarla?'
  ]
};

function updateRoleGuide() {
  const questions = roleQuestions[roleSelect.value];
  roleGuide.innerHTML = questions
    ? `<strong>Preguntas para este perfil</strong><ul>${questions.map(q => `<li>${q}</li>`).join('')}</ul>`
    : '<strong>Preguntas por perfil</strong><p>Selecciona el rol del participante en la sección anterior para ver preguntas adicionales.</p>';
}

roleSelect.addEventListener('change', updateRoleGuide);

function exportResearch() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.participationAuthorized = form.elements.participationAuthorized.checked;
  const record = {
    formVersion: '1.0',
    project: 'Estaciones Virtuales CNB · INEB San Francisco Zapotitlán',
    exportedAt: new Date().toISOString(),
    guidance: 'Registro de una sesión. No incluir datos personales identificables.',
    roleQuestions: roleQuestions[roleSelect.value] || [],
    responses: data
  };
  const code = (data.participantCode || 'sin-codigo').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 32);
  const filename = `investigacion-cnb-${code}-${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([JSON.stringify(record, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  actionStatus.textContent = `Registro descargado: ${filename}`;
}

document.querySelector('#exportButton').addEventListener('click', exportResearch);
document.querySelector('#printButton').addEventListener('click', () => window.print());
const printHeights = new Map();
window.addEventListener('beforeprint', () => {
  form.querySelectorAll('textarea').forEach((area) => {
    printHeights.set(area, area.style.height);
    area.style.height = `${Math.max(area.scrollHeight, 70)}px`;
  });
});
window.addEventListener('afterprint', () => {
  printHeights.forEach((height, area) => { area.style.height = height; });
  printHeights.clear();
});
form.addEventListener('reset', () => {
  setTimeout(updateRoleGuide, 0);
  actionStatus.textContent = 'Formulario limpio. Recuerda exportar el registro antes de salir.';
});
