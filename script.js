let currentStep = 1;
const totalSteps = 6;
const stepForms = document.querySelectorAll(".step-form");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.querySelector(".progress-bar");

function showStep(step) {
  stepForms.forEach((form, index) => {
    form.classList.remove("active");
    if (index === step - 1) {
      form.classList.add("active");
    }
  });
  progressBar.style.width = ((step - 1) / (totalSteps - 1)) * 100 + "%";
  nextBtn.style.display = step === totalSteps ? "none" : "block";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
    updateReview();
  }
});

function selectQuadra(element) {
  const selected = document.querySelector(".quadra.selected");
  if (selected) selected.classList.remove("selected");
  element.classList.add("selected");
  document.getElementById("reviewQuadra").textContent =
    element.querySelector("h4").textContent;
  nextBtn.disabled = false;
}

function selectDate(element) {
  const selected = document.querySelector(".date.selected");
  if (selected) selected.classList.remove("selected");
  element.classList.add("selected");
  document.getElementById("reviewData").textContent =
    element.querySelector("h4").textContent;
  nextBtn.disabled = false;
}

function updateReview() {
  const horarios = document.querySelectorAll(".time.selected");
  const selectedHorarios = Array.from(horarios).map((h) => h.textContent);
  document.getElementById("reviewHorarios").textContent =
    selectedHorarios.join(", ");
  const total = selectedHorarios.length * 70;
  document.getElementById("reviewTotal").textContent = total.toFixed(2);
  document.getElementById("selectedCount").textContent =
    selectedHorarios.length;
  document.getElementById("totalValue").textContent = total.toFixed(2); 
}

function copyToClipboard() {
  const copyText = document.getElementById("pixKey");
  copyText.select();
  document.execCommand("copy");
  alert("Chave Pix copiada: " + copyText.value);
}

showStep(currentStep);

// Adiciona horários disponíveis ao Passo 3
const timeSlots = document.getElementById("timeSlots");
for (let i = 8; i <= 20; i++) {
  const timeDiv = document.createElement("div");
  timeDiv.className = "border rounded-lg p-4 cursor-pointer time";
  timeDiv.textContent = `${i}:00`;
  timeDiv.onclick = () => {
    timeDiv.classList.toggle("selected");
    updateReview(); // Atualiza a revisão ao selecionar/deselecionar horários
  };
  timeSlots.appendChild(timeDiv);
}