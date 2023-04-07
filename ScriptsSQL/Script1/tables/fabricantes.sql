CREATE TABLE fabricantes (
    fab_id   INTEGER,
    fab_nome VARCHAR2(40)
);

COMMENT ON TABLE fabricantes IS
    'Tabela de metadados que lista os fabricantes da vacina para COVID-19.';

COMMENT ON COLUMN fabricantes.fab_id IS
    'Identificador do fabricante da vacina.';

COMMENT ON COLUMN fabricantes.fab_nome IS
    'Nome do fabricante da vacina.';

ALTER TABLE fabricantes ADD CONSTRAINT pk_fab PRIMARY KEY ( fab_id );
ALTER TABLE fabricantes ADD CONSTRAINT ck_fab_01 CHECK (fab_nome IS NOT NULL);

CREATE SEQUENCE seq_fab NOCACHE;

CREATE TRIGGER tg_seq_fab
BEFORE INSERT
ON fabricantes
FOR EACH ROW
BEGIN
    :new.fab_id := seq_fab.nextval;
END;
/