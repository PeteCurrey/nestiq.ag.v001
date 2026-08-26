import { redirect } from "next/navigation";

// Alert preferences live per saved search, which is where people actually
// think about them. Keeping the sidebar link working rather than 404ing.
export default function AlertsPage() {
  redirect("/account/searches");
}
