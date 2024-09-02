"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IUser } from "../../../types/types";
import { inviteUser } from "@/action/email-action";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type InviteUserColumnProps = {
  user: IUser;
  queryKey: string;
};

const InviteUserColumn = ({ user, queryKey }: InviteUserColumnProps) => {
  const [loading, setLoading] = useState(false);
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const sendInvite = async () => {
    if (user.inviteSent) {
      toast.info("Invite sent");
      return;
    }
    setLoading(true);
    try {
      const data = {
        firstName: user.firstName,
        password: user.password,
        invitedByUsername: "Evairo",
        invitedByEmail: "info@evairo.com",
        loginEmail: user.email,
        role: user.role.displayName,
        inviteLink: "http://localhost:3000/login",
      };

      await inviteUser(data);

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/invite/email-sent`,
        {
          email: user.email,
        },
      );

      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });

      toast.success("Invite sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error sent");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading || user.inviteSent}
      onClick={sendInvite}
      size={"sm"}
      variant={"secondary"}
    >
      {loading ? (
        <div>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </div>
      ) : (
        <>{user.inviteSent ? "Invite Sent" : "Invite User"}</>
      )}
    </Button>
  );
};

export default InviteUserColumn;
