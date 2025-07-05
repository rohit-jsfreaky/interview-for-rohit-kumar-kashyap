export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[] | null;
  loading: boolean;
  columns: TableColumn[];
  renderCell: (item: T, columnKey: string, index: number) => React.ReactNode;
  emptyStateMessage?: string;
  emptyStateSubMessage?: string;
}