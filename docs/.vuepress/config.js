const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "keeperdog",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  dest: "./docs/dist",
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: true,
    displayAllHeaders: true,
    logo: "/2.jpeg",
    nav: [
      {
        text: "Frontend",
        link: "/frontend/",
      },
      {
        text: "Sharing",
        link: "/sharing/",
      },
      {
        text: "Resume",
        link: "/resume/",
      },
      {
        text: "LLM",
        link: "/llm/",
      },
      // {
      //   text: "Config",
      //   link: "/config/",
      // },
      // {
      //   text: "VuePress",
      //   link: "https://v1.vuepress.vuejs.org",
      // },
    ],
    sidebar: {
      "/frontend/": [
        {
          title: "",
          collapsable: false,
          children: [
            "",
            "react",
            "hld-design",
            "performance",
            "http",
            "browser",
            "security",
            "webpack",
          ],
        },
      ],
      "/sharing/": [
        {
          title: "",
          collapsable: false,
          children: ["", "english"],
        },
      ],
      "/resume/": [
        {
          title: "",
          collapsable: false,
          children: ["", "english"],
        },
      ],

      "/llm/": [
        {
          title: "",
          collapsable: false,
          children: [""],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
