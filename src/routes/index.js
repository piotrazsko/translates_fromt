import { Home, PDF } from "containers";

export const redirectAuthPath = "/auth";

//* layout used for   set layouts for pages
//* if layout ===  false   we use page without layout
//* if layout is  react elemen - we use it
const mainRoutes = [
  {
    path: "/",
    exact: true,
    component: Home,

    showProfile: true,
    // layout: Tutorial,
  },
  {
    path: "/pdf",
    exact: true,
    component: PDF,
    isPDF: true,
    showProfile: false,
    // layout: Tutorial,
  },
];
export default [].concat(mainRoutes);
