import { Step1Data } from '@shared-types/step1Data';

export type LoadStatusRow = {
  axleKey: string;
  axleType: 'truck' | 'trailer';
  index: number;
  actualLoad: number;
  maxLoad: number;
  lifted?: boolean;
};

export interface PdfReportDocumentProps {
  dateText: string;
  step1Data: Step1Data;
  rows: LoadStatusRow[];
  cargoPlanPngDataUrl: string; // PNG from html2canvas
  imageHeightPt?: number;
}

type SnapshotOptions = Readonly<{
  width?: number;
  height?: number;
  scale?: number;
  backgroundColor?: string | null;
}>;

export type BuildPdfArgs = Readonly<{
  step1Data: PdfReportDocumentProps['step1Data'];
  rows: PdfReportDocumentProps['rows'];
  cargoPlanElement: HTMLElement;
  snapshot: SnapshotOptions;
}>;
