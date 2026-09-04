
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
        pdf: "./pdf/english.pdf",
        name: "English"
    },

    japanese: {
        title: "日本語ドキュメント",
        description: "事前研修店舗訪問・意識向上プログラム",
        pdf: "./pdf/japanese.pdf",
        name: "日本語"
    },

    nepali: {
        title: "नेपाली दस्तावेज",
        description: "पूर्व-प्रशिक्षण आउटलेट भ्रमण तथा सचेतना कार्यक्रम",
        pdf: "./pdf/nepali.pdf",
        name: "नेपाली"
    },

    hindi: {
        title: "हिन्दी दस्तावेज़",
        description: "प्री-ट्रेनिंग आउटलेट विज़िट एवं जागरूकता कार्यक्रम",
        pdf: "./pdf/hindi.pdf",
        name: "हिन्दी"
    }

};


/* =========================================================
   DOWNLOAD PASSWORD
========================================================= */

const DOWNLOAD_PASSWORD = "123456";


/* =========================================================
   ELEMENTS
========================================================= */

const languageScreen =
    document.getElementById("languageScreen");

const website =
    document.getElementById("website");

const languageButtons =
    document.querySelectorAll(".language-card-button");

const languageSelect =
    document.getElementById("languageSelect");

const pdfViewer =
    document.getElementById("pdfViewer");

const openPdf =
    document.getElementById("openPdf");

const documentTitle =
    document.getElementById("documentTitle");

const documentDescription =
    document.getElementById("documentDescription");

const currentLanguage =
    document.getElementById("currentLanguage");

const downloadPdf =
    document.getElementById("downloadPdf");

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

let selectedLanguage = "english";


/* =========================================================
   GET PDF URL
========================================================= */

function getPdfUrl(language) {

    if (!languages[language]) {

        return null;

    }

    return languages[language].pdf;

}


/* =========================================================
   CHANGE PDF INSIDE PORTAL
========================================================= */

function changeLanguage(language) {

    const data =
        languages[language];


    if (!data) {

        console.error(
            "Language not found:",
            language
        );

        return;

    }


    selectedLanguage =
        language;


    documentTitle.textContent =
        data.title;


    documentDescription.textContent =
        data.description;


    currentLanguage.textContent =
        data.name;


    languageSelect.value =
        language;


    const pdfUrl =
        getPdfUrl(language);


    if (pdfUrl) {

        pdfViewer.src =
            pdfUrl +
            "#toolbar=0&navpanes=0&scrollbar=1";

    }


    document.documentElement.lang =
        language === "japanese"
            ? "ja"
            : language === "nepali"
                ? "ne"
                : language === "hindi"
                    ? "hi"
                    : "en";


    localStorage.setItem(
        "selectedLanguage",
        language
    );

}


/* =========================================================
   LANGUAGE CARD
   CLICK LANGUAGE → DIRECTLY OPEN PDF
========================================================= */

languageButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const language =
                this.dataset.language;


            if (!languages[language]) {

                console.error(
                    "Invalid language:",
                    language
                );

                return;

            }


            /* Visual selection */

            languageButtons.forEach(
                function(item) {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            this.classList.add(
                "selected"
            );


            /* Save selected language */

            selectedLanguage =
                language;


            localStorage.setItem(
                "selectedLanguage",
                language
            );


            /* Get PDF */

            const pdfUrl =
                languages[language].pdf;


            console.log(
                "Opening:",
                pdfUrl
            );


            /*
               DIRECT PDF REDIRECT

               No Continue button.
            */

            window.location.href =
                pdfUrl +
                "#toolbar=0&navpanes=0&scrollbar=1";

        }
    );

});


/* =========================================================
   LANGUAGE DROPDOWN
========================================================= */

languageSelect.addEventListener(
    "change",
    function() {

        const language =
            this.value;


        if (!languages[language]) {

            return;

        }


        changeLanguage(
            language
        );

    }
);


/* =========================================================
   OPEN PDF BUTTON
========================================================= */

openPdf.addEventListener(
    "click",
    function() {

        const pdfUrl =
            getPdfUrl(
                selectedLanguage
            );


        if (!pdfUrl) {

            return;

        }


        window.open(
            pdfUrl +
            "#toolbar=0&navpanes=0&scrollbar=1",
            "_blank"
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

}


/* =========================================================
   DOWNLOAD BUTTON
========================================================= */

downloadPdf.addEventListener(
    "click",
    function() {

        downloadPassword.value =
            "";

        passwordError.textContent =
            "";

        downloadPassword.type =
            "password";

        togglePassword.textContent =
            "👁";

        confirmDownload.disabled =
            false;

        confirmDownload.textContent =
            "Download";

        passwordModal.classList.remove(
            "hidden"
        );


        setTimeout(
            function() {

                downloadPassword.focus();

            },
            100
        );

    }
);


/* =========================================================
   CLOSE PASSWORD MODAL
========================================================= */

function closePasswordModal() {

    passwordModal.classList.add(
        "hidden"
    );

    downloadPassword.value =
        "";

    passwordError.textContent =
        "";

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
   CLOSE MODAL BY CLICKING OUTSIDE
========================================================= */

passwordModal.addEventListener(
    "click",
    function(event) {

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
   SHOW / HIDE PASSWORD
========================================================= */

togglePassword.addEventListener(
    "click",
    function() {

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
    function(event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            downloadDocument();

        }

    }
);


/* =========================================================
   DOWNLOAD DOCUMENT
========================================================= */

async function downloadDocument() {

    const enteredPassword =
        downloadPassword.value.trim();


    /* Empty password */

    if (!enteredPassword) {

        passwordError.textContent =
            "Please enter the password.";

        downloadPassword.focus();

        return;

    }


    /* Wrong password */

    if (
        enteredPassword !==
        DOWNLOAD_PASSWORD
    ) {

        passwordError.textContent =
            "❌ Incorrect password. Please try again.";

        downloadPassword.select();

        return;

    }


    /* Get selected document */

    const data =
        languages[selectedLanguage];


    if (!data) {

        passwordError.textContent =
            "Document not available.";

        return;

    }


    try {

        confirmDownload.disabled =
            true;

        confirmDownload.textContent =
            "Preparing...";


        passwordError.textContent =
            "";


        const response =
            await fetch(
                data.pdf,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "PDF could not be loaded."
            );

        }


        const blob =
            await response.blob();


        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            data.name +
            "-Documentation.pdf";


        link.style.display =
            "none";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(
            function() {

                window.URL.revokeObjectURL(
                    url
                );

            },
            1000
        );


        closePasswordModal();


    } catch (error) {

        console.error(
            "Download error:",
            error
        );


        passwordError.textContent =
            "Unable to download the document. Please try again.";

    }


    confirmDownload.disabled =
        false;

    confirmDownload.textContent =
        "Download";

}


/* =========================================================
   RIGHT CLICK PROTECTION
========================================================= */

document.addEventListener(
    "contextmenu",
    function(event) {

        event.preventDefault();

    }
);


/* =========================================================
   KEYBOARD PROTECTION
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        /* Ctrl + S */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "s"
        ) {

            event.preventDefault();

        }


        /* Ctrl + P */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "p"
        ) {

            event.preventDefault();

        }


        /* Ctrl + U */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "u"
        ) {

            event.preventDefault();

        }


        /* F12 */

        if (
            key === "f12"
        ) {

            event.preventDefault();

        }


        /* Developer tools */

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
    function(event) {

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
    function(event) {

        event.preventDefault();

    }
);

