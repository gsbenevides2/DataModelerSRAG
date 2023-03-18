CREATE TABLE comorbidades (
    com_id   INTEGER,
    com_nome VARCHAR2(50)
);

COMMENT ON TABLE comorbidades IS
    'Tabela com todas as comorbidades dos casos de SRAG.';

COMMENT ON COLUMN comorbidades.com_id IS
    'Identificador autoincremental de cada comorbidade.';

COMMENT ON COLUMN comorbidades.com_nome IS
    'Nome de cada comorbidade.';

ALTER TABLE comorbidades ADD CONSTRAINT pk_com PRIMARY KEY ( com_id );
ALTER TABLE comorbidades ADD CONSTRAINT ck_com_01 CHECK (com_nome IS NOT NULL);

CREATE SEQUENCE seq_com START WITH 1 NOCACHE;

CREATE TRIGGER tg_seq_com
BEFORE INSERT
ON comorbidades
FOR EACH ROW
BEGIN
    :new.com_id := seq_com.nextval;
END;
/