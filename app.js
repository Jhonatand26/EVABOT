const app = document.querySelector('#app');
const mascot = 'assets/mascota-ined.png';
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const safe = (text) => String(text).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const subjects = [
  {id:'comunicacion',name:'Comunicación y Lenguaje',icon:'book',color:'pink',topics:[{title:'Comprensión lectora',description:'Identifica ideas principales, detalles y el propósito de un texto.',reading:'Leer con atención permite comprender lo que un texto comunica. Primero reconoce el tema general; después localiza las ideas principales y los detalles que las apoyan.'},{title:'Expresión escrita',description:'Organiza tus ideas para comunicarte con claridad.',reading:'Un texto claro tiene una idea central, un orden fácil de seguir y una revisión final de ortografía y puntuación.'}]},
  {id:'matematica',name:'Matemática',icon:'chart',color:'blue',topics:[{title:'Geometría',description:'Estudia las formas, el espacio y las medidas.',reading:'La geometría estudia figuras como triángulos, cuadrados y círculos. Podemos describir sus lados, ángulos, perímetros y áreas para resolver problemas del entorno.'},{title:'Fracciones',description:'Representa partes de un todo y compáralas.',reading:'Una fracción expresa cuántas partes tomamos de una unidad dividida en partes iguales. El numerador indica las partes tomadas y el denominador indica el total de partes.'}]},
  {id:'naturales',name:'Ciencias Naturales',icon:'leaf',color:'green',topics:[{title:'Los ecosistemas',description:'Conoce las relaciones entre los seres vivos y su ambiente.',reading:'Un ecosistema reúne organismos y elementos físicos que interactúan. El agua, la luz, el suelo, las plantas y los animales forman parte de estas relaciones.'},{title:'La materia',description:'Observa sus propiedades y cambios.',reading:'La materia ocupa espacio y tiene masa. Sus propiedades ayudan a describirla y distinguirla en la vida cotidiana.'}]},
  {id:'sociales',name:'Ciencias Sociales',icon:'globe',color:'orange',topics:[{title:'Nuestra comunidad',description:'Explora la organización y participación comunitaria.',reading:'Una comunidad reúne personas que comparten un territorio y colaboran para atender necesidades comunes. Participar ayuda a construir mejores soluciones.'},{title:'Mapas y territorio',description:'Ubica lugares usando referencias y mapas.',reading:'Los mapas representan espacios a menor escala. Sus símbolos, orientación y leyenda permiten interpretar la información que muestran.'}]},
  {id:'tecnologia',name:'Tecnología',icon:'laptop',color:'purple',topics:[{title:'Ciudadanía digital',description:'Aprende a usar internet con responsabilidad.',reading:'Ser ciudadano digital implica cuidar la información personal, verificar las fuentes y tratar a los demás con respeto en línea.'},{title:'Herramientas digitales',description:'Conoce recursos para estudiar y crear.',reading:'Las herramientas digitales ayudan a investigar, organizar ideas y compartir trabajos. Elegir la herramienta adecuada depende de la tarea.'}]},
  {id:'emprendimiento',name:'Emprendimiento',icon:'light',color:'yellow',topics:[{title:'Ideas que resuelven problemas',description:'Transforma una necesidad en una propuesta.',reading:'Una idea emprendedora empieza al observar una necesidad. Después se propone una solución, se conversa con otras personas y se mejora la propuesta.'},{title:'Planificación básica',description:'Organiza recursos, tiempos y pasos.',reading:'Planificar permite definir qué se quiere lograr, qué recursos se necesitan y cuáles serán los primeros pasos.'}]},
  {id:'investigacion',name:'Investigación',icon:'search',color:'teal',topics:[{title:'Preguntas de investigación',description:'Formula preguntas claras y posibles de responder.',reading:'Una buena investigación inicia con una pregunta concreta. Luego se buscan fuentes confiables, se comparan datos y se presentan conclusiones.'},{title:'Fuentes confiables',description:'Evalúa de dónde viene la información.',reading:'Antes de usar una fuente, revisa quién la publica, cuándo fue creada y si presenta evidencia que puedas comprobar.'}]}
];

