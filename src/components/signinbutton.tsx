"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const SigninButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignIn = () => {
    //signIn("credentials", { callbackUrl: "/" });
    //redirect to login page
    router.push("/signin");
  };

  if (session && session.user) {
    return (
      <div className="d-flex">
        <p className="my-auto mx-2">{session.user.name}</p>
        <button onClick={() => signOut()} className="btn btn-primary">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
      <button onClick={handleSignIn} className="btn btn-primary">
        Sign In
      </button>
    </>
  );
};

export default SigninButton;
