const languagesData = require("../db/languages.json");

function Challenge() {
    const programmingLanguages = languagesData;
    const languageNames = programmingLanguages.map(lang => lang.name);
    const randomIndex = Math.floor(Math.random() * programmingLanguages.length);
    const selectedLanguage = programmingLanguages[randomIndex];
    console.log(selectedLanguage);
    const dayChallenge = {
        helloWorld: selectedLanguage.code,
        language: selectedLanguage.name.toLowerCase(),
        markup: selectedLanguage.markup,
        languages: languageNames,
    };

    return dayChallenge;
}

module.exports = { Challenge };
