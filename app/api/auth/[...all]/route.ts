import aj from "@/lib/arcjet";
import { ArcjetDecision, shield, slidingWindow } from "@arcjet/next";
import ip from "@arcjet/ip";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const rateLimit = aj.withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "10s",
    max: 2,
    characteristics: ["fingerprint"],
  })
);

const shieldValidation = aj.withRule(
  shield({
    mode: "LIVE",
  })
);

const protectedAuth = async (req: NextRequest): Promise<ArcjetDecision> => {
  const session = await auth.api.getSession({ headers: req.headers });
  let userId: string;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "127.0.0.1";
  }

  if (!req.nextUrl.pathname.startsWith("/api/auth/sign-out")) {
    return rateLimit.protect(req, { fingerprint: userId });
  }

  return shieldValidation.protect(req);
};

const authHandlers = toNextJsHandler(auth.handler);

export const { GET } = authHandlers;

export const POST = async (req: NextRequest) => {
  const decision = await protectedAuth(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(JSON.stringify({ message: 'Rate limit exceeded' }), { status: 429 })
    }
    if (decision.reason.isShield()) {
      return new Response(JSON.stringify({ message: 'Shield validation failed' }), { status: 403 })
    }
  }

  return authHandlers.POST(req);
};








//-------------------------------------------------------------

// import { auth } from "@/lib/auth";
// import { toNextJsHandler } from "better-auth/next-js";

// const authHandlers = toNextJsHandler(auth.handler);

// export const { GET, POST } = authHandlers;
