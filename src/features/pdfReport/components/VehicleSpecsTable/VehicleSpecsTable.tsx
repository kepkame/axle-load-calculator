import { View, Text } from '@react-pdf/renderer';
import { pdfReportStyles as styles } from '@features/pdfReport/pdfReportStyles';
import type { VehicleSpecsTableProps } from './VehicleSpecsTable.types';
import { buildVehicleRows } from './vehicleRows';

export const VehicleSpecsTable: React.FC<VehicleSpecsTableProps> = ({ step1Data }) => {
  const rows = buildVehicleRows(step1Data);

  return (
    <View style={[styles.block]}>
      <View style={styles.blockHeader}>
        <Text style={styles.blockTitle}>Характеристики транспорта</Text>
      </View>

      <View style={styles.blockBody}>
        {rows.map(([label, value], i) => (
          <View key={i} style={styles.tr}>
            <Text style={styles.thCell}>{label}</Text>
            <Text style={styles.tdCell}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
