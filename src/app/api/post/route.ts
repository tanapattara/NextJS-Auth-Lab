import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const datas = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return new Response(JSON.stringify(datas));
}
