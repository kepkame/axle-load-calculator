import type { Step1Data } from '@shared-types/step1Data';

// Vehicle specifications table
export const buildVehicleRows = (data: Step1Data): [string, string][] => [
  ['Вес тягача, кг', String(data.truckWeight)],
  ['Вес полуприцепа, кг', String(data.trailerWeight)],
  ['Оси тягача, шт', String(data.truckAxles)],
  ['Оси полуприцепа, шт', String(data.trailerAxles)],
  ['Длина сцепного устройства, м', Number(data.couplingLength).toFixed(2)],
  ['Длина платформы, м', Number(data.deckLength).toFixed(2)],
  ['База тягача, м', data.truckWheelbase.join(' / ')],
  ['База прицепа, м', data.trailerWheelbase.join(' / ')],
];
