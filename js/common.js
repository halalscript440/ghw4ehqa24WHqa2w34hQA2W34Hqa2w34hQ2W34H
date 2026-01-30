const awesomeEffect = (dict) => {
  let container = dict.el;
  let randomChars = "";
  let text = dict.text;
  let possible = dict.possible
    ? dict.possible
    : 'ABCDEFASIRUWJFCKSJHYWRKJEsdfskdjfk-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}';
  let delay = dict.delay ? dict.delay : 75;

  const generateRandomTitle = (i, randomChars) => {
    setTimeout((_) => {
      container.innerText = randomChars;
    }, i * delay);
  };

  for (let i = 0; i < text.length + 1; i++) {
    randomChars = text.substr(0, i);
    for (let j = i; j < text.length; j++) {
      randomChars += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );
    }
    generateRandomTitle(i, randomChars);
    randomChars = "";
  }
};

window.addEventListener("load", init);

function init() {
  document.querySelector(".preloader > div").style.borderTopColor =
    config.preloaderColor;
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("loaded");
  }, config.preloaderDelay * 1000);
  let app = new Vue({
    el: "#asif-page",

    data: {
      title: config.title,
      titleVisible: false,
      copyrightText: "",
      copyrightArray: Array.isArray(config.copyrightText)
        ? config.copyrightText
        : [config.copyrightText],
      lastCopyrightText: "",
      social: config.social,
      isPlaying: false,
      titleEffectInterval: null,
      copyrightEffectInterval: null,
      titleColor: config.titleColor,
      titleShadowColor: config.titleShadowColor,
      copyrightTextColor: config.copyrightTextColor,
      socialColor: config.socialColor,
      socialShadowColor: config.socialShadowColor,
      playButtonColor: config.playButtonColor,
      playButtonShadowColor: config.playButtonShadowColor,
      preloaderColor: config.preloaderColor,

      SOCIAL: {
        telegram(data) {
          let username = data.trim();
          return `https://t.me/` + username;
        },

        telegramchannel(data) {
          let channelId = data.trim();
          return `https://t.me/` + channelId;
        },

        steam(data) {
          let username = data.trim();
          return `https://steamcommunity.com/id/` + username;
        },

        soundcloud(data) {
          let username = data.trim();
          return `https://soundcloud.com/` + username;
        },

        instagram(data) {
          let username = data.trim();
          return `https://www.instagram.com/` + username;
        },

        twitch(data) {
          let username = data.trim();
          return `https://www.twitch.tv/` + username;
        },
      },
    },

    methods: {
      stopPlay() {
        this.isPlaying = false;
        this.titleVisible = false;
      },

      startPlay() {
        let video = this.$refs["background-video"];
        let title = this.$refs["title"];
        let playBtn = document.querySelector(".asif-page-info-play");

        playBtn.classList.add("glitching");
        setTimeout(() => {
          playBtn.classList.remove("glitching");
        }, 200);

        this.$refs["background-video"].play();
        this.$refs["background-video"].muted = false;
        this.isPlaying = true;

        setTimeout(() => {
          this.titleVisible = true;
          awesomeEffect({
            el: title,
            text: this.title,
          });

          if (this.titleEffectInterval) clearInterval(this.titleEffectInterval);

          setTimeout(() => {
            startTitleGlitchEffect();
            startArsGlitchEffect();
          }, 1000);

          if (this.copyrightEffectInterval)
            clearInterval(this.copyrightEffectInterval);
          let changeCopyright = () => {
            let newText = getRandomCopyrightText();

            while (newText === this.lastCopyrightText) {
              newText = getRandomCopyrightText();
            }

            this.lastCopyrightText = newText;
            this.copyrightText = newText;

            const el = document.querySelector(".asif-page-copyright");
            if (el) {
              awesomeEffect({
                el: el,
                text: this.copyrightText,
              });
            }
          };

          let getRandomCopyrightText = () => {
            return this.copyrightArray[
              Math.floor(Math.random() * this.copyrightArray.length)
            ];
          };

          this.copyrightEffectInterval = setInterval(() => {
            changeCopyright();
          }, 5000);
        }, config.showDelay * 1000);
      },

      getSocialLink(type, username) {
        return this.SOCIAL[type](username);
      },
    },

    mounted() {
      let video = this.$refs["background-video"];

      video.addEventListener("ended", (e) => {
        this.stopPlay();
      });

      let newText =
        this.copyrightArray[
          Math.floor(Math.random() * this.copyrightArray.length)
        ];
      this.copyrightText = newText;
      awesomeEffect({
        el: document.querySelector(".asif-page-copyright"),
        text: newText,
      });

      randomPlayButtonGlitch();
    },

    computed: {
      TitleStyle() {
        return {
          color: this.titleColor,
          textShadow: `0 0 5px ${this.titleShadowColor}, 0 0 10px ${this.titleShadowColor}, 0 0 20px ${this.titleShadowColor}, 0 0 40px #00aaff`,
        };
      },

      CopyRightStyle() {
        return {
          color: this.copyrightTextColor,
        };
      },

      SocialStyle() {
        return {
          color: this.socialColor,
          textShadow: "none",
        };
      },

      PlayButtonStyle() {
        return {
          color: this.playButtonColor,
          textShadow: "none",
        };
      },
    },
  });
}

