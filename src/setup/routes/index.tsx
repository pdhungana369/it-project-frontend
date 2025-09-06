import {
  Refund,
  AdminDashboard,
  AdminLogin,
  Home,
  Profile,
  AdminSettings,
  AdminPayments,
  AdminUsers,
  TermsConditions,
  PrivacyPolicy,
  Services,
  Service,
  AdminCategoryCreate,
  AdminCategory,
  AdminProduct,
  AdminAddProduct,
  Cart,
  OrderSuccess,
  AdminOrders,
  AdminOrdersPreview,
  AboutUs,
  ContactUs,
  // AdminCart,
} from '@pages';

export const adminRoutes = [
  {
    id: 0,
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    id: 1,
    path: '/admin/category',
    element: <AdminCategory />,
  },
  {
    id: 1333,
    path: '/admin/category-create',
    element: <AdminCategoryCreate />,
  },
  {
    id: 3,
    path: '/admin/product',
    element: <AdminProduct />,
  },
  {
    id: 6,
    path: '/admin/product-create',
    element: <AdminAddProduct />,
  },
  {
    id: 9,
    path: '/admin/setting',
    element: <AdminSettings />,
  },
  {
    id: 1223,
    path: '/admin/payments',
    element: <AdminPayments />,
  },
  {
    id: 400,
    path: '/admin/users',
    element: <AdminUsers />,
  },
  {
    id: 2121,
    path: '/admin/orders',
    element: <AdminOrders />,
  },

  {
    id: 2121,
    path: '/admin/order-preview',
    element: <AdminOrdersPreview />,
  },
];

export const userRoutes = [
  {
    id: 2420,
    path: '/profile',
    element: <Profile />,
  },

  {
    id: 2121,
    path: '/cart',
    element: <Cart />,
  },
  {
    id: 2121,
    path: '/order-success',
    element: <OrderSuccess />,
  },
];

export const publicPageRoutes = [
  {
    id: 0,
    path: '/',
    element: <Home />,
  },
  {
    id: 10,
    path: '/terms-and-conditions',
    element: <TermsConditions />,
  },
  {
    id: 12,
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    id: 13,
    path: '/refund-policy',
    element: <Refund />,
  },
  {
    id: 14,
    path: '/about-us',
    element: <AboutUs />,
  },
  {
    id: 15,
    path: '/contact-us',
    element: <ContactUs />,
  },
  {
    id: 1,
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    id: 2,
    path: '/products',
    element: <Services />,
  },
  {
    id: 3,
    path: '/product/:id',
    element: <Service />,
  },
];
