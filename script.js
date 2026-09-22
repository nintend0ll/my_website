const revealItems = document.querySelectorAll(".reveal");
const copyEmailButton = document.querySelector(".copy-email");
const backToTopButton = document.querySelector(".back-to-top");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8%" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.email;

  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Copiado";
    copyEmailButton.setAttribute("aria-label", "Email copiado");

    window.setTimeout(() => {
      copyEmailButton.textContent = "Copiar";
      copyEmailButton.setAttribute("aria-label", "Copiar email de Agustina");
    }, 1800);
  } catch {
    copyEmailButton.textContent = "No se pudo copiar";
  }
});

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });
});

window.addEventListener(
  "scroll",
  () => {
    backToTopButton?.classList.toggle("is-visible", window.scrollY > 420);
  },
  { passive: true },
);