const titleReplacements = {
  s: ["$", "5", "§", "z"],
  t: ["7", "+", "†", "T"],
  o: ["0", "ø", "()", "o"],
  r: ["®", "?", "|2", "R"],
  m: ["^^", "nn", "|v|", "M"],
};

const arsReplacements = {
  a: ["@", "4", "∆", "λ", "Д"],
  r: ["®", "Я", "|2", "π", "Г"],
  s: ["$", "5", "§", "z", "ᵴ"],
};

function generateStormGlitch(text) {
  let newString = "";
  for (let char of text.toLowerCase()) {
    if (Math.random() > 0.3 && titleReplacements[char]) {
      const options = titleReplacements[char];
      const randomChar = options[Math.floor(Math.random() * options.length)];
      newString += randomChar;
    } else {
      newString += char;
    }
  }
  return newString;
}

function startTitleGlitchEffect() {
  const titleEl = document.querySelector(".asif-page-info-title");
  if (!titleEl || !titleEl.classList.contains("title-visible")) return;

  const originalText = config.title;
  const glitchDuration = 2000;
  const frameSpeed = 100;
  const staticDuration = 3000;

  titleEl.classList.add("glitching");
  const startTime = Date.now();

  const interval = setInterval(() => {
    if (Date.now() - startTime > glitchDuration) {
      clearInterval(interval);
      titleEl.textContent = originalText;
      titleEl.classList.remove("glitching");
      setTimeout(startTitleGlitchEffect, staticDuration);
    } else {
      titleEl.textContent = generateStormGlitch(originalText);
    }
  }, frameSpeed);
}

function randomPlayButtonGlitch() {
  const playBtn = document.querySelector(".asif-page-info-play");
  if (!playBtn || playBtn.classList.contains("is-playing")) return;

  playBtn.classList.add("glitching");

  setTimeout(() => {
    playBtn.classList.remove("glitching");
  }, 200);

  const nextGlitchTime = Math.random() * 6000 + 2000;
  setTimeout(randomPlayButtonGlitch, nextGlitchTime);
}

function startArsGlitchEffect() {
  const arsEl = document.querySelector(".ars-link");
  if (!arsEl) return;

  const arsContainer = document.querySelector(".asif-page-info-ars");
  if (!arsContainer || !arsContainer.classList.contains("ars-visible")) {
    setTimeout(startArsGlitchEffect, 500);
    return;
  }

  const letters = ["a", "r", "s"];
  const original = ["A", "R", "S"];
  let currentIndex = 0;

  function glitchNextLetter() {
    if (currentIndex >= letters.length) {
      currentIndex = 0;
      setTimeout(glitchNextLetter, 2000);
      return;
    }

    const letter = letters[currentIndex];
    const options = arsReplacements[letter];
    const glitchChar = options[Math.floor(Math.random() * options.length)];

    let text = "";
    for (let i = 0; i < letters.length; i++) {
      if (i === currentIndex) {
        text += glitchChar;
      } else {
        text += original[i];
      }
    }

    arsEl.textContent = text;
    arsEl.classList.add("glitching");

    setTimeout(() => {
      arsEl.textContent = "ARS";
      arsEl.classList.remove("glitching");
      currentIndex++;
      setTimeout(glitchNextLetter, 400);
    }, 300);
  }

  glitchNextLetter();
}
