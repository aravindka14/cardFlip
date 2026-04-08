import { cn } from "../utils/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  subTitle: string;
  tags: string[];
  features: string[];
  footer: string[];
  detailedDescription: string;
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  title,
  subTitle,
  tags,
  description,
  features,
  footer,
  detailedDescription,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: "group-hover:[transform:rotateX(180deg)]",
    y: "group-hover:[transform:rotateY(180deg)]",
  };

  return (
    <div
      className={cn(
        "group h-[430px] w-[320px] [perspective:1000px]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 transform [transform-style:preserve-3d]",
          rotationClass[rotate],
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden] rounded-2xl bg-black p-6 text-white [transform:rotateY(0deg)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-400">{subTitle}</p>
          </div>

          <div className="flex gap-2 mb-4">
            {tags?.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 text-xs rounded-md bg-gray-800"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-300 mb-4">{description}</p>

          <ul className="mb-4">
            {features.map((item, index) => (
              <li key={index} className="text-sm text-gray-300">
                <span>* {item}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-700 my-4" />

          <p className="text-xs text-gray-500 mb-3">USE WITH RAILWAY</p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {footer?.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 text-xs rounded-md bg-gray-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-black p-6 text-white [backface-visibility:hidden]",
            rotate === "y"
              ? "[transform:rotateY(180deg)]"
              : "[transform:rotateX(180deg)]",
          )}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-400">{subTitle}</p>
          </div>
          <div>
            <p className="text-sm">{detailedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
