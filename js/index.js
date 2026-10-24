
(() => {
    "use strict";

    const initSpa = () => {
        const header = document.getElementById("spaHeader");
        const navbar = document.getElementById("spaNavbar");
        const navLinks = document.querySelectorAll(".spa-nav-links .nav-link");
        const navbarToggler = document.querySelector(".spa-toggler");

        const updateHeader = () => {
            if (!header) return;

            header.classList.toggle("is-scrolled", window.scrollY > 30);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.forEach((item) => {
                    item.classList.remove("active");
                });

                link.classList.add("active");

                if (
                    navbar &&
                    navbar.classList.contains("show") &&
                    window.bootstrap
                ) {
                    window.bootstrap.Collapse.getOrCreateInstance(navbar).hide();
                }
            });
        });

        if (navbarToggler && navbar) {
            const navbarIcon = navbarToggler.querySelector("i");

            navbar.addEventListener("show.bs.collapse", () => {
                navbarIcon?.classList.remove("fa-bars");
                navbarIcon?.classList.add("fa-xmark");
            });

            navbar.addEventListener("hide.bs.collapse", () => {
                navbarIcon?.classList.remove("fa-xmark");
                navbarIcon?.classList.add("fa-bars");
            });
        }

        const sections = document.querySelectorAll("section[id]");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const id = entry.target.id;

                        navLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${id}`
                            );
                        });
                    });
                },
                {
                    rootMargin: "-25% 0px -60% 0px",
                    threshold: 0
                }
            );

            sections.forEach((section) => observer.observe(section));
        }

        document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        });
    };

    const initReveal = () => {
        const elements = document.querySelectorAll(
            ".lamset-about-content, .lamset-about-visual, .lamset-service-card"
        );

        if (!elements.length) return;

        elements.forEach((element) => {
            element.style.transform = "none";
            element.style.transitionDelay = "0ms";
        });

        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        elements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transition = "opacity 0.7s ease";
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 40px 0px"
            }
        );

        elements.forEach((element) => observer.observe(element));
    };

    const init = () => {
        initSpa();
        initReveal();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    const initLamsetPricing = () => {
        const section = document.querySelector(".lamset-pricing");

        if (!section) return;

        const whatsappNumber = "966546479142";
        const cards = section.querySelectorAll(".lamset-pricing-card");

        cards.forEach((card) => {
            const service = card.dataset.service;
            const price = card.dataset.price;
            const button = card.querySelector(".lamset-pricing-book");

            if (!service || !button) return;

            const message = [
                "مرحباً، أرغب في حجز خدمة من لمسة استرخاء سبا.",
                "",
                `الخدمة: ${service}`,
                `السعر: ${price} ريال سعودي`,
                "",
                "يرجى توضيح المواعيد المتاحة وتأكيد تفاصيل الحجز."
            ].join("\n");

            button.href =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            button.target = "_blank";
            button.rel = "noopener noreferrer";
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLamsetPricing);
    } else {
        initLamsetPricing();
    }
    const initLamsetProcess = () => {
        const section = document.querySelector(".lamset-process");

        if (!section) return;

        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const steps = section.querySelectorAll(".lamset-process-step");

        steps.forEach((step) => {
            step.style.opacity = "0";
            step.style.transition = "opacity 0.7s ease";
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const index = [...steps].indexOf(entry.target);

                    entry.target.style.transitionDelay = `${index * 120}ms`;
                    entry.target.style.opacity = "1";

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15
            }
        );

        steps.forEach((step) => observer.observe(step));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLamsetProcess);
    } else {
        initLamsetProcess();
    }
    const initLamsetContact = () => {
        const form = document.getElementById("lamsetContactForm");
        const dateInput = document.getElementById("lamsetDate");

        if (!form || !dateInput) return;

        const whatsappNumber = "966546479142";

        const updateMinDate = () => {
            const now = new Date();
            const localDate = [
                now.getFullYear(),
                String(now.getMonth() + 1).padStart(2, "0"),
                String(now.getDate()).padStart(2, "0")
            ].join("-");

            dateInput.min = localDate;
        };

        updateMinDate();

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            updateMinDate();

            if (dateInput.value < dateInput.min) {
                dateInput.setCustomValidity("يرجى اختيار تاريخ اليوم أو تاريخ لاحق.");
                dateInput.reportValidity();
                return;
            }

            dateInput.setCustomValidity("");

            const data = new FormData(form);

            const firstName = String(data.get("firstName") || "").trim();
            const lastName = String(data.get("lastName") || "").trim();
           
            const phone = String(data.get("phone") || "").trim();
            const service = String(data.get("service") || "").trim();
            const date = String(data.get("date") || "").trim();
            const time = String(data.get("time") || "").trim();
            const location = String(data.get("location") || "").trim();
            const city = String(data.get("city") || "").trim();
            const notes = String(data.get("notes") || "").trim();

            const message = [
                "مرحباً، أرغب في طلب حجز لدى لمسة استرخاء سبا.",
                "",
                `الاسم: ${firstName} ${lastName}`,
                `رقم الجوال: ${phone}`,
                 `الخدمة المطلوبة: ${service}`,
                `التاريخ المفضل: ${date}`,
                `الوقت المفضل: ${time}`,
                `مكان تقديم الخدمة: ${location}`,
                `المدينة: ${city}`,
                notes ? `تفاصيل إضافية: ${notes}` : "",
                "",
                "يرجى تأكيد توفر الموعد وتفاصيل الحجز."
            ].filter(Boolean).join("\n");

            const url =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            const newWindow = window.open(url, "_blank", "noopener,noreferrer");

            if (newWindow) {
                form.reset();
                updateMinDate();
            }
        });

        dateInput.addEventListener("input", () => {
            dateInput.setCustomValidity("");
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLamsetContact);
    } else {
        initLamsetContact();
    }

    const initLamsetFooter = () => {
        const year = document.getElementById("lamsetFooterYear");
        const backTop = document.querySelector(".lamset-footer-back-top");

        if (year) {
            year.textContent = new Date().getFullYear();
        }

        if (backTop) {
            backTop.addEventListener("click", (event) => {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth"
                });
            });
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLamsetFooter);
    } else {
        initLamsetFooter();
    }
})();
