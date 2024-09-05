import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
type AvatarMenuButtonProps = {
  name: string;
  image: string;
};
export function AvatarMenuButton({ name, image }: AvatarMenuButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="">
          <Image
            width={215}
            height={215}
            alt={name}
            src={image ? image : "/avatar.png"}
            className="h-10 w-10 rounded-full border border-gray-600"
          />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you{"'"}re done.
          </SheetDescription>
        </SheetHeader>
        {/* Content here  */}

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
