import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dot, Home, Plus } from "lucide-react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { sidebarLinks } from "@/config/sidebar";

export default function QuickAccessMenuButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="ghost"
          className="border border-gray-200 dark:border-gray-800"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen max-w-md">
        <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3 lg:gap-2">
          <div>
            <div className="flex items-center text-xs font-medium tracking-tight">
              <Home className="mr-2 h-4 w-4" />
              General
            </div>
            {sidebarLinks
              ?.filter(
                (sidebar) => !sidebar.dropdown && sidebar.href !== "/dashboard",
              )
              .map((row) => {
                return (
                  <Link
                    href={row.href as string}
                    key={row.title}
                    className="group relative flex items-center gap-x-2 rounded-lg bg-card p-2 text-card-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="mt-1 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-card">
                      <Dot
                        className="h-4 w-4  group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {row.title}
                        <span className="absolute inset-0" />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          {sidebarLinks
            .filter((sidebar) => sidebar.dropdown)
            .map((row, key) => {
              const Icon = row.icon;
              return (
                <div key={key}>
                  <div className="flex items-center text-xs font-medium tracking-tight">
                    <Icon className="mr-2 h-4 w-4" />
                    {row.title}
                  </div>
                  {row.dropdown &&
                    row.dropdownMenu?.map((item) => (
                      <Link
                        href={item.href}
                        key={item.title}
                        className="group relative flex items-center gap-x-2 rounded-lg bg-card p-2 text-card-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <div className="mt-1 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-card">
                          <Dot
                            className="h-4 w-4  group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {item.title}
                            <span className="absolute inset-0" />
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
