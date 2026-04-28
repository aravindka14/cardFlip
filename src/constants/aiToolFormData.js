export const aiToolsFormFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    type: "text",
    required: true,
  },
  {
    name: "tags",
    label: "Tags",
    type: "array", // custom type
    placeholder: "Enter tags (press Enter)",
    required: true,
  },
  {
    name: "description",
    label: "Short Description",
    type: "textarea",
    required: true,
  },
  {
    name: "detailedDescription",
    label: "Detailed Description",
    type: "textarea",
    required: true,
  },
  {
    name: "features",
    label: "Features",
    type: "array",
    placeholder: "Enter features",
    required: true,
  },
  {
    name: "footer",
    label: "Footer",
    type: "array",
    placeholder: "Enter footer items",
    required: true,
  },
];