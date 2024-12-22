import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "No user agent";

  return <UserAgent userAgentFromServer={userAgent} />;
};

export default UserAgentRoot;
