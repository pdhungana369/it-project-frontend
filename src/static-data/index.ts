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
    sectionTitle: '1. Eligibility',
    content:
      'This Website is intended for use by registered businesses in the pharmaceutical industry. By using our Website, you confirm that you are a legitimate business entity and have the authority to bind your organization to these terms.',
  },
  {
    sectionTitle: '2. Account Registration',
    content:
      'To place orders, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use or security breaches.',
  },
  {
    sectionTitle: '3. Product Orders',
    content:
      'All orders are subject to product availability and approval by Oshwal Lifesciences Ltd. We reserve the right to cancel or refuse any order at our discretion. Prices are subject to change without notice.',
  },
  {
    sectionTitle: '4. Payment Terms',
    content:
      'Payment can be made via M-Pesa or Credit Order. For credit orders, payment terms must be agreed upon in advance and are subject to credit approval. Late payments may incur penalties or suspension of services.',
  },
  {
    sectionTitle: '5. Delivery',
    content:
      'Delivery timelines are estimates and may vary based on product availability and location. Risk of loss or damage to products transfers to you upon delivery.',
  },
  {
    sectionTitle: '6. Returns and Refunds',
    content:
      'Returns are only accepted for damaged or defective products. Refunds will be processed within 20 days of receiving the returned product and verifying the issue. Refunds will be issued through the original payment method (e.g., M-Pesa or credit account).',
  },
  {
    sectionTitle: '7. Intellectual Property',
    content:
      'All content on this Website, including logos, trademarks, and product information, is the property of Oshwal Lifesciences Ltd. and is protected by intellectual property laws. Unauthorized use of any content is strictly prohibited.',
  },
  {
    sectionTitle: '8. Limitation of Liability',
    content:
      'We are not liable for any indirect, incidental, or consequential damages arising from the use of our Website or products.',
  },
  {
    sectionTitle: '9. Governing Law',
    content:
      'These terms are governed by the laws of Kenya. Any disputes shall be resolved through arbitration or in the courts of Nairobi.',
  },
  {
    sectionTitle: '10. Amendments',
    content:
      'We reserve the right to update these terms at any time. Continued use of our Website constitutes acceptance of the revised terms.',
  },
];
