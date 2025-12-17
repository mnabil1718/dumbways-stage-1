export function showToast(message, type, delay = 3000) {
  const toastEl = document.getElementById("app-toast");
  // reset color first
  toastEl.classList.remove("text-bg-danger", "text-bg-dark");

  if (type === "error") {
    toastEl.classList.add("text-bg-danger");
  } else {
    toastEl.classList.add("text-bg-dark");
  }
  toastEl.querySelector(".toast-body").textContent = message;

  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
    autohide: true,
    delay,
  });

  toast.show();
}

document.addEventListener("DOMContentLoaded", () => {
  const flashEl = document.getElementById("flash-data");

  if (!flashEl) return;

  const message = flashEl.dataset.message;
  const type = flashEl.dataset.type;

  showToast(message, type);
});
