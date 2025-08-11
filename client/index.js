import Alpine from "alpinejs";

Alpine.data("classic", () => ({
  search: "",
  selectedLanguageId: null,
  helloWorld: "",
  languageList: [],
  wrongList: [],
  loading: true,
  winner: false,
  primsClass: "",
  init() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.languageList = data.languages;
        this.helloWorld = data.helloWorld;
        this.primsClass = `language-${data.language}`;

        this.$nextTick(() => {
          Prism.highlightElement(this.$root.querySelector("code"));
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => (this.loading = false));
  },

  get filteredLanguages() {
    return this.languageList.filter((i) =>
      i.toLowerCase().includes(this.search.toLowerCase())
    );
  },

  selectLanguage(language) {
    this.selectedLanguageId = language;
    this.postToApi(language);
  },

  postToApi(language) {
    console.log(language);
    fetch("http://localhost:3000/selectedLanguage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedLanguage: language }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.pass === true) {
          //this.$store.wonFirstChallenge.won = true;
        } else {
          console.log(data);
          this.languageList.filter((item) => item !== data.language);
          this.wrongList.push(data.language);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
})),
  Alpine.data("logoGame", () => ({})),
  Alpine.data("app", {
    chalanges: [],
    showModal: false,
    init() {},
  });

Alpine.start();
