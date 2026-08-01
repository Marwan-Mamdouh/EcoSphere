import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  localePrefix: "always", // Show locale prefix for all languages (en, ar, fr)
});

const nav = createNavigation(routing);
export const usePathname = nav.usePathname;
export const useRouter = nav.useRouter;
const Link = nav.Link;
const redirect = nav.redirect;
const getPathname = nav.getPathname;
