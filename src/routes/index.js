import { Home, TranslatesManager, EditTranslate } from "containers";

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
  {
    path: "/translates/:id?",
    exact: true,
    component: EditTranslate,
  },
];
export default [].concat(mainRoutes);
