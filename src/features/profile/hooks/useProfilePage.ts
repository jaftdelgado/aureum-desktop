import { useAuth } from "@app/hooks/useAuth";

export const useProfilePage = () => {
  const { user } = useAuth();

  return {
    user,
  };
};