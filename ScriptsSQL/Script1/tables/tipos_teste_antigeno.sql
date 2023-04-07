CREATE TABLE tipos_teste_antigeno (
    tta_id   INTEGER,
    tta_nome VARCHAR2(30)
);

COMMENT ON TABLE tipos_teste_antigeno IS
    'Tabela de metadados que lista os tipos de testes antígenos existentes.';

COMMENT ON COLUMN tipos_teste_antigeno.tta_id IS
    'Identificador do tipo de teste para pesquisa de antígenos.';

COMMENT ON COLUMN tipos_teste_antigeno.tta_nome IS
    'Nome do tipo de teste para pesquisa de antígenos.';

ALTER TABLE tipos_teste_antigeno ADD CONSTRAINT pk_tta PRIMARY KEY ( tta_id );
ALTER TABLE tipos_teste_antigeno ADD CONSTRAINT ck_tta_01 CHECK ( tta_nome IS NOT NULL );

CREATE SEQUENCE seq_tta NOCACHE;

CREATE TRIGGER tg_seq_tta
BEFORE INSERT
ON tipos_teste_antigeno
FOR EACH ROW
BEGIN
  :new.tta_id := seq_tta.nextval;
END;
/
