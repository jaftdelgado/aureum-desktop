import { useQuery } from "@tanstack/react-query";
import { MarketConfigApiRepository } from "@infra/api/market-config/MarketConfigApiRepository";
import { GetMarketConfigUseCase } from "@domain/use-cases/market-config/GetMarketConfigUseCase";
import type { MarketConfig } from "@domain/entities/MarketConfig";
import { defaultMarketConfig } from "../constants/marketConfigDefaults";

const marketConfigRepository = new MarketConfigApiRepository();
const getMarketConfigUseCase = new GetMarketConfigUseCase(
  marketConfigRepository
);

export const useMarketConfig = (teamPublicId: string) => {
  return useQuery<MarketConfig, Error>({
    queryKey: ["market-config", teamPublicId],
    queryFn: async () => {
      if (!teamPublicId) return defaultMarketConfig;

      try {
        const config = await getMarketConfigUseCase.execute(teamPublicId);
        return config;
      } catch (err: any) {
        return defaultMarketConfig;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
