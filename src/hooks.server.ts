import { currentUser } from "$lib/pocketbase";
import { redirect } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";

export async function handle({ event, resolve }) {
    pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

    const currentUser = pb.authStore.isValid ? pb.authStore.model : null;

    const protectedRoutes = ["/dashboard"]

    if (!currentUser && protectedRoutes.includes(event.url.pathname)) {
        throw redirect(302, "/signIn");
    }

    const response = await resolve(event);
    response.headers.set('set-cookie', pb.authStore.exportToCookie());

    return resolve(event)
}
