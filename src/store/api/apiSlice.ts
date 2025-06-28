import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mergeAxleFormAndCalcData } from '@pages/Step3/utils/mergeAxleFormAndCalcData';
import type { AxleCalculationResult } from '@shared-types/axleCalculation';
import type { CalculateAxleLoadsArgs, CalculateAxleLoadsResponse } from '../types';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * RTK Query slice for communicating with the axle load calculation API.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    calculateAxleLoads: builder.query<CalculateAxleLoadsResponse, CalculateAxleLoadsArgs>({
      query: ({ step1Data, step2Data }) => {
        return {
          url: '/api/result',
          method: 'POST',
          body: { step1: step1Data, step2: step2Data },
        };
      },
      transformResponse: (response: AxleCalculationResult[], _meta, args) => {
        // Merges backend-calculated loads with original form state (preserves lifted flag, etc.)
        return mergeAxleFormAndCalcData(args.step1Data, response);
      },
      keepUnusedDataFor: Infinity,
    }),
  }),
});

export const { useCalculateAxleLoadsQuery } = apiSlice;
