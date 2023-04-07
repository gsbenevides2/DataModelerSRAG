CREATE TABLE racas (
    rac_id   NUMBER(1),
    rac_nome VARCHAR2(10)
);

COMMENT ON TABLE racas IS
    'Tabela de metadados que lista os tipos de raça.';

COMMENT ON COLUMN racas.rac_id IS
    'Identificador único de cada raça.';

COMMENT ON COLUMN racas.rac_nome IS
    'Nome de cada raça.';

ALTER TABLE racas ADD CONSTRAINT pk_rac PRIMARY KEY ( rac_id );
ALTER TABLE racas ADD CONSTRAINT ck_rac_01 CHECK ( rac_nome IS NOT NULL );

CREATE SEQUENCE seq_rac START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_rac
BEFORE INSERT
ON racas
FOR EACH ROW
BEGIN
  :new.rac_id := seq_rac.nextval;
END;
/
ALTER TRIGGER tg_seq_rac DISABLE;