import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <Link href="/admin/">
        <Button>Go to About Page</Button>
      </Link>
    </div>
  );
}
