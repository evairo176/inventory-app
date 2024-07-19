export const permissions = [
  {
    model: "Dashboard",
    permissions: [
      {
        display: "Dashboard",
        name: "canAccessDashboard",
      },
    ],
  },
  {
    model: "Brands",
    permissions: [
      {
        display: "View",
        name: "canViewBrands",
      },
      {
        display: "Add",
        name: "canAddBrands",
      },
      {
        display: "Update",
        name: "canUpdateBrands",
      },
      {
        display: "Delete",
        name: "canDeleteBrands",
      },
    ],
  },
  {
    model: "Categories",
    permissions: [
      {
        display: "View",
        name: "canViewCategories",
      },
      {
        display: "Add",
        name: "canAddCategories",
      },
      {
        display: "Update",
        name: "canUpdateCategories",
      },
      {
        display: "Delete",
        name: "canDeleteCategories",
      },
    ],
  },
];
