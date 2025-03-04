"use client";
import React, { useState } from "react";
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

import { useDeleteBrand } from "@/action/brand-action";
import { useDelete } from "@/action/global-action";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  deletePath: string;
  queryKey: string;
};

const DeleteBtn = ({ open, setOpen, id, deletePath, queryKey }: Props) => {
  const [loading, setLoading] = useState(false);
  const deleteBrand = useDelete(deletePath, id, queryKey);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteBrand.mutateAsync();

      toast.success(response.message);

      setOpen(false);
    } catch (error: any) {
      console.error("There was an error deleting the data!", error);
      toast.error(`${error?.message}`);
    } finally {
      setLoading(false);
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
          <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={() => handleDelete()}>
            {loading ? "Loading..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
