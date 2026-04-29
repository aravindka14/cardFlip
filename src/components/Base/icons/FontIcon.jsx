import { FiUploadCloud } from "react-icons/fi";
import { FiFile } from "react-icons/fi";

const iconMap = {
  uploadCloud: FiUploadCloud,
  file: FiFile,
};

const FontIcon = ({
  iconName,
  color = "#000",
  size = "16px",
  display = "inline",
  verticalAlign = "text-bottom",
  margin = "0.25rem",
}) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null;
  return (
    <IconComponent
      style={{
        color,
        fontSize: size,
        display: display,
        verticalAlign: verticalAlign,
        margin: margin,
      }}
    />
  );
};
export default FontIcon;
