import { Box } from '@chakra-ui/react';

import MaterialTable from '@material-table/core';

interface ITableProps {
  columns: Object[];
  data: Object[];
  title: string;
  options?: Object;
  actions: any;
}

export default function Table(props: ITableProps) {
  return (
    <Box>
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      options={props.options}      
      actions={props.actions}
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'Resultados p/Pág',
        },
        header: {
          actions: 'Ações'
        },
        body: {
          emptyDataSourceMessage: 'Nenhum registro encontrado',
          filterRow: {
            filterTooltip: 'Filter'
          }
        },
        toolbar: {
          searchPlaceholder: 'Pesquisar',
          exportPDFName: 'Exportar em PDF',
          exportCSVName: 'Exportar em CSV',
          exportTitle: 'Exportar',
          nRowsSelected: '{0} row(s) selected',
        }
      }}
    />
    </Box>
  )
}