import { redirect } from "next/navigation";

// Account settings are not built yet. The buying position is the only
// meaningful thing to edit today, so send people there instead of a dead end.
export default function AccountSettingsPage() {
  redirect("/account/profile");
}
