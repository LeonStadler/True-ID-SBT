export type SiteConfig = typeof siteConfig

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "TrueID SBT"

export const siteConfig = {
  name: APP_NAME,
  description: "SBT University Degrees",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "",
    github: "https://github.com/LeonStadler",
    docs: "",
  },
}
