import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  GetDefaultStep1Response,
  CalculateAxleLoadsArgs,
  CalculateAxleLoadsResponse,
} from './../types';
import { mergeAxleFormAndCalcData } from '@pages/Step3/utils/mergeAxleFormAndCalcData';
import type { AxleCalculationResult } from '@shared-types/axleCalculation';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Fetch default values for Step 1
    getDefaultStep1: builder.query<GetDefaultStep1Response, void>({
      query: () => '/api/defaultValuesStep1',
      transformResponse: (response: GetDefaultStep1Response[]) => {
        if (!Array.isArray(response) || response.length === 0) {
          throw new Error('Empty response received from /defaultValuesStep1');
        }
        return response[0];
      },
      keepUnusedDataFor: Infinity,
    }),

    // Perform axle load calculation
    calculateAxleLoads: builder.query<CalculateAxleLoadsResponse, CalculateAxleLoadsArgs>({
      query: ({ step1Data, step2Data }) => {
        console.log('[RTK Query] Sending payload to /result:', {
          step1: step1Data,
          step2: step2Data,
        });
        return {
          url: '/api/result',
          method: 'POST',
          body: { step1: step1Data, step2: step2Data },
        };
      },
      transformResponse: (response: AxleCalculationResult[], _meta, args) => {
        // return mergeAxleFormAndCalcData(args.step1Data, response);
        // TODO: Replace this mock data with actual merged results once the backend is connected.
        console.log('[RTK Query] ⬅️ Raw response from /result before transformResponse:', response);
        const mock: AxleCalculationResult[] = [
          {
            axleKey: 'truck-0',
            axleType: 'truck',
            index: 1,
            actualLoad: 3.77,
            maxLoad: 40,
          },
          {
            axleKey: 'truck-1-lifted',
            axleType: 'truck',
            index: 2,
            actualLoad: 3.6,
            maxLoad: 40,
            lifted: true,
          },
          {
            axleKey: 'truck-2',
            axleType: 'truck',
            index: 3,
            actualLoad: 9.8,
            maxLoad: 40,
          },
          {
            axleKey: 'trailer-0',
            axleType: 'trailer',
            index: 1,
            actualLoad: 10.2,
            maxLoad: 17,
          },
          {
            axleKey: 'trailer-1',
            axleType: 'trailer',
            index: 2,
            actualLoad: 10.22,
            maxLoad: 17,
          },
          {
            axleKey: 'trailer-2',
            axleType: 'trailer',
            index: 3,
            actualLoad: 9,
            maxLoad: 17,
          },
        ];
        return mergeAxleFormAndCalcData(args.step1Data, mock);
      },
      keepUnusedDataFor: Infinity,
    }),
  }),
});

export const { useGetDefaultStep1Query, useCalculateAxleLoadsQuery } = apiSlice;
