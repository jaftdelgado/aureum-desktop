import { client } from "@infra/api/http/client";
import type {
  PortfolioItem,
  HistoryItem,
} from "@features/portfolio/hooks/types";

export interface PortfolioAssetQuantity {
  assetId: string;
  quantity: number;
}

export const PortfolioRepository = {
  getByCourse: async (
    _courseId: string,
    _userId: string
  ): Promise<PortfolioItem[]> => {
    return await client.get<PortfolioItem[]>(
      "api/Portfolio/course/${courseId}?userId=${userId}"
    );
  },

  getHistory: async (
    _courseId: string,
    _studentId: string
  ): Promise<HistoryItem[]> => {
    return await client.get<HistoryItem[]>(
      "api/Portfolio/history/course/${courseId}/student/${studentId}"
    );
  },

  getAssetQuantitiesByTeamAndUser: async (): Promise<
    PortfolioAssetQuantity[]
  > => {
    return client.get<PortfolioAssetQuantity[]>(
      "api/portfolio/assets/team/${teamId}/user/${userId}"
    );
  },
};
