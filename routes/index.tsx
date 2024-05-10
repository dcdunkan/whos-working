import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    const date = new Date();
    return Response.redirect(
      `${new URL(req.url).origin}/${date.getFullYear()}-${
        (date.getMonth() + 1).toString().padStart(2, "0")
      }`,
    );
  },
};