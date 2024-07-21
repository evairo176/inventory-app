"use client";
import React from "react";
import { Button } from "../ui/button";

type InviteUserColumnProps = {
  user: any;
};

const InviteUserColumn = ({ user }: InviteUserColumnProps) => {
  return (
    <Button size={"sm"} variant={"secondary"}>
      Invite User
    </Button>
  );
};

export default InviteUserColumn;
