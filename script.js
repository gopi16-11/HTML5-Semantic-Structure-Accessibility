const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const footerYear = document.querySelector("footer p");

if (footerYear) {
    footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Your Name. All rights reserved.`;
}

if (form && formMessage) {
    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        message: document.getElementById("message")
    };

    Object.values(fields).forEach((field) => {
        field.addEventListener("input", () => {
            field.removeAttribute("aria-invalid");
            formMessage.textContent = "";
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const values = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            message: fields.message.value.trim()
        };

        Object.values(fields).forEach((field) => {
            field.removeAttribute("aria-invalid");
        });

        if (!values.name || !values.email || !values.message) {
            formMessage.textContent = "Please complete all required fields.";
            formMessage.style.color = "#b42318";

            Object.entries(values).forEach(([key, value]) => {
                if (!value) {
                    fields[key].setAttribute("aria-invalid", "true");
                }
            });

            return;
        }

        if (!fields.email.validity.valid) {
            fields.email.setAttribute("aria-invalid", "true");
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "#b42318";
            fields.email.focus();
            return;
        }

        formMessage.textContent = "Thank you! Your message has been submitted successfully.";
        formMessage.style.color = "#087f5b";
        form.reset();
    });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                filterButton.classList.toggle("is-active", filterButton === button);
            });

            projectCards.forEach((card) => {
                const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
                card.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });
}