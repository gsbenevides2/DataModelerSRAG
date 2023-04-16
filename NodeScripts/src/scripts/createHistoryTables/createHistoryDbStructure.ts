import { type Column, type Table } from "./types";

function includeDateColumnInTable(table: Table): Table {
  const name = table.trigram.concat("_DT_HIST");
  const dataColumn: Column = {
    comment: "Data do historiamento.",
    isPrimaryKey: true,
    type: "DATE",
    size: 7,
    name,
  };
  table.columns.push(dataColumn);
  return table;
}

function changeTableNameAndComment(table: Table): Table {
  const name = `H_${table.name}`;
  table.name = name;
  table.comment = `Tabela de historiamento da tabela ${table.name}`;
  return table;
}

export function createHistoryDbStructure(oldDbStructure: Table[]): Table[] {
  return oldDbStructure.map((table) => {
    return changeTableNameAndComment(includeDateColumnInTable(table));
  });
}
