"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// CLIENT SIDE NAVIGATION
export default function NavigationTest() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("test");
  console.log("query >>", query);
  const handleClick = () => {
    console.log("clicked !!!");
    // router.push("/contact");  // go to url page
    router.replace("/");     //replace browser history
    // router.refresh();       //refresh page
    // router.back();         //go to previous page
    // router.forward();     // go again next page

    console.log("path >>", path);
  };
  return (
    <div>
      <Link href="/" prefetch={false}>
        Click Here
      </Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  );
}
