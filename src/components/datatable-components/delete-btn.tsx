"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useDeleteCategory } from "@/action/category-action";
import { toast } from "../ui/use-toast";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
};

const DeleteBtn = ({ open, setOpen, id }: Props) => {
  const deleteCategory = useDeleteCategory(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
  );
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id);

      toast({
        title: `Delete Category Successfully`,
      });

      setOpen(false);
    } catch (error: any) {
      console.error("There was an error deleting the data!", error);
      toast({
        title: error?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
