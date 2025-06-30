"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import ImageWithFallback from "./ImageWithFallback";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          
          <Image src="/assets/icons/logo.svg" alt="logo" height={40} width={40} />
          <span className="text-2xl font-bold">
            <span className="text-blue-400">Screen</span>
            <span className="text-purple-400">Drop</span>
          </span>
                 
        </Link>

        {user && (
          <figure>
            <button onClick={() => router.push(`/profile/${session?.user.id}`)}>
              <ImageWithFallback
                src={session?.user.image ?? ""}
                alt="User"
                width={36}
                height={36}
                className="rounded-full aspect-square"
              />
            </button>
            <button
              onClick={async () => {
                return await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/sign-in");
                    },
                  },
                });
              }}
              className="cursor-pointer"
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;