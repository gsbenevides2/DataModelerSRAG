import { type Table } from "./types";

function parseTableToSQL(table: Table): string[] {
  const statements: string[] = [];
  const tableName = table.name;

  const createTableParts = [`CREATE TABLE ${tableName} (`];
  const comments = [`COMMENT ON TABLE ${tableName} IS '${table.comment}'`];

  for (let i = 0; i < table.columns.length; i++) {
    const column = table.columns[i];

    let linePart = `${column.name} ${column.type}`;

    if (!["DATE"].includes(column.type))
      linePart = `${linePart} (${column.size})`;
    if (table.columns.length - 1 === i) linePart = `${linePart})`;
    else linePart = `${linePart},`;

    createTableParts.push(linePart);
    comments.push(
      `COMMENT ON COLUMN ${tableName}.${column.name} IS '${column.comment}'`
    );
  }

  const createTable = createTableParts.join("");

  // PK

  const pkColumns = table.columns.filter((column) => {
    return column.isPrimaryKey;
  });
  const strStartPk = `ALTER TABLE ${tableName} ADD CONSTRAINT PK_H_${table.trigram} PRIMARY KEY (`;
  const strPk = pkColumns.reduce((antValue, currentValue, index) => {
    let newValue = `${antValue}${currentValue.name}`;
    if (pkColumns.length - 1 === index) newValue = `${newValue})`;
    else newValue = `${newValue},`;
    return newValue;
  }, strStartPk);

  statements.push(createTable);
  statements.push(...comments);
  statements.push(strPk);

  return statements;
}

export function parseDbStructureToSQL(dbStructure: Table[]): string[] {
  const statements: string[] = [];

  for (const table of dbStructure) {
    statements.push(...parseTableToSQL(table));
  }

  return statements;
}
