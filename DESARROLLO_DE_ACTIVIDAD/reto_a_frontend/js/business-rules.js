const BusinessRules = (() => {
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

  function parseLocalDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function formatDate(isoDate) {
    if (!isoDate) return "Pendiente";
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit", month: "2-digit", year: "numeric"
    }).format(parseLocalDate(isoDate));
  }

  function isBusinessDay(date) {
    return date.getDay() !== 0 && date.getDay() !== 6;
  }

  function calculateBusinessDays(startIso, endIso) {
    const start = parseLocalDate(startIso);
    const end = parseLocalDate(endIso);
    if (start > end) return 0;

    let total = 0;
    const current = new Date(start);
    current.setDate(current.getDate() + 1);

    while (current <= end) {
      if (isBusinessDay(current)) total += 1;
      current.setDate(current.getDate() + 1);
    }
    return total;
  }

  function validateSubmission({ file, comment, confirmed, remainingDays }) {
    const errors = { file: "", comment: "", confirmation: "" };

    if (remainingDays <= 0) {
      errors.file = "El plazo de subsanación ha finalizado.";
      return { valid: false, errors };
    }

    if (!file) {
      errors.file = "Debes seleccionar un archivo PDF.";
    } else {
      const isPdf = file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (!isPdf) errors.file = "El archivo debe estar en formato PDF.";
      else if (file.size > MAX_FILE_SIZE_BYTES)
        errors.file = "El archivo supera el tamaño máximo de 5 MB.";
    }

    if (!comment.trim())
      errors.comment = "Describe brevemente las correcciones realizadas.";
    else if (comment.trim().length < 10)
      errors.comment = "El comentario debe tener al menos 10 caracteres.";

    if (!confirmed)
      errors.confirmation = "Debes confirmar que revisaste las observaciones.";

    return {
      valid: Object.values(errors).every((message) => !message),
      errors
    };
  }

  return { calculateBusinessDays, formatDate, validateSubmission };
})();