const activities = [
  {title:'Tarea de Matemática',date:'15/09/2026',day:15,status:'Entregada',kind:'done',icon:'book',color:'blue'},
  {title:'Tarea de Ciencias',date:'18/09/2026',day:18,status:'Pendiente',kind:'pending',icon:'flask',color:'purple'},
  {title:'Proyecto de Emprendimiento',date:'22/09/2026',day:22,status:'Pendiente',kind:'pending',icon:'light',color:'orange'},
  {title:'Lectura de Comunicación',date:'25/09/2026',day:25,status:'No entregada',kind:'missing',icon:'book',color:'blue'}
];

const progress = [
  {name:'Comunicación y Lenguaje',value:80,color:'#e62e71'},
  {name:'Matemática',value:65,color:'#1484d0'},
  {name:'Ciencias Naturales',value:90,color:'#29af59'},
  {name:'Ciencias Sociales',value:75,color:'#f2a21d'},
  {name:'Tecnología',value:60,color:'#8744bd'},
  {name:'Emprendimiento',value:70,color:'#f7bd2c'}
];

const state = {page:'login',subject:'matematica',topic:0,reading:false,videoNotice:false,month:8,year:2026,selectedDay:22,chat:[{from:'bot',text:'¡Hola! Soy tu guía virtual. ¿En qué puedo ayudarte?'}],loginError:''};

function header(showProfile=false){return `<header class="topbar"><div class="brand"><div class="crest" aria-hidden="true">INEB</div><span class="brand-text">INEB · San Francisco Zapotitlán</span></div><div class="topbar-actions">${showProfile?`<span class="profile-pill">${icon('user')} Alex Barrios</span>`:''}<button type="button" class="small-top-button" data-page="dashboard" aria-label="Ir al inicio">${icon('home')}</button></div></header>`}
function nav(back='dashboard',right='Inicio'){return `<footer class="bottom-nav"><button type="button" class="nav-button" data-page="${back}">${icon('back')} Regresar</button><button type="button" class="nav-button ghost" data-page="dashboard">${icon('home')} ${right}</button></footer>`}
function heading(iconName,title,subtitle=''){return `<div class="section-heading">${icon(iconName)}<div><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div></div>`}
function screen(title,body,back='dashboard',headIcon='book',subtitle=''){app.innerHTML=`${header()}<section class="app-content">${heading(headIcon,title,subtitle)}${body}</section>${nav(back)}`}

function renderLogin(){
  app.innerHTML=`<section class="login-screen"><div class="login-top"><div class="login-crest"><span>INEB</span></div><h1 class="login-title">Estaciones<br><span>Virtuales CNB</span></h1><p class="login-subtitle">Aprende, explora y construye tu futuro</p></div><div class="login-main"><img class="mascot login-mascot" src="${mascot}" alt="Mascota del INEB San Francisco Zapotitlán"/><form class="login-card" id="loginForm"><label for="studentCode">Ingresa tu código personal para comenzar:</label><div class="input-wrap">${icon('user')}<input id="studentCode" inputmode="numeric" autocomplete="off" placeholder="Ej. 12345" maxlength="10" aria-describedby="demoHint"/></div><button class="primary-button" type="submit">Ingresar</button>${state.loginError?`<p class="error" role="alert">${state.loginError}</p>`:''}<p class="demo-hint" id="demoHint">Prototipo: usa el código 12345</p><div class="login-help">¿No sabes cuál es tu código?<strong>Consulta con tu docente</strong></div></form></div></section>`;
}

