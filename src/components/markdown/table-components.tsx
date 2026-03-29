import { cn } from "@/src/utils/tw";
import { ComponentProps } from "@m2d/react-markdown/utils";

export function table({
  children,
  className,
  ...props
}: Readonly<ComponentProps>) {
  return (
    <table
      {...(props as React.HTMLAttributes<HTMLTableElement>)}
      className={cn(
        "table-auto w-full border-separate border-spacing-0 border border-gray-200 rounded-lg my-6 shadow-xs overflow-hidden [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:last-child_th]:border-b-0",
        className,
      )}
    >
      {children}
    </table>
  );
}

export function th({
  children,
  className,
  ...props
}: Readonly<ComponentProps>) {
  return (
    <th
      {...(props as React.HTMLAttributes<HTMLTableCellElement>)}
      className={cn(
        "px-3 py-2 font-mono font-semibold border-b border-r border-gray-200 last:border-r-0",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function td({
  children,
  className,
  ...props
}: Readonly<ComponentProps>) {
  return (
    <td
      {...(props as React.HTMLAttributes<HTMLTableCellElement>)}
      className={cn(
        "px-3 py-2 border-b border-r border-gray-200 last:border-r-0 last-row:border-b-0",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function tr({
  children,
  className,
  ...props
}: Readonly<ComponentProps>) {
  return (
    <tr
      {...(props as React.HTMLAttributes<HTMLTableRowElement>)}
      className={cn(
        // "in-[tbody]:hover:bg-gray-50",
        "transition-colors in-[thead]:bg-gray-50",
        className,
      )}
    >
      {children}
    </tr>
  );
}
