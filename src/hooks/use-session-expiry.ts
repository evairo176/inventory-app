// hooks/useSessionExpiry.ts
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { handleLogout } from "@/utils/handle-logout";

const useSessionExpiry = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const { expired_token } = session.user;
    const expirationTime = expired_token * 1000; // Convert to milliseconds
    const currentTime = new Date().getTime();
    const timeLeft = expirationTime - currentTime;
    console.info(
      "Session tersisa: " + (timeLeft / 1000 / 60).toFixed(2) + " Menit",
    );
    if (timeLeft <= 0) {
      handleLogout();
    } else {
      const timer = setTimeout(() => {
        handleLogout();
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  }, [session]);
};

export default useSessionExpiry;
