import {
    Home,
    TranslatesManager,
    EditTranslate,
    Auth,
    LayoutEmpty,
    SignUp,
    ConfirmLink,
} from 'containers';

export const redirectAuthPath = '/auth';

//* layout used for   set layouts for pages
//* if layout ===  false   we use page without layout
//* if layout is  react elemen - we use it
const mainRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/translates',
        exact: true,
        component: TranslatesManager,
        isPrivate: true,
        showHeader: true,
        showSidebar: true,
    },
    {
        path: '/confirm-link',
        exact: true,
        component: ConfirmLink,
        isPrivate: true,
        showHeader: true,
        showSidebar: true,
    },
    {
        path: '/translates/:id?',
        exact: true,
        isPrivate: true,
        component: EditTranslate,
    },
    {
        path: '/login',
        exact: true,
        component: Auth,
        layout: LayoutEmpty,
    },
    {
        path: '/register',
        exact: true,
        component: SignUp,
        layout: LayoutEmpty,
    },
];
export default [].concat(mainRoutes);
