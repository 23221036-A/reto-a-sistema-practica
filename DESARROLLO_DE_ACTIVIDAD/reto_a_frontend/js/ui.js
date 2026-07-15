const UI = (() => {
  let lastFocusedElement = null;

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  }

  function renderExpediente(data) {
    setText("expediente-code", data.codigo);
    setText("programa", data.programa);
    setText("fecha-entrega", BusinessRules.formatDate(data.fechaEntrega));
    setText("estado-badge", data.estado);
    setText("fecha-limite", BusinessRules.formatDate(data.fechaLimite));
  }

  function renderStepper(steps) {
    const stepper = document.getElementById("stepper");
    stepper.innerHTML = "";

    steps.forEach((step) => {
      const item = document.createElement("li");
      item.className = `step ${step.status}`;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "step-button";
      button.dataset.stepId = String(step.id);
      button.setAttribute("aria-label", `${step.name}: ${step.detail}`);
      button.innerHTML = `
        <span class="step-circle">${step.id}</span>
        <span class="step-name">${step.name}</span>
        <span class="step-date">${BusinessRules.formatDate(step.date)}</span>
      `;

      item.appendChild(button);
      stepper.appendChild(item);
    });
  }

  function renderObservations(observations) {
    const list = document.getElementById("observations-list");
    list.innerHTML = "";
    observations.forEach((observation) => {
      const item = document.createElement("li");
      item.textContent = observation;
      list.appendChild(item);
    });
  }

  function showStepDetail(message) {
    setText("step-detail", message);
  }

  function setRemainingDays(days) {
    const label = days === 1 ? "día hábil" : "días hábiles";
    setText("remaining-days", `${days} ${label}`);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector("button, input, textarea")?.focus();
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
  }

  function showFieldErrors(errors) {
    setText("file-error", errors.file);
    setText("comment-error", errors.comment);
    setText("confirmation-error", errors.confirmation);
  }

  function clearFieldErrors() {
    showFieldErrors({ file: "", comment: "", confirmation: "" });
  }

  function setLoading(button, loading) {
    button.classList.toggle("loading", loading);
    button.disabled = loading;
    button.setAttribute("aria-busy", String(loading));
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 3500);
  }

  function markSubmissionSent() {
    const badge = document.getElementById("estado-badge");
    badge.textContent = "Subsanación enviada";
    badge.className = "status-badge status-enviado";

    const submitButton = document.getElementById("open-submission");
    submitButton.disabled = true;
    submitButton.textContent = "Subsanación enviada";

    showStepDetail(
      "La subsanación fue enviada. La comisión evaluadora revisará nuevamente el expediente."
    );
  }

  return {
    clearFieldErrors, closeModal, markSubmissionSent, openModal,
    renderExpediente, renderObservations, renderStepper, setLoading,
    setRemainingDays, showFieldErrors, showStepDetail, showToast
  };
})();
