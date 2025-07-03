import {
  multiVariableText,
  text,
  barcodes,
  image,
  svg,
  line,
  table,
  rectangle,
  ellipse,
  dateTime,
  date,
  time,
  select,
  checkbox,
  radioGroup,
} from '@pdfme/schemas';
import { signature } from './signature';

export const getPlugins = () => {
  return {
    Text: text,
    'Multi-Variable Text': multiVariableText,
    Table: table,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    SVG: svg,
    Signature: signature,
    QR: barcodes.qrcode,
    DateTime: dateTime,
    Date: date,
    Time: time,
    Select: select,
    Checkbox: checkbox,
    RadioGroup: radioGroup,
    // JAPANPOST: barcodes.japanpost,
    EAN13: barcodes.ean13,
    // EAN8: barcodes.ean8,
    // Code39: barcodes.code39,
    Code128: barcodes.code128,
    // NW7: barcodes.nw7,
    // ITF14: barcodes.itf14,
    // UPCA: barcodes.upca,
    // UPCE: barcodes.upce,
    // GS1DataMatrix: barcodes.gs1datamatrix,
    // PDF417: barcodes.pdf417,
    custom: {
      ui: text.ui,
      pdf: text.pdf,
      propPanel: {
        schema: text.propPanel.schema,
        widgets: text.propPanel.widgets,
        defaultSchema: {
          ...text.propPanel.defaultSchema, ...{
            type: 'test',
            position: {
              x: 0,
              y: 0
            },
            width: 100,
            height: 20,
            content: 'test',
            readOnlyInDesigner: true,
            onePerDoc: true,
            label: 'Custom Plugin'
          }
        }
      },
    }
  };
};
