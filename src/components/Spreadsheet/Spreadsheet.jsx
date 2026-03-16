import { TableHeader, TableInput } from './Cell';
import styles from './Spreadsheet.module.css';

const Spreadsheet = ({ rows, cols }) => {

  const columnHeaders = Array.from({ length: cols }).map((_, index) => String.fromCharCode(65 + index));

  return (
    <table className={styles['table-layout-fixed']}>
      <thead>
        <tr>
          <th className={[styles.cell, styles['table-header']].join(' ')}></th>
          {columnHeaders.map((header, index) => (
            <TableHeader key={index} className={styles['table-header']} header={header} />
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            <th className={styles['table-header']}>{rowIndex + 1}</th>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} className={styles.cell}>
                <TableInput className={styles.input} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Spreadsheet;