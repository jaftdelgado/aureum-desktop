/*import { useState, useEffect } from "react";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import { getProfileByAuthId } from "@api/authApi";

export const useProfileCheck = (
  user: LoggedInUser | null,
  loading: boolean
) => {
  const [isProfileChecked, setIsProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const verifyProfile = async () => {
      if (user?.id) {
        try {
          await getProfileByAuthId(user.id);
          setHasProfile(true);
        } catch {
          setHasProfile(false);
        } finally {
          setIsProfileChecked(true);
        }
      }
    };

    if (!loading) {
      if (user) verifyProfile();
      else setIsProfileChecked(true);
    }
  }, [user, loading]);

  return { isProfileChecked, hasProfile };
};*/
