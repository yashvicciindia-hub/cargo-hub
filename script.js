/* ==========================================================================
   Cargo Hub — script.js
   ========================================================================== */

/* ---------- Google Form prefill configuration ----------
   Replace baseUrl with your published Google Form's viewform URL, and
   each entry.### value with the corresponding field's real entry ID.
   (Open the form, use "Get pre-filled link", inspect the generated URL
   for the entry.NNNNNNNN parameters.)
--------------------------------------------------------------------------- */
const FORM_CONFIG = {
  mandiSlot: {
    baseUrl: "GOOGLE_FORM_URL_HERE",
    fields: {
      name: "entry.000000001",
      phone: "entry.000000002",
      commodity: "entry.000000003",
      tonnage: "entry.000000004",
      mandi: "entry.000000005",
      date: "entry.000000006"
    }
  },
  warehousePartner: {
    baseUrl: "GOOGLE_FORM_URL_HERE",
    fields: {
      owner: "entry.000000011",
      org: "entry.000000012",
      type: "entry.000000013",
      capacity: "entry.000000014",
      location: "entry.000000015",
      phone: "entry.000000016",
      email: "entry.000000017"
    }
  }
};

/* Builds a prefilled Google Form URL from a config + form data object */
function buildPrefillUrl(config, data) {
  if (!config.baseUrl || config.baseUrl === "GOOGLE_FORM_URL_HERE") return null;
  const url = new URL(config.baseUrl);
  Object.keys(config.fields).forEach((key) => {
    const entryId = config.fields[key];
    const value = data[key];
    if (value) url.searchParams.set(entryId, value);
  });
  return url.toString();
}

/* Optionally submit silently to Google Forms via a hidden iframe, so the
   visitor never leaves the page. Uncomment to enable once FORM_CONFIG
   has real values. */
function submitToGoogleForm(prefillUrl) {
  if (!prefillUrl) return;
  // const iframe = document.createElement('iframe');
  // iframe.name = 'hidden-form-target';
  // iframe.style.display = 'none';
  // document.body.appendChild(iframe);
  // fetch(prefillUrl, { mode: 'no-cors' });
}

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile drawer ---------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const drawerClose = document.getElementById("drawerClose");
  const mobileDrawer = document.getElementById("mobileDrawer");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    document.body.style.overflow = "";
  }
  hamburgerBtn && hamburgerBtn.addEventListener("click", openDrawer);
  drawerClose && drawerClose.addEventListener("click", closeDrawer);
  document.querySelectorAll("[data-nav-mobile]").forEach((a) => {
    a.addEventListener("click", closeDrawer);
  });

  /* ---------------- Scroll-spy active nav (glitch-free) ---------------- */
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  if (sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          setActiveLink(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 1] }
    );
    sections.forEach((sec) => spyObserver.observe(sec));
  }

  /* ---------------- Reveal-on-scroll ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Stakeholder tabs ---------------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
      tabPanels.forEach((p) =>
        p.classList.toggle("active", p.getAttribute("data-panel") === target)
      );
    });
  });

  /* ---------------- Modals ---------------- */
  const modals = {
    mandi: document.getElementById("modal-mandi"),
    warehouse: document.getElementById("modal-warehouse")
  };

  function openModal(key) {
    const modal = modals[key];
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      closeDrawer();
      openModal(el.getAttribute("data-open-modal"));
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => closeModal(el.closest(".modal-overlay")));
  });
  Object.values(modals).forEach((modal) => {
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      Object.values(modals).forEach((m) => m && m.classList.remove("open"));
      document.body.style.overflow = "";
    }
  });

  /* ---------------- Form: Book Mandi Slot ---------------- */
  const formMandi = document.getElementById("form-mandi");
  const successMandi = document.getElementById("success-mandi");
  formMandi &&
    formMandi.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formMandi).entries());
      const prefillUrl = buildPrefillUrl(FORM_CONFIG.mandiSlot, data);
      submitToGoogleForm(prefillUrl);
      formMandi.style.display = "none";
      successMandi.classList.add("show");
      setTimeout(() => {
        closeModal(document.getElementById("modal-mandi"));
        formMandi.reset();
        formMandi.style.display = "";
        successMandi.classList.remove("show");
      }, 2200);
    });

  /* ---------------- Form: List Facility / Warehouse ---------------- */
  const formWarehouse = document.getElementById("form-warehouse");
  const successWarehouse = document.getElementById("success-warehouse");
  formWarehouse &&
    formWarehouse.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formWarehouse).entries());
      const prefillUrl = buildPrefillUrl(FORM_CONFIG.warehousePartner, data);
      submitToGoogleForm(prefillUrl);
      formWarehouse.style.display = "none";
      successWarehouse.classList.add("show");
      setTimeout(() => {
        closeModal(document.getElementById("modal-warehouse"));
        formWarehouse.reset();
        formWarehouse.style.display = "";
        successWarehouse.classList.remove("show");
      }, 2200);
    });
});
