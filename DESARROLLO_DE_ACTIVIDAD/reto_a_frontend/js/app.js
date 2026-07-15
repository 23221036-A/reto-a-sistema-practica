document.addEventListener("DOMContentLoaded", () => {
  const remainingDays = BusinessRules.calculateBusinessDays(
    MOCK_DATA.today,
    MOCK_DATA.expediente.fechaLimite
  );

  UI.renderExpediente(MOCK_DATA.expediente);
  UI.renderStepper(MOCK_DATA.steps);
  UI.renderObservations(MOCK_DATA.observations);
  UI.setRemainingDays(remainingDays);
  UI.showStepDetail(MOCK_DATA.steps[2].detail);

  const observationsModalId = "observations-modal";
  const submissionModalId = "submission-modal";

  document.getElementById("open-observations")
    .addEventListener("click", () => UI.openModal(observationsModalId));

  document.getElementById("open-submission")
    .addEventListener("click", () => UI.openModal(submissionModalId));

  document.getElementById("go-to-submission").addEventListener("click", () => {
    UI.closeModal(observationsModalId);
    UI.openModal(submissionModalId);
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => UI.closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) UI.closeModal(backdrop.id);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal-backdrop:not([hidden])")
        .forEach((modal) => UI.closeModal(modal.id));
    }
  });

  document.getElementById("stepper").addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-id]");
    if (!button) return;

    const selectedStep = MOCK_DATA.steps.find(
      (step) => step.id === Number(button.dataset.stepId)
    );

    if (selectedStep) UI.showStepDetail(selectedStep.detail);
  });

  const comment = document.getElementById("student-comment");
  comment.addEventListener("input", () => {
    document.getElementById("comment-count").textContent =
      String(comment.value.length);
  });

  document.getElementById("submission-form").addEventListener("submit", (event) => {
    event.preventDefault();
    UI.clearFieldErrors();

    const validation = BusinessRules.validateSubmission({
      file: document.getElementById("corrected-file").files[0],
      comment: comment.value,
      confirmed: document.getElementById("confirmation").checked,
      remainingDays
    });

    if (!validation.valid) {
      UI.showFieldErrors(validation.errors);
      UI.showToast("Revisa los datos antes de enviar la subsanación.");
      return;
    }

    const submitButton = document.getElementById("submit-button");
    UI.setLoading(submitButton, true);

    window.setTimeout(() => {
      UI.setLoading(submitButton, false);
      UI.closeModal(submissionModalId);
      UI.markSubmissionSent();
      UI.showToast("La subsanación se envió correctamente.");
      event.target.reset();
      document.getElementById("comment-count").textContent = "0";
    }, 1500);
  });
});