function renderDashboard(){
 const cards=[['contenidos','Contenidos CNB','Consulta la información de las diferentes áreas.','book','blue'],['actividades','Mis actividades','Revisa tus actividades asignadas.','list','green'],['cronograma','Mi cronograma','Consulta fechas importantes y eventos.','calendar','purple'],['progreso','Mi progreso','Visualiza tu avance académico.','chart','orange'],['informacion','Mi información','Revisa tus datos personales.','user','teal'],['asistente','Asistente virtual','Pide ayuda y resuelve tus dudas.','bot','pink']];
 app.innerHTML=`${header(true)}<div class="dashboard-greeting"><img class="mascot" src="${mascot}" alt="Mascota saludando"/><div><h1>¡Hola, Alex!</h1><p>Bienvenido a tu espacio educativo.</p><em>La educación es el camino hacia tus sueños ✨</em></div></div><div class="dashboard-grid">${cards.map(([page,title,description,ico,color])=>`<button class="dashboard-card ${color}" type="button" data-page="${page}">${icon(ico)}<strong>${title}</strong><small>${description}</small></button>`).join('')}</div><div class="dashboard-bottom"><button type="button" data-page="dashboard">${icon('home')} Inicio</button><button type="button" data-action="logout">${icon('logout')} Cerrar sesión</button></div>`;
}

function renderSubjects(){
  screen('Contenidos CNB',`<div class="subject-grid">${subjects.map((s)=>`<button type="button" class="subject-card ${s.color}" data-subject="${s.id}">${icon(s.icon)}<strong>${s.name}</strong></button>`).join('')}</div>`,'dashboard','book','Selecciona un área para conocer sus contenidos.');
}

function renderTopics(){
  const subject=subjects.find(s=>s.id===state.subject);
  screen(subject.name,`<div class="topic-list">${subject.topics.map((topic,i)=>`<button type="button" class="topic-row" data-topic="${i}"><span class="topic-badge">${icon(subject.icon)}</span><span><strong>${topic.title}</strong><small>${topic.description}</small></span>${icon('next')}</button>`).join('')}</div><div class="notice">Selecciona un tema para ver una muestra de su contenido.</div>`,'contenidos',subject.icon,'Elige un tema para explorar.');
}

function renderLesson(){
  const subject=subjects.find(s=>s.id===state.subject);const topic=subject.topics[state.topic];
  screen(topic.title,`<div class="breadcrumb">${subject.name} ${icon('next')} ${topic.title}</div><div class="lesson-layout"><div class="video-preview" aria-label="Vista previa de video de ejemplo"><div class="shape triangle-a"></div><div class="shape triangle-b"></div><div class="video-play">${icon('play')}</div><div class="video-foot">▶ 0:00 / 4:32 · Vista de ejemplo</div></div><div class="lesson-summary"><h2>${topic.title}</h2><p>${topic.description}</p><div class="shape-icons" aria-hidden="true">${state.subject==='matematica'?'🔺 🟩 🔵':'📘 ✦ 💡'}</div></div></div><div class="lesson-actions"><button type="button" class="watch" data-action="video">${icon('play')} Ver video</button><button type="button" class="read" data-action="read">${icon('book')} Leer información</button></div>${state.videoNotice?`<div class="notice" role="status">El video es una vista de demostración. El material audiovisual se incorporará cuando la institución lo apruebe.</div>`:''}${state.reading?`<div class="reading-panel"><h3>Información para aprender</h3><p>${topic.reading}</p><ul><li>Observa un ejemplo en tu entorno.</li><li>Explica con tus palabras lo que aprendiste.</li></ul><button class="primary-button" type="button" data-page="final">${icon('check')} Completar sección</button></div>`:''}`,'temas',subject.icon);
}

function renderActivities(){
 screen('Mis actividades',`<table class="activities-table"><thead><tr><th>Actividad</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>${activities.map(a=>`<tr><td><span class="activity-name"><span class="activity-icon ${a.color}">${icon(a.icon)}</span>${a.title}</span></td><td><span class="status ${a.kind}">${a.status}</span></td><td>${a.date}</td></tr>`).join('')}</tbody></table><div class="notice">Estas actividades y estados son datos de demostración. La versión final mostrará información confirmada por tus docentes.</div>`,'dashboard','book');
}

