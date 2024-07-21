import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Plus, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { generateRandomPassword } from "@/utils/generate-random-password";

type Props = {
  form: any;
  name: "password";
};

const PasswordTextInput = ({ form, name }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGenerateRandomPassword = () => {
    const password = generateRandomPassword(12);
    form.setValue(name, password);
  };

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>

          <FormControl>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <div
                  onClick={handleShowPassword}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  {...field}
                />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleGenerateRandomPassword}
                      type="button"
                      size="icon"
                      variant={"outline"}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate Random Password</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordTextInput;
