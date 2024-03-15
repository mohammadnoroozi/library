import { DEBUG } from "./Debug";

const location = typeof window === "undefined" ? ({} as Location) : window.location;
export const ApiRoot = DEBUG ? 'http://127.0.0.1:30002' : location.origin?.replace("/admin.","/admin-api.");
