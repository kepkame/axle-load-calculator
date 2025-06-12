import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Step1FormApiPayload } from '@entities/step1Form/types';
import { mergeAxleFormAndCalcData } from '@pages/Step3/utils/mergeAxleFormAndCalcData';
import type { AxleCalculationResult } from '@shared-types/axleCalculation';
import type { CalculateAxleLoadsArgs, CalculateAxleLoadsResponse } from './../types';

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
        const payloadStep1: Step1FormApiPayload = {
          truckAxles: step1Data.truckAxles,
          trailerAxles: step1Data.trailerAxles,
          axleLoadData:
            step1Data.axleLoadData?.map((item) => ({
              axleType: item.axleType || 'truck',
              axleLoadEmpty: item.axleLoadEmpty,
              axleLoadLimit: item.axleLoadLimit,
              lifted: item.lifted ?? false,
            })) ?? [],
        };

        return {
          url: '/api/result',
          method: 'POST',
          body: { step1: payloadStep1, step2: step2Data },
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
