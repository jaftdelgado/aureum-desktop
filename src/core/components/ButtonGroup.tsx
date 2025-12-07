import React, {
  type ReactNode,
  type ReactElement,
  isValidElement,
  cloneElement,
} from "react";
import clsx from "clsx";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = "",
  vertical = false,
}) => {
  const items = React.Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<{ className?: string }>[];

  const modifiedChildren = items.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const isMiddle = !isFirst && !isLast;

    const childClass = clsx(
      vertical
        ? {
            "rounded-t-xl": isFirst,
            "rounded-b-xl": isLast,
            "rounded-none": isMiddle,
            "rounded-b-none": isFirst,
            "rounded-t-none": isLast,
          }
        : {
            "rounded-l-xl": isFirst,
            "rounded-r-xl": isLast,
            "rounded-none": isMiddle,
            "rounded-r-none": isFirst,
            "rounded-l-none": isLast,
          }
    );

    return cloneElement(child, {
      className: clsx(child.props.className, childClass),
    });
  });

  const classes = clsx(
    "inline-flex",
    vertical ? "flex-col" : "flex-row",
    "rounded-xl overflow-hidden",
    vertical ? "divide-y" : "divide-x",
    "divide-outline bg-transparent",
    className
  );

  return <div className={classes}>{modifiedChildren}</div>;
};
