"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect } from "react";
import { FRONTEND_ROUTES } from "../../../config";

function ProtectedPage({ children } : { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const { userData, loading } = useContext(AuthContext);

  // Redirect to fields if not logged in
  useEffect(() => {
    if(!userData && !loading){
      router.push(FRONTEND_ROUTES.HOME);
    }
  }, [userData, loading]);

  return (
    <>
      {children}
    </>
  );
}

export { ProtectedPage };
