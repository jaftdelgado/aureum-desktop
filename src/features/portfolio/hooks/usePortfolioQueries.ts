import { useQuery } from "@tanstack/react-query";
import { PortfolioRepository } from "@infra/api/portfolio/PortfolioRepository";

export const usePortfolioData = (
  courseId: string | undefined,
  studentId: string | undefined
) => {
  const portfolioQuery = useQuery({
    queryKey: ["portfolio", courseId],
    queryFn: () => {
      if (!courseId) throw new Error("Course ID required");
      return PortfolioRepository.getByCourse(courseId);
    },
    enabled: !!courseId,
    staleTime: 3000,
    refetchInterval: 3000,
  });

  const historyQuery = useQuery({
    queryKey: ["portfolioHistory", courseId, studentId],
    queryFn: () => {
      if (!courseId || !studentId) throw new Error("IDs required");
      return PortfolioRepository.getHistory(courseId, studentId);
    },
    enabled: !!courseId && !!studentId,
    staleTime: 1000 * 60,
  });

  return {
    portfolio: portfolioQuery.data || [],
    history: historyQuery.data || [],
    isLoading: portfolioQuery.isLoading || historyQuery.isLoading,
    isError: portfolioQuery.isError || historyQuery.isError,
    refetch: () => {
      portfolioQuery.refetch();
      historyQuery.refetch();
    },
  };
};
