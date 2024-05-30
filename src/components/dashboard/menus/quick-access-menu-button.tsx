import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const menu = [
  {
    title: "General",
    links: [
      {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: ChartPieIcon,
      },
      {
        name: "Engagement",
        href: "#",
        icon: CursorArrowRaysIcon,
      },
      {
        name: "Security",
        href: "#",
        icon: FingerPrintIcon,
      },
      {
        name: "Integrations",
        href: "#",
        icon: SquaresPlusIcon,
      },
      {
        name: "Automations",
        href: "#",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    title: "Sales",
    links: [
      {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: ChartPieIcon,
      },
      {
        name: "Engagement",
        href: "#",
        icon: CursorArrowRaysIcon,
      },
      {
        name: "Security",
        href: "#",
        icon: FingerPrintIcon,
      },
      {
        name: "Integrations",
        href: "#",
        icon: SquaresPlusIcon,
      },
      {
        name: "Automations",
        href: "#",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    title: "Purchases",
    links: [
      {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: ChartPieIcon,
      },
      {
        name: "Engagement",
        href: "#",
        icon: CursorArrowRaysIcon,
      },
      {
        name: "Security",
        href: "#",
        icon: FingerPrintIcon,
      },
      {
        name: "Integrations",
        href: "#",
        icon: SquaresPlusIcon,
      },
      {
        name: "Automations",
        href: "#",
        icon: ArrowPathIcon,
      },
    ],
  },
];

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
        <div className="grid grid-cols-2  gap-3 p-2 lg:grid-cols-3 lg:gap-0">
          {menu?.map((row) => {
            return (
              <div>
                <h2 className="text-xs font-medium tracking-tight">
                  {row.title}
                </h2>
                {row.links.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    className="group relative flex items-center gap-x-2 rounded-lg bg-card p-2 text-card-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="mt-1 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-card">
                      <item.icon
                        className="h-4 w-4  group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.name}
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