function monthName(){return new Intl.DateTimeFormat('es-GT',{month:'long',year:'numeric'}).format(new Date(state.year,state.month,1))}
function renderCalendar(){
 const first=(new Date(state.year,state.month,1).getDay()+6)%7;const days=new Date(state.year,state.month+1,0).getDate();const september=state.year===2026&&state.month===8;
 const dateCells=Array.from({length:first},()=>'<span></span>').concat(Array.from({length:days},(_,i)=>{const day=i+1;const hasEvent=september&&activities.some(a=>a.day===day);return `<button type="button" class="day ${hasEvent?'has-event':''} ${state.selectedDay===day?'selected':''}" data-day="${day}" aria-label="${day} de ${monthName()}${hasEvent?', con actividad':''}">${day}</button>`}));
 const chosen=september?activities.filter(a=>a.day===state.selectedDay):[];
 screen('Mi cronograma',`<div class="calendar-card"><div class="calendar-header"><button type="button" data-month="-1" aria-label="Mes anterior">‹</button><strong>${monthName()}</strong><button type="button" data-month="1" aria-label="Mes siguiente">›</button></div><div class="calendar-grid">${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>`<span class="weekday">${d}</span>`).join('')}${dateCells.join('')}</div></div><div class="calendar-card"><h2 style="font-size:15px;margin:0 0 10px">${chosen.length?`Actividad del ${state.selectedDay} de septiembre`:'Próximas actividades'}</h2><div class="events-list">${(chosen.length?chosen:september?activities:[]).map(a=>`<div class="event-row"><span class="event-dot" style="background:${a.kind==='done'?'#24b484':a.kind==='missing'?'#e73555':'#f4a024'}"></span><div><strong>${a.day} Sep · ${a.title}</strong><span>${a.status}</span></div></div>`).join('')||'<p style="font-size:12px;color:#69839b">No hay actividades de muestra para este mes.</p>'}</div></div>`,'dashboard','calendar');
}

function renderProgress(){
 screen('Mi progreso',`<div class="calendar-card">${progress.map(p=>`<div class="progress-row"><div class="progress-label"><span>${p.name}</span><span>${p.value}%</span></div><div class="progress-track"><span style="width:${p.value}%;background:${p.color}"></span></div></div>`).join('')}</div><div class="stat-grid"><div class="stat"><small>Actividades asignadas</small><strong>20</strong></div><div class="stat"><small>Actividades entregadas</small><strong>16</strong></div><div class="stat"><small>Actividades pendientes</small><strong>4</strong></div><div class="stat"><small>Promedio de evaluaciones</small><strong>85%</strong></div></div><div class="notice">Indicadores de ejemplo para visualizar esta sección del prototipo.</div>`,'dashboard','chart');
}

function renderProfile(){
 screen('Mi información',`<div class="profile-card"><div class="avatar">${icon('user')}</div><div class="profile-fields"><div><strong>Nombre</strong><span>Alex Guillermo Barrios Chávez</span></div><div><strong>Código</strong><span>12345 (demostración)</span></div><div><strong>Grado</strong><span>5to Bachillerato</span></div><div><strong>Sección</strong><span>B</span></div><div><strong>Establecimiento</strong><span>INEB San Francisco Zapotitlán</span></div></div></div><div class="notice">Datos ficticios para mostrar el diseño. En la aplicación real esta información deberá venir de un sistema autorizado.</div>`,'dashboard','user');
}

function renderAssistant(){
 screen('Asistente virtual',`<div class="assistant-intro"><img class="mascot" src="${mascot}" alt="Mascota del INEB"/><div class="speech-bubble">¡Hola! Soy tu guía virtual.<br>¿En qué puedo ayudarte?</div></div><div class="assistant-actions"><button type="button" class="blue" data-page="contenidos">${icon('search')} Buscar un contenido</button><button type="button" class="green" data-page="progreso">${icon('chart')} Ver mi progreso</button><button type="button" class="purple" data-page="actividades">${icon('calendar')} Consultar actividades</button><button type="button" class="orange" data-action="toggle-chat">${icon('light')} Otra consulta</button></div><div id="chatArea" class="${state.showChat?'':'hidden'}"><div class="chat-box" id="chatBox">${state.chat.map(m=>`<div class="message ${m.from}">${safe(m.text)}</div>`).join('')}</div><form class="chat-form" id="chatForm"><input id="chatInput" type="text" maxlength="160" placeholder="Escribe tu consulta..." aria-label="Escribe tu consulta"/><button type="submit" aria-label="Enviar">${icon('send')}</button></form></div>`,'dashboard','bot');
 const box=document.querySelector('#chatBox');if(box)box.scrollTop=box.scrollHeight;
}

