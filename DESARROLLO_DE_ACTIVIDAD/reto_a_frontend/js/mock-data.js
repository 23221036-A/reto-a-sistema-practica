const MOCK_DATA = Object.freeze({
  today: "2026-07-14",
  expediente: {
    codigo: "EXP-2026-041",
    programa: "Ingeniería de Sistemas e Informática",
    fechaEntrega: "2026-07-03",
    estado: "Observado",
    fechaLimite: "2026-07-17"
  },
  steps: [
    { id: 1, name: "Entregado", date: "2026-07-03", status: "completed",
      detail: "El expediente fue registrado correctamente por la facultad." },
    { id: 2, name: "En Comisión", date: "2026-07-06", status: "completed",
      detail: "El expediente fue asignado a la comisión evaluadora." },
    { id: 3, name: "Observado", date: "2026-07-10", status: "current",
      detail: "La comisión solicitó correcciones antes de continuar con el trámite." },
    { id: 4, name: "Sustentación", date: null, status: "pending",
      detail: "Esta etapa se habilitará cuando las observaciones sean subsanadas." }
  ],
  observations: [
    "Adjuntar la carta de aceptación firmada por la empresa.",
    "Corregir las fechas indicadas en el plan de prácticas.",
    "Volver a cargar el documento en formato PDF."
  ]
});
