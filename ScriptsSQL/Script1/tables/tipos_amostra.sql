CREATE TABLE tipos_amostra (
    tam_id   INTEGER,
    tam_nome VARCHAR2(30)
);

COMMENT ON TABLE tipos_amostra IS
    'Tabela de metadados que lista os tipos de amostra que podem ser coletadas para exame diagnóstico.';

COMMENT ON COLUMN tipos_amostra.tam_id IS
    'Identificador do tipo de amostra coletada para o teste diagnóstico.';

COMMENT ON COLUMN tipos_amostra.tam_nome IS
    'Nome do tipo de amostra.';

ALTER TABLE tipos_amostra ADD CONSTRAINT pk_tam PRIMARY KEY ( tam_id );
ALTER TABLE tipos_amostra ADD CONSTRAINT ck_tam_01 CHECK ( tam_nome IS NOT NULL );

CREATE SEQUENCE seq_tam START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_tam
BEFORE INSERT 
ON tipos_amostra
FOR EACH ROW
BEGIN
 :new.tam_id := seq_tam.nextval;
END;
/
ALTER TRIGGER tg_seq_tam DISABLE;