function assistantAnswer(text){const q=text.toLowerCase();if(/contenido|matem|cnb|materia/.test(q))return 'Abre Contenidos CNB y selecciona un área. Allí podrás explorar los temas de muestra.';if(/actividad|tarea|fecha|cronograma/.test(q))return 'Revisa Mis actividades o Mi cronograma para consultar las fechas de ejemplo.';if(/progreso|nota|promedio/.test(q))return 'En Mi progreso puedes ver el avance por área y un resumen de ejemplo.';if(/codigo|acceso|cuenta/.test(q))return 'Si necesitas tu código personal, consulta con tu docente o con la administración del establecimiento.';return 'Puedo ayudarte a encontrar contenidos, actividades o tu progreso. Para otra duda, consulta con tu docente.'}

function renderFinish(){
 app.innerHTML=`${header()}<div class="finish-content"><i class="confetti a"></i><i class="confetti b"></i><i class="confetti c"></i><i class="confetti d"></i><i class="confetti e"></i><div class="finish-check">${icon('check')}</div><h1>¡Has terminado!</h1><p>Has completado esta sección.<br>Continúa explorando los contenidos del CNB y sigue aprendiendo.</p><button type="button" class="primary-button" data-page="dashboard">${icon('home')} Volver al inicio</button><img class="mascot finish-mascot" src="${mascot}" alt="Mascota del INEB celebrando"/><strong style="color:#0a5c9a;font-size:13px">¡Lo estás haciendo muy bien!</strong></div>`;
}

function render(){const views={login:renderLogin,dashboard:renderDashboard,contenidos:renderSubjects,temas:renderTopics,leccion:renderLesson,actividades:renderActivities,cronograma:renderCalendar,progreso:renderProgress,informacion:renderProfile,asistente:renderAssistant,final:renderFinish};(views[state.page]||renderLogin)()}
function go(page){state.page=page;if(page==='leccion'){state.reading=false;state.videoNotice=false}render();window.scrollTo({top:0,behavior:'smooth'})}

app.addEventListener('click',event=>{
 const page=event.target.closest('[data-page]');if(page)return go(page.dataset.page);
 const subject=event.target.closest('[data-subject]');if(subject){state.subject=subject.dataset.subject;return go('temas')}
 const topic=event.target.closest('[data-topic]');if(topic){state.topic=Number(topic.dataset.topic);return go('leccion')}
 const day=event.target.closest('[data-day]');if(day){state.selectedDay=Number(day.dataset.day);return renderCalendar()}
 const month=event.target.closest('[data-month]');if(month){const d=new Date(state.year,state.month+Number(month.dataset.month),1);state.month=d.getMonth();state.year=d.getFullYear();state.selectedDay=null;return renderCalendar()}
 const action=event.target.closest('[data-action]');if(!action)return;
 if(action.dataset.action==='logout'){state.loginError='';state.chat=[{from:'bot',text:'¡Hola! Soy tu guía virtual. ¿En qué puedo ayudarte?'}];return go('login')}
 if(action.dataset.action==='read'){state.reading=!state.reading;return renderLesson()}
 if(action.dataset.action==='video'){state.videoNotice=true;return renderLesson()}
 if(action.dataset.action==='toggle-chat'){state.showChat=!state.showChat;return renderAssistant()}
});

app.addEventListener('submit',event=>{
 event.preventDefault();
 if(event.target.id==='loginForm'){const code=document.querySelector('#studentCode').value.trim();if(code==='12345'){state.loginError='';return go('dashboard')}state.loginError='Usa el código de demostración 12345.';return renderLogin()}
 if(event.target.id==='chatForm'){const input=document.querySelector('#chatInput');const message=input.value.trim();if(!message)return;state.chat.push({from:'user',text:message},{from:'bot',text:assistantAnswer(message)});state.showChat=true;renderAssistant()}
});

render();
