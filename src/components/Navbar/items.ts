import { NavItem } from "./types";

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Leaderboard",
    href: "#/"
  },
  {
    label: "My Steads",
    href: "#/mysteads"
  },
  {
    label: "Ressources",
    children: [
      {
        label: "RareTown programs on GitHub",
        subLabel: "Solana program repo",
        href: "https://github.com/Dodecahedr0x/rare-town",
        newTab: true,
      },
      {
        label: "RareTown front-end on GitHub",
        subLabel: "Front-end repo",
        href: "https://github.com/Dodecahedr0x/rare-town-frontend",
        newTab: true,
      },
      {
        label: "SolSteads",
        subLabel: "SolSteads official website",
        href: "https://solsteads.com/",
        newTab: true,
      },
      {
        label: "SolSteads Discord",
        subLabel: "SolSteads official Discord server",
        href: "https://discord.gg/tbZe5jyx",
        newTab: true,
      },
    ],
  },
];

export default NAV_ITEMS;
