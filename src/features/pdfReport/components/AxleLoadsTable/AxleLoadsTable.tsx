import { View, Text } from '@react-pdf/renderer';
import { pdfReportStyles as styles } from '@features/pdfReport/pdfReportStyles';
import type { AxleStatusCore } from '@shared-types/loadStatus';
import { pdfColors } from '@features/pdfReport/pdfColors';
import { getAxleStatus } from '@utils/getLoadStatus';
import type { AxleLoadsTableProps } from './AxleLoadsTable.types';

const statusColorMap: Record<AxleStatusCore, string> = {
  danger: pdfColors.danger,
  warning: pdfColors.warning,
  success: pdfColors.success,
};

const statusLabelMap: Record<AxleStatusCore, string> = {
  danger: 'Перегруз',
  warning: 'Пороговая',
  success: 'Норма',
};

export const AxleLoadsTable: React.FC<AxleLoadsTableProps> = ({ rows }) => {
  return (
    <View style={[styles.block]}>
      <View style={styles.blockHeader}>
        <Text style={styles.blockTitle}>Нагрузки по осям</Text>
      </View>

      {/* Table header */}
      <View style={[styles.tr, { backgroundColor: pdfColors.surface, paddingHorizontal: 6 }]}>
        <Text style={styles.thName}>Ось</Text>
        <Text style={styles.thCellLoad}>Факт (т)</Text>
        <Text style={styles.thCellLoad}>Лимит (т)</Text>
        <Text style={styles.thStatus}>Статус</Text>
      </View>

      {/* Table data */}
      <View style={styles.blockBody}>
        {rows.map((row) => {
          const title =
            row.axleType === 'truck' ? `Ось тягача ${row.index}` : `Ось полуприцепа ${row.index}`;
          const status = getAxleStatus(row.actualLoad, row.maxLoad);
          const color = statusColorMap[status];
          const statusLabel = statusLabelMap[status];

          return (
            <View key={row.axleKey} style={styles.tr}>
              <Text style={styles.tdName}>
                {title}
                {row.lifted ? ' (подъёмная)' : ''}
              </Text>
              <Text style={styles.tdCellLoad}>{row.actualLoad.toFixed(2)}</Text>
              <Text style={styles.tdCellLoad}>{row.maxLoad.toFixed(2)}</Text>
              <Text style={[styles.statusCell, { color }]}>{statusLabel}</Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
        <Text style={styles.legendText}>
          Цвет статуса соответствует уровню загрузки: {'< 85%'} — норма, 85–99% — предел
          допустимого, {'> 100%'} — перегруз.
        </Text>
      </View>
    </View>
  );
};
