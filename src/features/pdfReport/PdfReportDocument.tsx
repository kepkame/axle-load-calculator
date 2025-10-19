import { Document, Page, View, Text } from '@react-pdf/renderer';
import { RightImagePanel } from './components/RightImagePanel/RightImagePanel';
import { AxleLoadsTable } from './components/AxleLoadsTable/AxleLoadsTable';
import { VehicleSpecsTable } from './components/VehicleSpecsTable/VehicleSpecsTable';
import type { PdfReportDocumentProps } from './types';
import { pdfReportStyles as styles } from './pdfReportStyles';

export const PdfReportDocument: React.FC<PdfReportDocumentProps> = ({
  dateText,
  step1Data,
  rows,
  cargoPlanPngDataUrl,
  imageHeightPt,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Отчёт по расчёту нагрузок осей</Text>
          <Text style={styles.date}>{`Дата: ${dateText}`}</Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.leftCol}>
            <VehicleSpecsTable step1Data={step1Data} />
            <AxleLoadsTable rows={rows} />
          </View>

          <RightImagePanel src={cargoPlanPngDataUrl} imageHeightPt={imageHeightPt} />
        </View>
      </Page>
    </Document>
  );
};
