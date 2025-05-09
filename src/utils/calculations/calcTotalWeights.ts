interface CalcTotalWeightsParams {
  truckWeightKg: number;
  trailerWeightKg: number;
  cargoWeightKg: number;
  truckAxles: number;
  trailerAxles: number;
}

export function calcTotalWeights({
  truckWeightKg,
  trailerWeightKg,
  cargoWeightKg,
  truckAxles,
  trailerAxles,
}: CalcTotalWeightsParams) {
  const totalWeightTons = (truckWeightKg + trailerWeightKg + cargoWeightKg) / 1000;

  const totalAxles = truckAxles + trailerAxles;
  const maxAllowedTons =
    totalAxles >= 6
      ? 44
      : totalAxles === 5
      ? 40
      : totalAxles === 4
      ? 36
      : totalAxles === 3
      ? 28
      : 28;

  return {
    totalWeightTons,
    maxAllowedTons,
  };
}
