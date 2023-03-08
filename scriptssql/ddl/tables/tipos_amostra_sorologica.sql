CREATE TABLE tipos_amostras_sorologicas (
    tas_id   INTEGER,
    tas_nome VARCHAR2(30)
);

COMMENT ON TABLE tipos_amostras_sorologicas IS
    'Tabela que lista todos os tipos de amostra disponíveis.';

COMMENT ON COLUMN tipos_amostras_sorologicas.tas_id IS
    'Identificador do tipo de amostra sorológica.';

COMMENT ON COLUMN tipos_amostras_sorologicas.tas_nome IS
    'Nome do tipo de amostra sorológica.';

ALTER TABLE tipos_amostras_sorologicas ADD CONSTRAINT pk_tas PRIMARY KEY ( tas_id );
ALTER TABLE tipos_amostras_sorologicas ADD CONSTRAINT ck_tas_01 CHECK ( tas_nome IS NOT NULL);

CREATE SEQUENCE seq_tas START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_tas
BEFORE INSERT 
ON tipos_amostras_sorologicas
FOR EACH ROW
BEGIN
 :new.tas_id := seq_tas.nextval;
END;
/
ALTER TRIGGER tg_seq_tas DISABLE;