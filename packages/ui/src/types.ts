import {SchemaForUI, Size, ChangeSchemas, BasePdf} from '@publigo/pdfme-common';

export type SidebarProps = {
  height: number;
  hoveringSchemaId: string | null;
  onChangeHoveringSchemaId: (id: string | null) => void;
  size: Size;
  pageSize: Size;
  activeElements: HTMLElement[];
  schemas: SchemaForUI[];
  schemasList: SchemaForUI[][];
  onSortEnd: (sortedSchemas: SchemaForUI[]) => void;
  onEdit: (id: string) => void;
  onEditEnd: () => void;
  changeSchemas: ChangeSchemas;
  deselectSchema: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  basePdf: BasePdf;
  addSchema?: (defaultSchema: import('@publigo/pdfme-common').Schema) => void;
};
