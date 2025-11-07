// report.js

export const reportModel = (data) => {
  const candidateData = data || {};
  const name = candidateData.name ?? 'No disponible';
  const residence = candidateData.residence ?? 'No disponible';
  const position = candidateData.position ?? 'No disponible';
  const summary = candidateData.summary ?? 'No disponible';
  const required_skills = candidateData.required_skills ?? [];
  const acquired_skills = candidateData.acquired_skills ?? [];
  const evaluation = candidateData.evaluation ?? {};
  const star_competencies = candidateData.star_competencies ?? [];
  const experience = candidateData.experience ?? [];
  const education = candidateData.education ?? [];
  const courses = candidateData.courses ?? [];
  const languages = candidateData.languages ?? [];
  const motivation = candidateData.motivation ?? 'No disponible';
  const location = candidateData.location ?? 'No disponible';
  const availability = candidateData.availability ?? 'No disponible';
  const otherSkills = candidateData.otherSkills ?? [];
  const dni = candidateData.dni ?? 'No disponible';
  const age = candidateData.age ?? 'No disponible';
  const email = candidateData.email ?? 'No disponible';
  const phone = candidateData.phone ?? 'No disponible';
  const experience_years = candidateData.experience_years ?? 'No disponible';

  const all_skills = [...required_skills, ...acquired_skills];

  return `<h1 style="font-family: Calibri; font-size: 17pt;">${name}</h1><p style="font-family: Calibri; font-size: 11pt;"><strong>Residencia:</strong> ${residence}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>DNI:</strong> ${dni}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>Edad:</strong> ${age}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>Email:</strong> ${email}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>Teléfono:</strong> ${phone}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>Años de Experiencia:</strong> ${experience_years}</p><p style="font-family: Calibri; font-size: 11pt;"><strong>Puesto a aplicar:</strong> ${position}</p><h2>RESUMEN DE LA ENTREVISTA</h2><p>${summary}</p><h3>Aptitudes Requeridas / Adquiridas</h3><ul>${all_skills.map(skill => `<li><strong>${skill.nombre}</strong> - ${skill.origen}</li>`).join('')}</ul><h3>Evaluación Actitudinal (1 a 10)</h3><p><strong>Puntaje:</strong> ${evaluation.puntaje ?? 'No disponible'}</p><p><strong>Comentario:</strong> ${evaluation.comentario ?? 'No disponible'}</p><h3>Competencias Evaluadas según el Modelo STAR</h3><ul>${star_competencies.map(comp => `<li><strong>${comp.competencia}:</strong> ${comp.nivel}</li>`).join('')}</ul><h3>Otras evaluaciones</h3><p><strong>Motivación por la propuesta:</strong> ${motivation}</p><p><strong>Zona:</strong> ${location}</p><p><strong>Disposición para ir al lugar de trabajo:</strong> ${availability}</p><h3>Otras destrezas</h3><ul>${otherSkills.map(skill => `<li>${skill}</li>`).join('')}</ul><h2>Descripción General del Perfil</h2>${(Array.isArray(experience) ? experience : []).map(job => `<p><strong>${job.period ?? 'No disponible'}</strong></p><p><strong>${(job.position ?? 'No disponible').toUpperCase()}, en ${(job.company ?? 'No disponible').toUpperCase()}</strong></p><p>${job.description ?? ''}</p>`).join('')}<h2>EDUCACIÓN</h2>${education.map(ed => `<p><strong>${ed.title ?? 'No disponible'}</strong> - ${ed.institution ?? 'No disponible'} (${ed.status ?? 'No disponible'})</p>`).join('')}<h2>CURSOS</h2><ul>${courses.map(course => `<li><strong>${course}</strong></li>`).join('')}</ul><h2>IDIOMAS</h2><ul>${languages.map(lang => `<li>${(lang.name || lang) ?? 'No disponible'}: ${lang.level ?? 'Nivel no especificado'}</li>`).join('')}</ul><hr /><p style="font-size: 10pt; font-family: Calibri;">KETOS DELPHIN LATAM – Tel.: (5411) 4850.1390 – Twitter: @ketosdelphin – rrhh@ketos-delphin.com – http://www.ketos-delphin.com/</p>`;
};
