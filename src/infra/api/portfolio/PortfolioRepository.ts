import { client } from "@infra/api/http/client";
import type { PortfolioItem, HistoryItem } from "@features/portfolio/hooks/types";

export interface PortfolioAssetQuantity {
  assetId: string;
  quantity: number;
}

export const PortfolioRepository = {
  getByCourse: async (courseId: string): Promise<PortfolioItem[]> => {
    return await client.get<PortfolioItem[]>(`api/Portfolio/course/${courseId}`);
  },

  getHistory: async (courseId: string, studentId: string): Promise<HistoryItem[]> => {
    return await client.get<HistoryItem[]>(
      `api/Portfolio/history/course/${courseId}/student/${studentId}`
    );
  },

  getAssetQuantitiesByTeamAndUser: async (teamId: string, userId: string ): Promise<PortfolioAssetQuantity[]> => {
    return client.get<PortfolioAssetQuantity[]>(
      `api/portfolio/assets/team/${teamId}/user/${userId}`
    );
  },
};