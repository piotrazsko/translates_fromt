import { Home, TranslatesManager } from "containers";

export const redirectAuthPath = "/auth";

//* layout used for   set layouts for pages
//* if layout ===  false   we use page without layout
//* if layout is  react elemen - we use it
const mainRoutes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/translates",
    exact: true,
    component: TranslatesManager,
  },
];
export default [].concat(mainRoutes);
