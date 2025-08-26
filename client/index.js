import Alpine from "alpinejs";
import persist from '@alpinejs/persist'

//Plugins
Alpine.plugin(persist)

//Directives

//Stores & Binds
Alpine.store('wonChallangeStore', {
    won: Alpine.$persist(false).as('won_game')
});

Alpine.store("eastereggsStore", {
  easterEggsList: {
    autoGuess: Alpine.$persist(false).as('auto_guess'),
    alwaysShowTip: Alpine.$persist(false).as('always_show_tip'),
    flappyBird: Alpine.$persist(false).as('flappy_bird'),
    pong: Alpine.$persist(false).as('pong'),
    dinossaur: Alpine.$persist(false).as('dinossaur'),
  }
});

// App
Alpine.data("AppData", () => ({
  search: "",
  helloWorld: "",
  languageList: [],
  wrongList: [],
  loading: true,
  winner: false,
  primsClass: "",
  selectedIndex: 0,
  selectedFile: "helloworld",
  selectedTerminal: "game",
  selectedLanguage: "",
  init() {
    fetch(import.meta.env.VITE_BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.languageList = data.languages;
        this.helloWorld = data.helloWorld;
        this.primsClass = `language-${data.language}`;

        this.$nextTick(() => {
          Prism.highlightElement(this.$root.querySelector("code"));
          const terminalInput = document.querySelector(".terminal-input");
          if (terminalInput) {
            terminalInput.focus();
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => (this.loading = false));
  },
  handleEnterKey() {
    if (this.search.trim().length > 0) {
      if (this.filteredLanguages.length > 0) {
        this.selectLanguage(
          this.filteredLanguages[this.selectedIndex] ||
            this.filteredLanguages[0]
        );
      }
    }
    this.search = "";
  },
  get filteredLanguages() {
    return this.languageList
      .filter((i) => !this.wrongList.includes(i))
      .filter((i) => i.toLowerCase().includes(this.search.toLowerCase()));
  },
  selectLanguage(_value) {
    console.log(_value)
    if (_value.trim() === "") return;
    this.postToApi(_value);
    this.$refs.gameTerminalContainer.scrollTop = this.$refs.gameTerminalContainer.scrollHeight;

    this.$nextTick(() => {
      const terminalInput = document.querySelector(".terminal-input");
      if (terminalInput) {
        terminalInput.focus();
        this.search = "";
      }
    });
  },
  handleSelectLanguageOnList(_value) {
    this.selectedIndex += _value;
    if (this.selectedIndex === -1) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex >= 4) {
      this.selectedIndex = 0;
    }
  },
  postToApi(language) {
    this.selectedLanguage = language;
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
          this.$store.wonChallangeStore.won = true;
          this.$ref.wonContainer.addClass = "emitter";
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

//Componentes
Alpine.data("ThemeData", function (){
  return {
    init(){
      this.applyTheme();
    },
    showThemeList: false,
    themeList: ["Dark","Light","Dracula","Twilight"],
    selectedTheme: this.$persist("Dark").as('theme'),
    selectTheme(_theme){
      this.selectedTheme = _theme.toLowerCase();
      this.applyTheme();
      this.$nextTick(() => {
        this.showThemeList = false;
      })
    },
    applyTheme(){
      document.body.className = "";
      document.body.classList.add(`theme-${this.selectedTheme}`);
    }
  }
})

Alpine.data("TerminalData", () => ({

}))

Alpine.start();
