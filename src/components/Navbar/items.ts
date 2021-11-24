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
    label: "Resources",
    children: [
      {
        label: "RareTown Programs On GitHub",
        subLabel: "Solana program repo",
        href: "https://github.com/Dodecahedr0x/rare-town-programs",
        newTab: true,
      },
      {
        label: "RareTown Front-End On GitHub",
        subLabel: "Front-end repo",
        href: "https://github.com/Dodecahedr0x/rare-town-frontend",
        newTab: true,
      },
      {
        label: "SolSteads",
        subLabel: "SolSteads Official Website",
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
