export const adminSidebarData = [
  {
    id: 0,
    title: 'dashboard',
    path: '/admin/dashboard',
  },
  {
    id: 15333,
    title: 'Category',
    child: [
      {
        id: 22436,
        title: 'View Category',
        path: '/admin/category',
      },
      {
        id: 28424,
        title: 'Add Category',
        path: '/admin/category-create',
      },
    ],
  },
  {
    id: 1,
    title: 'Product',
    child: [
      {
        id: 22436,
        title: 'View Product',
        path: '/admin/product',
      },
      {
        id: 28424,
        title: 'Add Product',
        path: '/admin/product-create',
      },
    ],
  },
  {
    id: 3840,
    title: 'Orders',
    child: [
      {
        id: 28424,
        title: 'Orders',
        path: '/admin/orders',
      },
    ],
  },

  {
    id: 33420,
    title: 'Users',
    child: [
      {
        id: 33495,
        title: 'Users',
        path: '/admin/users',
      },
    ],
  },
];

export const orderStatusOptions = [
  {
    label: 'PENDING',
    value: 'PENDING',
  },
  {
    label: 'DISPATCHED',
    value: 'DISPATCHED',
  },
  {
    label: 'COMPLETED',
    value: 'COMPLETED',
  },
  {
    label: 'CANCELED',
    value: 'CANCELED',
  },
];

export const termsConditions = [
  {
    sectionTitle: '1. Your Account',
    content:
      'You are responsible for keeping your account login details safe and for all activity under your account.',
  },
  {
    sectionTitle: '2. Products & Prices',
    content:
      'We try to make sure all product info and prices are accurate, but mistakes can happen. We can correct errors and may limit product quantities. Products are subject to seasonal availability.',
  },
  {
    sectionTitle: '3. Orders & Payment',
    content:
      'Placing an order is your offer to buy. Your order is final once you receive a confirmation email from us. All payments are processed securely through Khalti.',
  },
  {
    sectionTitle: '4. Delivery',
    content:
      'We deliver to areas within the Kathmandu Valley. We will do our best to deliver on time, but delays can sometimes happen.',
  },
  {
    sectionTitle: '5. Returns & Refunds',
    content:
      'Because we sell fresh food, we generally do not accept returns or offer refunds unless your order arrives damaged, spoiled, or is incorrect. If this happens, please contact us within 24 hours of delivery.',
  },
];
