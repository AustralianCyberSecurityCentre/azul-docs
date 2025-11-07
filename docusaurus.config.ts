import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Azul Docs",
  tagline: "Malware repository, analytical engine and clustering suite",
  favicon: "img/azul-ico-glitched.192.95a31191.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: true,
  },

  // Set the production url of your site here
  url: "https://asd-azul.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "asd-azul", // Usually your GitHub org/user name.
  projectName: "asd-azul.github.io", // Usually your repo name.



  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en-AU",
    locales: ["en-AU"],
  },

  plugins: [["docusaurus-lunr-search", {}]],

  themes: ["@docusaurus/theme-mermaid"],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Forcably mount these
          routeBasePath: "/",

          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Azul",
      logo: {
        alt: "Azul Logo",
        src: "img/azul-ico-glitched.light.svg",
        srcDark: "img/azul-ico-glitched.dark.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Overview",
        },
        {
          type: "docSidebar",
          sidebarId: "userGuideSidebar",
          position: "left",
          label: "User Guide",
        },
        {
          type: "docSidebar",
          sidebarId: "sysadminGuideSidebar",
          position: "left",
          label: "Sysadmin Guide",
        },
        {
          type: "docSidebar",
          sidebarId: "developerGuideSidebar",
          position: "left",
          label: "Developer Guide",
        },
        {
          href: "https://github.com/ASD-Azul/azul",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "ASD's ACSC's Logo",
        src: "img/ASD_ACSC_LOGO_stacked_white_cropped.png",
        href: "https://cyber.gov.au",
        height: "auto",
      },
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Commonwealth of Australia. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "yaml"],
    },
  },
};

export default config;
