import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("Middleware Supabase Auth Error:", err);
  }

  // Protect agent routes
  if (request.nextUrl.pathname.startsWith("/agent")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login?redirect=" + request.nextUrl.pathname, request.url)
      );
    }

    // Check agent role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "agent" && profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect consumer account routes
  if (request.nextUrl.pathname.startsWith("/account")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login?redirect=" + request.nextUrl.pathname, request.url)
      );
    }
  }

  return response;
}
