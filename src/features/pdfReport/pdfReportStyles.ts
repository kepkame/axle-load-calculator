import { StyleSheet } from '@react-pdf/renderer';
import { pdfColors } from './pdfColors';

const PAGE = {
  heightPt: 841.89,
  paddingPt: 18,
  headerHeightPt: 48,
  headerMarginBottomPt: 12,
} as const;

const RIGHT_COL = {
  widthPercent: 35,
  blockHeaderHeightPt: 28,
  borderRadius: 5,
} as const;

const CONTENT_HEIGHT_PT =
  PAGE.heightPt - 2 * PAGE.paddingPt - PAGE.headerHeightPt - PAGE.headerMarginBottomPt;

const RIGHT_IMAGE_BOX_HEIGHT_PT = CONTENT_HEIGHT_PT - RIGHT_COL.blockHeaderHeightPt - 2;

export const pdfReportStyles = StyleSheet.create({
  page: {
    fontFamily: 'Montserrat',
    backgroundColor: pdfColors.white,
    padding: PAGE.paddingPt,
  },
  header: {
    marginBottom: PAGE.headerMarginBottomPt,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: pdfColors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: pdfColors.textSecondary,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  leftCol: {
    flexDirection: 'column',
    width: `${100 - RIGHT_COL.widthPercent}%`,
    gap: 20,
  },
  rightCol: {
    width: `${RIGHT_COL.widthPercent}%`,
    height: CONTENT_HEIGHT_PT,
    borderRadius: RIGHT_COL.borderRadius,
  },
  block: {
    width: '100%',
    borderWidth: 1,
    borderColor: pdfColors.background,
    borderRadius: 6,
    overflow: 'hidden',
  },
  blockRight: {
    borderRadius: RIGHT_COL.borderRadius,
    overflow: 'hidden',
  },
  blockHeader: {
    backgroundColor: pdfColors.surface,
    borderTopLeftRadius: RIGHT_COL.borderRadius,
    borderTopRightRadius: RIGHT_COL.borderRadius,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  blockHeaderRight: {
    backgroundColor: pdfColors.surface,
    borderRadius: RIGHT_COL.borderRadius,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  blockTitle: {
    fontSize: 11,
    color: pdfColors.textPrimary,
  },
  blockTitleCenter: {
    fontSize: 11,
    color: pdfColors.textPrimary,
    textAlign: 'center',
  },
  blockBody: {
    padding: 8,
    gap: 6,
  },
  blockRightBody: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxHeight: RIGHT_IMAGE_BOX_HEIGHT_PT,
    paddingTop: 8,
    paddingRight: 4,
    paddingLeft: 12,
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.background,
  },
  thCell: {
    flex: 1,
    maxWidth: 208,
    minWidth: 208,
    width: 208,
    fontSize: 9,
    color: pdfColors.textPrimary,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tdCell: {
    flex: 1,
    fontSize: 9,
    color: pdfColors.textPrimary,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  thName: {
    flex: 1,
    maxWidth: 148,
    width: 148,
    padding: 6,
    fontSize: 10,
    color: pdfColors.textSecondary,
  },
  tdName: {
    flex: 1,
    maxWidth: 148,
    width: 148,
    fontSize: 9,
    color: pdfColors.textPrimary,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  thCellLoad: {
    flex: 1,
    maxWidth: 60,
    width: 60,
    padding: 6,
    fontSize: 10,
    color: pdfColors.textSecondary,
  },
  tdCellLoad: {
    flex: 1,
    maxWidth: 60,
    width: 60,
    fontSize: 9,
    color: pdfColors.textPrimary,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  thStatus: {
    maxWidth: 64,
    width: 64,
    fontSize: 10,
    textAlign: 'right',
    color: pdfColors.textSecondary,
    padding: 6,
  },
  statusCell: {
    maxWidth: 64,
    width: 64,
    fontSize: 9,
    fontWeight: 600,
    textAlign: 'right',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  legendText: {
    fontSize: 9,
    color: pdfColors.textSecondary,
  },
  headerRow: {
    backgroundColor: pdfColors.surface,
    paddingHorizontal: 6,
  },
  image: {
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
    maxWidth: 380,
    width: '100%',
    maxHeight: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  rightSpacer: {
    flexGrow: 1,
  },
});
