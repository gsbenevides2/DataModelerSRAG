CREATE TABLE tipos_testes_sorologicos (
    tts_id   INTEGER,
    tts_nome VARCHAR2(30)
);

COMMENT ON TABLE tipos_testes_sorologicos IS
    'Tabela em que estão listados todos os tipos de resultados possiveis.';

COMMENT ON COLUMN tipos_testes_sorologicos.tts_id IS
    'Identificador do tipo de teste sorológico.';

COMMENT ON COLUMN tipos_testes_sorologicos.tts_nome IS
    'Nome do tipo de teste sorológico.';

ALTER TABLE tipos_testes_sorologicos ADD CONSTRAINT pk_tts PRIMARY KEY ( tts_id );
ALTER TABLE tipos_testes_sorologicos ADD CONSTRAINT ck_tts_01 CHECK ( tts_nome IS NOT NULL );

CREATE SEQUENCE seq_tts NOCACHE;

CREATE TRIGGER tg_seq_tts
BEFORE INSERT
ON tipos_testes_sorologicos
FOR EACH ROW
BEGIN
  :new.tts_id := seq_tts.nextval;
END;
/