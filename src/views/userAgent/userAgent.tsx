"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";

export const UserAgent = ({
  userAgentFromServer,
}: {
  userAgentFromServer: string;
}) => {
  const { userAgent } = useUserAgentContext();

  return (
    <div>
      <BackToHome />

      {(userAgent || userAgentFromServer) && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent || userAgentFromServer}</div>
        </div>
      )}

      {!userAgent && !userAgentFromServer && <div>No user agent</div>}
    </div>
  );
};
