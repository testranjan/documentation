```javascript
/* =========================================================
   PRE-TRAINING OUTLET VISIT & AWARENESS PROGRAM
   PDF DOCUMENT PORTAL
========================================================= */


/* =========================================================
   LANGUAGE DATA
========================================================= */

const languages = {

    english: {
        title: "English Documentation",
        description: "Pre-Training Outlet Visit & Awareness Program",
        pdf: "pdf/english.pdf",
        name: "English"
    },

    japanese: {
        title: "日本語ドキュメント",
        description: "事前研修店舗訪問・意識向上プログラム",
        pdf: "pdf/japanese.pdf",
        name: "日本語"
    },

    nepali: {
        title: "नेपाली दस्तावेज",
        description: "पूर्व-प्रशिक्षण आउटलेट भ्रमण तथा सचेतना कार्यक्रम",
        pdf: "pdf/nepali.pdf",
        name: "नेपाली"
    },

    hindi: {
        title: "हिन्दी दस्तावेज़",
        description: "प्री-ट्रेनिंग आउटलेट विज़िट एवं जागरूकता कार्यक्रम",
        pdf: "pdf/hindi.pdf",
        name: "हिन्दी"
    }

};


/* =========================================================
   DOWNLOAD PASSWORD
========================================================= */

/*
    CHANGE YOUR PASSWORD HERE.

    Example:
    const DOWNLOAD_PASSWORD = "MyPassword2026";

    IMPORTANT:
    This protects the DOWNLOAD BUTTON only.

    It does NOT encrypt the actual PDF file.
    For real PDF security, use server-side authentication
    and/or password-encrypted PDF files.
*/

const DOWNLOAD_PASSWORD = "123456";


/* =========================================================
   GET HTML ELEMENTS
========================================================= */


/* Language screen */

const languageScreen =
    document.getElementById("languageScreen");

const website =
    document.getElementById("website");

const languageButtons =
    document.querySelectorAll(".language-card-button");

const continueButton =
    document.getElementById("continueButton");


/* Language selector */

const languageSelect =
    document.getElementById("languageSelect");


/* PDF */

const pdfViewer =
    document.getElementById("pdfViewer");

const openPdf =
    document.getElementById("openPdf");


/* Document information */

const documentTitle =
    document.getElementById("documentTitle");

const documentDescription =
    document.getElementById("documentDescription");

const currentLanguage =
    document.getElementById("currentLanguage");


/* Download */

const downloadPdf =
    document.getElementById("downloadPdf");


/* Password modal */

const passwordModal =
    document.getElementById("passwordModal");

const downloadPassword =
    document.getElementById("downloadPassword");

const passwordError =
    document.getElementById("passwordError");

const confirmDownload =
    document.getElementById("confirmDownload");

const cancelPassword =
    document.getElementById("cancelPassword");

const closePassword =
    document.getElementById("closePassword");

const togglePassword =
    document.getElementById("togglePassword");


/* =========================================================
   SELECTED LANGUAGE
========================================================= */

let selectedLanguage = null;


/* =========================================================
   PDF URL
========================================================= */

function getPdfUrl(language) {

    if (!languages[language]) {
        return null;
    }

    return languages[language].pdf;

}


/* =========================================================
   LANGUAGE CARD SELECTION
========================================================= */

languageButtons.forEach(button => {

    button.addEventListener("click", function () {

        /* Remove selection from all cards */

        languageButtons.forEach(item => {

            item.classList.remove("selected");

        });


        /* Select clicked card */

        this.classList.add("selected");


        /* Save selected language */

        selectedLanguage =
            this.dataset.language;


        /* Enable continue */

        continueButton.disabled = false;

    });

});


/* =========================================================
   CONTINUE BUTTON
========================================================= */

continueButton.addEventListener("click", function () {

    if (!selectedLanguage) {
        return;
    }


    /* Change document */

    changeLanguage(selectedLanguage);


    /* Save language */

    localStorage.setItem(
        "selectedLanguage",
        selectedLanguage
    );


    /* Hide language screen */

    languageScreen.classList.add("hidden");


    /* Show website */

    website.classList.remove("hidden");


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {

    const data = languages[language];

    if (!data) {
        return;
    }


    /* Document title */

    documentTitle.textContent =
        data.title;


    /* Document description */

    documentDescription.textContent =
        data.description;


    /* PDF */

    const pdfUrl =
        getPdfUrl(language);


    if (pdfUrl) {

        pdfViewer.src =
            pdfUrl +
            "#toolbar=0&navpanes=0&scrollbar=1";

    }


    /* Current language */

    currentLanguage.textContent =
        data.name;


    /* Dropdown */

    languageSelect.value =
        language;


    /* Browser language */

    document.documentElement.lang =
        language === "japanese"
            ? "ja"
            : language === "nepali"
                ? "ne"
                : language === "hindi"
                    ? "hi"
                    : "en";

}


/* =========================================================
   OPEN PDF
========================================================= */

/*
    IMPORTANT:

    OPEN PDF does NOT ask for password.

    The password is required ONLY when
    the user clicks DOWNLOAD PDF.
*/

openPdf.addEventListener("click", function () {

    if (!selectedLanguage) {
        return;
    }


    const pdfUrl =
        getPdfUrl(selectedLanguage);


    if (!pdfUrl) {
        return;
    }


    window.open(
        pdfUrl +
        "#toolbar=0&navpanes=0&scrollbar=1",
        "_blank",
        "noopener,noreferrer"
    );

});


/* =========================================================
   LANGUAGE DROPDOWN
========================================================= */

languageSelect.addEventListener(
    "change",
    function () {

        const language =
            this.value;


        selectedLanguage =
            language;


        changeLanguage(language);


        localStorage.setItem(
            "selectedLanguage",
            language
        );

    }
);


/* =========================================================
   LOAD SAVED LANGUAGE
========================================================= */

const savedLanguage =
    localStorage.getItem(
        "selectedLanguage"
    );


if (
    savedLanguage &&
    languages[savedLanguage]
) {

    selectedLanguage =
        savedLanguage;


    languageButtons.forEach(button => {

        if (
            button.dataset.language ===
            savedLanguage
        ) {

            button.classList.add("selected");

            continueButton.disabled =
                false;

        }

    });

}


/* =========================================================
   DOWNLOAD BUTTON
========================================================= */

/*
    Clicking Download PDF ALWAYS opens
    the password popup first.
*/

downloadPdf.addEventListener("click", function () {

    /* Make sure language is selected */

    if (!selectedLanguage) {

        alert(
            "Please select a language first."
        );

        return;

    }


    /* Clear previous password */

    downloadPassword.value = "";


    /* Clear previous error */

    passwordError.textContent = "";


    /* Reset password field */

    downloadPassword.type =
        "password";


    /* Reset eye icon */

    togglePassword.textContent =
        "👁";


    /* Enable download button */

    confirmDownload.disabled =
        false;

    confirmDownload.textContent =
        "Download";


    /* Show modal */

    passwordModal.classList.remove(
        "hidden"
    );


    /* Focus password field */

    setTimeout(function () {

        downloadPassword.focus();

    }, 100);

});


/* =========================================================
   CLOSE PASSWORD MODAL
========================================================= */

function closePasswordModal() {

    passwordModal.classList.add(
        "hidden"
    );


    downloadPassword.value = "";


    passwordError.textContent = "";


    downloadPassword.type =
        "password";


    togglePassword.textContent =
        "👁";

}


cancelPassword.addEventListener(
    "click",
    closePasswordModal
);


closePassword.addEventListener(
    "click",
    closePasswordModal
);


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE
========================================================= */

passwordModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "password-overlay"
            )
        ) {

            closePasswordModal();

        }

    }
);


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

togglePassword.addEventListener(
    "click",
    function () {

        if (
            downloadPassword.type ===
            "password"
        ) {

            downloadPassword.type =
                "text";

            togglePassword.textContent =
                "🙈";

        } else {

            downloadPassword.type =
                "password";

            togglePassword.textContent =
                "👁";

        }

    }
);


/* =========================================================
   CONFIRM DOWNLOAD
========================================================= */

confirmDownload.addEventListener(
    "click",
    downloadDocument
);


/* =========================================================
   ENTER KEY
========================================================= */

downloadPassword.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            downloadDocument();

        }

    }
);


/* =========================================================
   DOWNLOAD PDF FUNCTION
========================================================= */

async function downloadDocument() {

    const enteredPassword =
        downloadPassword.value.trim();


    /* =====================================================
       PASSWORD VALIDATION
    ===================================================== */

    if (!enteredPassword) {

        passwordError.textContent =
            "Please enter the password.";

        downloadPassword.focus();

        return;

    }


    if (
        enteredPassword !==
        DOWNLOAD_PASSWORD
    ) {

        passwordError.textContent =
            "❌ Incorrect password. Please try again.";

        downloadPassword.select();

        return;

    }


    /* =====================================================
       GET SELECTED PDF
    ===================================================== */

    const data =
        languages[selectedLanguage];


    if (!data) {

        passwordError.textContent =
            "Document not available.";

        return;

    }


    try {

        /* Disable button */

        confirmDownload.disabled =
            true;


        confirmDownload.textContent =
            "Preparing...";


        passwordError.textContent =
            "";


        /* =================================================
           FETCH PDF
        ================================================= */

        const response =
            await fetch(data.pdf, {
                method: "GET",
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                "PDF could not be loaded."
            );

        }


        /* Convert PDF to Blob */

        const blob =
            await response.blob();


        /* =================================================
           CREATE TEMPORARY DOWNLOAD URL
        ================================================= */

        const url =
            window.URL.createObjectURL(blob);


        /* =================================================
           CREATE DOWNLOAD LINK
        ================================================= */

        const link =
            document.createElement("a");


        link.href =
            url;


        link.download =
            data.name +
            "-Documentation.pdf";


        link.style.display =
            "none";


        document.body.appendChild(link);


        /* Start download */

        link.click();


        /* Remove link */

        link.remove();


        /* =================================================
           CLEANUP
        ================================================= */

        setTimeout(function () {

            window.URL.revokeObjectURL(url);

        }, 1000);


        /* Close password popup */

        closePasswordModal();


    } catch (error) {

        console.error(
            "Download error:",
            error
        );


        passwordError.textContent =
            "Unable to download the document. Please try again.";

    }


    /* Restore button */

    confirmDownload.disabled =
        false;


    confirmDownload.textContent =
        "Download";

}


/* =========================================================
   BASIC COPY / PRINT PROTECTION
========================================================= */

/*
    NOTE:

    Browser-side protection is only a deterrent.

    It cannot provide 100% protection against:
    - Screenshots
    - Developer Tools
    - Browser extensions
    - OS-level screen capture
    - Another camera taking a picture
*/


/* Disable right click */

document.addEventListener(
    "contextmenu",
    function (event) {

        event.preventDefault();

    }
);


/* =========================================================
   KEYBOARD PROTECTION
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();


        /*
            Ctrl + S
            Ctrl + P
            Ctrl + U
        */

        if (
            (event.ctrlKey || event.metaKey) &&
            (
                key === "s" ||
                key === "p" ||
                key === "u"
            )
        ) {

            event.preventDefault();

            return;

        }


        /*
            F12
            Developer Tools shortcuts
        */

        if (
            key === "f12"
        ) {

            event.preventDefault();

            return;

        }


        /*
            Ctrl + Shift + I
            Ctrl + Shift + J
            Ctrl + Shift + C
        */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.shiftKey &&
            (
                key === "i" ||
                key === "j" ||
                key === "c"
            )
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   DISABLE TEXT SELECTION
========================================================= */

document.addEventListener(
    "selectstart",
    function (event) {

        /*
            Do not block selection inside
            password input.
        */

        if (
            event.target ===
            downloadPassword
        ) {

            return;

        }

        event.preventDefault();

    }
);


/* =========================================================
   PREVENT DRAGGING
========================================================= */

document.addEventListener(
    "dragstart",
    function (event) {

        event.preventDefault();

    }
);


/* =========================================================
   INITIAL PDF LOAD
========================================================= */

/* =========================================================
   DEFAULT LANGUAGE
========================================================= */

/*
   English is ALWAYS the default language
   when the website is opened.
*/

selectedLanguage = "english";

/* Select English card */

languageButtons.forEach(button => {

    if (button.dataset.language === "english") {

        button.classList.add("selected");

    }

});

/* Enable Continue button */

continueButton.disabled = false;

/* Set English in dropdown */

if (languageSelect) {

    languageSelect.value = "english";

}
}
```
