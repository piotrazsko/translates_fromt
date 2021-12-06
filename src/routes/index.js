import {
    Home,
    TranslatesManager,
    EditTranslate,
    Auth,
    LayoutEmpty,
    SignUp,
    ConfirmLink,
    Profile,
    Settings,
    APIPage,
} from 'containers';
import HomeLayout from '../containers/Home/Layout';

export const redirectAuthPath = '/auth';

//* layout used for   set layouts for pages
//* if layout ===  false   we use page without layout
//* if layout is  react elemen - we use it
const mainRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
        showHeader: true,
        showSidebar: false,
        layout: HomeLayout,
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
    {
        path: '/profile',
        exact: true,
        component: Profile,
        isPrivate: true,
    },
    {
        path: '/settings',
        exact: true,
        component: Settings,
        isPrivate: true,
    },
    {
        path: '/api',
        exact: true,
        component: APIPage,
        isPrivate: true,
    },
];
export default [].concat(mainRoutes);
