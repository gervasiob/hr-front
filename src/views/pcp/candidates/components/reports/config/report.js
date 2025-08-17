// report.js

export const candidate = {
  name: "Juan Pérez",
  residence: "CABA",
  position: "Backend Developer",
  summary: "Gran dominio de Django, actitud proactiva y buena comunicación.",
  skills: ["Python", "Django", "PostgreSQL", "Docker"],
  evaluation: "Apto para el puesto.",
  experience: [
    {
      period: "septiembre de 2022 al presente",
      position: "Consultor Microsoft",
      company: "AMERICA GROUP",
      description: `
        - Recepción, validación y acuerdo de proyecto<br>
        - Reportes en formato digital consumible y seguimiento<br>
        - Operación de consolas Forti: detección de caídas, mejoras, inventariado<br>
        - VMware: instalación ESXI, configuración de storage y redes, administración
      `
    },
    {
      period: "abril de 2016 hasta julio de 2022",
      position: "Senior Premier Field Engineer",
      company: "MICROSOFT",
      description: `
        - Servicio proactivo y reactivo en sitio y remoto para clientes de Premier Support<br>
        - Evaluación de entornos, formación, resolución de incidentes
      `
    }
  ],
  education: [
    {
      title: "ANALISTA DE SISTEMAS",
      institution: "UNIVERSIDAD ESTUDIOS SUPERIORES DE BUENOS AIRES",
      status: "GRADUADO"
    }
  ],
  courses: [
    "AZ-500: MICROSOFT AZURE SECURITY TECHNOLOGIES",
    "AZ-900: MICROSOFT AZURE FUNDAMENTALS"
  ],
  languages: [
    { name: "Inglés", level: "Intermedio" },
    { name: "Alemán", level: "Básico" }
  ],
  motivation: "Muy motivado por la propuesta",
  location: "Zona norte",
  availability: "Total disponibilidad para trabajar in situ",
  otherSkills: ["SQL", "ANGULAR.JS", "DESARROLLO PROYECTOS EN PETROLERAS"]
}

export const reportModel = (data = candidate) => {
  const candidateData = data.value ?? candidate;
  return `
  <h1 style="font-family: Calibri; font-size: 17pt;">${candidateData.name}</h1>
  <p style="font-family: Calibri; font-size: 11pt;"><strong>Residencia:</strong> ${candidateData.residence}</p>
  <p style="font-family: Calibri; font-size: 11pt;"><strong>Puesto a aplicar:</strong> ${candidateData.position}</p>

  <h2>RESUMEN DE LA ENTREVISTA</h2>
  <p>${candidateData.summary}</p>

  <h3>Aptitudes Requeridas / Adquiridas</h3>
  <ul>
    ${candidateData.skills.map(skill => `<li>${skill}</li>`).join('')}
  </ul>

  <h3>Evaluación Actitudinal (1 a 10)</h3>
  <p><strong>Comentario:</strong> ${candidateData.evaluation}</p>

  <h3>Competencias Evaluadas según el Modelo STAR</h3>
  <ul>
    <li><strong>Comunicación:</strong> ALTO</li>
    <li><strong>Orientación a resultados:</strong> MEDIO</li>
    <li><strong>Adaptabilidad:</strong> ALTO</li>
  </ul>

  <h3>Otras evaluaciones</h3>
  <p><strong>Motivación por la propuesta:</strong> ${candidateData.motivation}</p>
  <p><strong>Zona:</strong> ${candidateData.location}</p>
  <p><strong>Disposición para ir al lugar de trabajo:</strong> ${candidateData.availability}</p>

  <h3>Otras destrezas</h3>
  <ul>
    ${candidateData.otherSkills.map(skill => `<li>${skill}</li>`).join('')}
  </ul>

  <h2>Descripción General del Perfil</h2>
  ${candidateData.experience.map(job => `
    <p><strong>${job.period}</strong></p>
    <p><strong>${job.position.toUpperCase()}, en ${job.company.toUpperCase()}</strong></p>
    <p>${job.description}</p>
  `).join('')}

  <h2>EDUCACIÓN</h2>
  ${candidateData.education.map(ed => `
    <p><strong>${ed.title}</strong> - ${ed.institution} (${ed.status})</p>
  `).join('')}

  <h2>CURSOS</h2>
  <ul>
    ${candidateData.courses.map(course => `<li><strong>${course}</strong></li>`).join('')}
  </ul>

  <h2>IDIOMAS</h2>
  <ul>
    ${candidateData.languages.map(lang => `<li>${lang.name}: ${lang.level}</li>`).join('')}
  </ul>

  <hr />
  <p style="font-size: 10pt; font-family: Calibri;">KETOS DELPHIN LATAM – Tel.: (5411) 4850.1390 – Twitter: @ketosdelphin – rrhh@ketos-delphin.com – http://www.ketos-delphin.com/</p>
`}
