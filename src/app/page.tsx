import { redirect } from "next/navigation";

// This is a Server Component that runs immediately on the server
// and issues a 307 (Temporary) redirect to the login page.
export default function Home() {
  // 🛠️ Redirect all requests hitting the root path to the login page.
  redirect("/admin/login");

  // A return statement is still technically required, though redirect() throws
  // return null;
}
