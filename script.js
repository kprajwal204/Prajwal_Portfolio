document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  const setTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    } else {
      root.removeAttribute("data-theme");
      if (themeIcon) themeIcon.className = "fa-solid fa-moon";
    }
  };

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
  else setTheme("light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  // Hero role rotator (switch every 2 seconds)
  const roleRotator = document.getElementById("role-rotator");
  if (roleRotator) {
    const roles = ["Full Stack Developer", "Data Analyst"];
    let roleIndex = 0;

    setInterval(() => {
      roleRotator.classList.add("switching");
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleRotator.textContent = roles[roleIndex];
        roleRotator.classList.remove("switching");
      }, 280);
    }, 2000);
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-bar");
  const revealSkills = (bar) => {
    const fill = bar.querySelector(".skill-fill");
    if (fill) fill.style.width = `${bar.getAttribute("data-value") || 0}%`;
  };

  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSkills(entry.target);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    skillBars.forEach((bar) => skillsObserver.observe(bar));
  } else {
    skillBars.forEach(revealSkills);
  }

  // Animate project cards on scroll
  const projectCards = document.querySelectorAll(".project-card");
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    projectCards.forEach((card) => projectObserver.observe(card));
  } else {
    projectCards.forEach((card) => card.classList.add("visible"));
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Project modal
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img");
  const modalRepo = document.getElementById("modal-repo");

  const closeModal = () => {
    if (modal) modal.setAttribute("aria-hidden", "true");
  };

  if (modal && modalTitle && modalDesc && modalImg && modalRepo) {
    document.querySelectorAll(".view-detail").forEach((button) => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title") || "Project";
        const desc = button.getAttribute("data-desc") || "";
        const img = button.getAttribute("data-img") || "";
        const repoAnchor = button.parentElement ? button.parentElement.querySelector("a") : null;

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImg.src = img;
        modalRepo.href = repoAnchor ? repoAnchor.href : "#";
        modal.setAttribute("aria-hidden", "false");
      });
    });

    modal.querySelectorAll(".modal-close").forEach((closeButton) => {
      closeButton.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = (document.getElementById("name")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const message = (document.getElementById("message")?.value || "").trim();

      const subject = encodeURIComponent(`Portfolio message from ${name || "Unknown"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:kprajwal204@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const contactMail = document.getElementById("contact-mail");
  if (contactMail) {
    contactMail.addEventListener("click", () => {
      window.location.href = "mailto:kprajwal204@gmail.com";
    });
  }
});