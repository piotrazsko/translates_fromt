import {
    Home,
    TranslatesManager,
    TranslateEdit,
    Auth,
    LayoutEmpty,
    SignUp,
    ConfirmLink,
    Profile,
    Settings,
    APIPage,
    Docs,
    Billing,
    Dashboard,
    Applications,
    ApplicationEdit,
    Plans,
} from 'containers';
import HomeLayout from '../containers/Home/Layout';

export const redirectAuthPath = '/login';

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
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        showHeader: true,
        showSidebar: true,
    },
    {
        path: '/applications',
        exact: true,
        component: Applications,
        showHeader: true,
        showSidebar: true,
    },
    {
        path: '/applications/:id',
        exact: true,
        component: ApplicationEdit,
        showHeader: true,
        showSidebar: true,
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
        // isPrivate: true,
        showHeader: true,
        showSidebar: true,
    },
    {
        path: '/translates/:applicationId/:id?',
        exact: true,
        isPrivate: true,
        component: TranslateEdit,
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
        path: '/docs',
        exact: true,
        component: Docs,
        isPrivate: true,
    },
    {
        path: '/billing',
        exact: true,
        component: Billing,
        isPrivate: true,
    },
    {
        path: '/update-plan',
        exact: true,
        component: Plans,
        isPrivate: true,
    },
];
export default [].concat(mainRoutes);
