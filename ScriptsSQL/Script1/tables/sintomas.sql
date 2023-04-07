CREATE TABLE sintomas (
    sin_id   INTEGER,
    sin_nome VARCHAR2(30)
);

COMMENT ON TABLE sintomas IS
    'Tabela de metadados que lista os possíveis sintomas que os pacientes podem ter.';

COMMENT ON COLUMN sintomas.sin_id IS
    'Identificador único e autoincremental do sintoma.';

COMMENT ON COLUMN sintomas.sin_nome IS
    'Nome do sintoma.';

ALTER TABLE sintomas ADD CONSTRAINT pk_sin PRIMARY KEY ( sin_id );
ALTER TABLE sintomas ADD CONSTRAINT ck_sin_01 CHECK ( sin_nome IS NOT NULL );

CREATE SEQUENCE seq_sin NOCACHE;

CREATE TRIGGER tg_seq_sin
BEFORE INSERT
ON sintomas
FOR EACH ROW
BEGIN
  :new.sin_id := seq_sin.nextval;
END;
/