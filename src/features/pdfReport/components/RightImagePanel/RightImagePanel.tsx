import { View, Text, Image } from '@react-pdf/renderer';
import { pdfReportStyles as styles } from '@features/pdfReport/pdfReportStyles';
import { RightImagePanelProps } from './RightImagePanel.types';

export const RightImagePanel: React.FC<RightImagePanelProps> = ({ src, imageHeightPt }) => {
  return (
    <View style={styles.rightCol}>
      <View style={[styles.blockRight, { flex: 1 }]}>
        <View style={styles.blockHeaderRight}>
          <Text style={styles.blockTitleCenter}>План размещения груза</Text>
        </View>

        <View style={[styles.blockRightBody, { height: imageHeightPt }]}>
          <Image src={src} style={[styles.image]} />
          <View style={styles.rightSpacer} />
        </View>
      </View>
    </View>
  );
};
