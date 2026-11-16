document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const adContactForm = document.getElementById("adContactForm");
    const receiptModal = document.getElementById("receiptModal");
    const receiptSummary = document.getElementById("receiptSummary");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Switcher
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // Helper: Field Validation
    function setFieldError(inputEl, message) {
        const group = inputEl.closest(".form-group");
        const errorSmall = group.querySelector(".error-msg");
        if (message) {
            group.classList.add("has-error");
            errorSmall.textContent = message;
            return false;
        } else {
            group.classList.remove("has-error");
            errorSmall.textContent = "";
            return true;
        }
    }

    // 3. Form Validation & Submission
    if (adContactForm) {
        adContactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const clientName = document.getElementById("clientName");
            const companyName = document.getElementById("companyName");
            const phoneTelegram = document.getElementById("phoneTelegram");
            const clientEmail = document.getElementById("clientEmail");
            const adTier = document.getElementById("adTier");
            const campaignDate = document.getElementById("campaignDate");
            const campaignMessage = document.getElementById("campaignMessage");

            let isValid = true;

            if (!clientName.value.trim()) {
                isValid = setFieldError(clientName, "សូមបញ្ចូលឈ្មោះ / Contact name is required.");
            } else {
                setFieldError(clientName, "");
            }

            if (!companyName.value.trim()) {
                isValid = setFieldError(companyName, "សូមបញ្ចូលឈ្មោះក្រុមហ៊ុន / Company name is required.");
            } else {
                setFieldError(companyName, "");
            }

            if (!phoneTelegram.value.trim()) {
                isValid = setFieldError(phoneTelegram, "សូមបញ្ចូលលេខទូរស័ព្ទ ឬ Telegram / Phone or Telegram is required.");
            } else {
                setFieldError(phoneTelegram, "");
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(clientEmail.value.trim())) {
                isValid = setFieldError(clientEmail, "សូមបញ្ចូលអ៊ីមែលឱ្យបានត្រឹមត្រូវ / Valid email is required.");
            } else {
                setFieldError(clientEmail, "");
            }

            if (!campaignMessage.value.trim()) {
                isValid = setFieldError(campaignMessage, "សូមបញ្ចូលព័ត៌មានយុទ្ធនាការ / Campaign details are required.");
            } else {
                setFieldError(campaignMessage, "");
            }

            if (!isValid) return;

            // Gather Selected Channels
            const selectedChannels = Array.from(
                document.querySelectorAll('input[name="channels"]:checked')
            ).map(cb => cb.value);

            const refId = "UHT-AD-" + Math.floor(100000 + Math.random() * 900000);

            // Populate Receipt Modal
            receiptSummary.innerHTML = `
                <div><strong>Reference ID:</strong> ${refId}</div>
                <div><strong>Client / Brand:</strong> ${clientName.value.trim()} (${companyName.value.trim()})</div>
                <div><strong>Contact:</strong> ${phoneTelegram.value.trim()} | ${clientEmail.value.trim()}</div>
                <div><strong>Package:</strong> ${adTier.value}</div>
                <div><strong>Channels:</strong> ${selectedChannels.length ? selectedChannels.join(", ") : "General"}</div>
                <div><strong>Target Launch:</strong> ${campaignDate.value || "Flexible / ASAP"}</div>
            `;

            receiptModal.classList.remove("hidden");
            adContactForm.reset();
        });
    }

    // 4. Close Receipt Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            receiptModal.classList.add("hidden");
        });
    }

    if (receiptModal) {
        receiptModal.addEventListener("click", (e) => {
            if (e.target === receiptModal) {
                receiptModal.classList.add("hidden");
            }
        });
    }
});
