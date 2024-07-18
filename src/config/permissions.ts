export const permissions = [
  {
    model: "Dashboard",
    permissions: [
      {
        display: "All",
        name: "canManageDashboard",
      },
    ],
  },
  {
    model: "Brands",
    permissions: [
      {
        display: "All",
        name: "canManageBrands",
      },
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
        display: "All",
        name: "canManageCategories",
      },
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
