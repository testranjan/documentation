// ====================================
// GET HTML ELEMENTS
// ====================================

const languageSelect =
    document.getElementById("languageSelect");

const pdfViewer =
    document.getElementById("pdfViewer");

const documentTitle =
    document.getElementById("documentTitle");

const documentDescription =
    document.getElementById("documentDescription");

const openPdf =
    document.getElementById("openPdf");


// ====================================
// LANGUAGE DATA
// ====================================

const languages = {

    english: {

        title:
            "English Documentation",

        description:
            "Pre-Training Outlet Visit & Awareness Program",

        pdf:
            "pdf/english.pdf"

    },


    japanese: {

        title:
            "日本語ドキュメント",

        description:
            "事前研修店舗訪問・意識向上プログラム",

        pdf:
            "pdf/japanese.pdf"

    },


    nepali: {

        title:
            "नेपाली दस्तावेज",

        description:
            "पूर्व-प्रशिक्षण आउटलेट भ्रमण तथा सचेतना कार्यक्रम",

        pdf:
            "pdf/nepali.pdf"

    },


    hindi: {

        title:
            "हिन्दी दस्तावेज़",

        description:
            "प्री-ट्रेनिंग आउटलेट विज़िट एवं जागरूकता कार्यक्रम",

        pdf:
            "pdf/hindi.pdf"

    }

};


// ====================================
// CHANGE LANGUAGE FUNCTION
// ====================================

function changeLanguage(language) {

    const selectedLanguage =
        languages[language];


    // Change document title

    documentTitle.textContent =
        selectedLanguage.title;


    // Change description

    documentDescription.textContent =
        selectedLanguage.description;


    // Change PDF inside viewer

    pdfViewer.src =
        selectedLanguage.pdf;


    // Change Open PDF button

    openPdf.href =
        selectedLanguage.pdf;


    // Save selected language

    localStorage.setItem(
        "selectedLanguage",
        language
    );

}


// ====================================
// LANGUAGE SELECT EVENT
// ====================================

languageSelect.addEventListener(
    "change",
    function () {

        changeLanguage(
            this.value
        );

    }
);


// ====================================
// LOAD SAVED LANGUAGE
// ====================================

const savedLanguage =
    localStorage.getItem(
        "selectedLanguage"
    );


if (
    savedLanguage &&
    languages[savedLanguage]
) {

    languageSelect.value =
        savedLanguage;


    changeLanguage(
        savedLanguage
    );

}