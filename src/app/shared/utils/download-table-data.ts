import { ITableColumn, ITableData } from "../full-table/full-table.interface";

function downloadCSV(csv, filename) {
  let csvFile;
  let downloadLink;

  csvFile = new Blob([csv], { type: 'text/csv' });

  downloadLink = document.createElement('a');

  downloadLink.download = filename;

  downloadLink.href = window.URL.createObjectURL(csvFile);

  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);

  downloadLink.click();
}

export function exportTableToCSV(
  columns: ITableColumn[],
  data: ITableData<any>,
  filename: string
) {
  let csv = [];
  let rows = data.data;
  const headerRow = columns.map((column) => column.header);
  csv.push(headerRow.join(','));

  for (const rowData of rows) {
    let row = [];

    for (let column of columns) {
      row.push(
        rowData[column.field as string].details
          ? rowData[column.field as string].text
            ? rowData[column.field as string].text
            : ''
          : rowData[column.field as string]
      );
    }

    csv.push(row.join(','));
  }

  downloadCSV(csv.join('\n'), filename);
}
