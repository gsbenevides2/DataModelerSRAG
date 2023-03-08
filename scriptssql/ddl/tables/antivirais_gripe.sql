CREATE TABLE antivirais_gripe (
    ang_id   INTEGER,
    ang_nome VARCHAR2(15)
);

COMMENT ON TABLE antivirais_gripe IS
    'Tabela contendo os antivirais para gripe.';

COMMENT ON COLUMN antivirais_gripe.ang_id IS
    'Identificador do antiviral.';

COMMENT ON COLUMN antivirais_gripe.ang_nome IS
    'Nome do Antiviral.';

ALTER TABLE antivirais_gripe ADD CONSTRAINT pk_ang PRIMARY KEY ( ang_id );
ALTER TABLE antivirais_gripe ADD CONSTRAINT ck_ang_01 CHECK (ang_nome IS NOT NULL);

CREATE SEQUENCE seq_ang START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_ang
BEFORE INSERT
ON antivirais_gripe
FOR EACH ROW
BEGIN
    :new.ang_id := seq_ang.nextval;
END;
/

ALTER TRIGGER tg_seq_ang DISABLE;
