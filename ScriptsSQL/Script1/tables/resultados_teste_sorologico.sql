CREATE TABLE resultados_teste_sorologico (
    rts_id   NUMBER(1),
    rts_desc VARCHAR2(30)
);

COMMENT ON TABLE resultados_teste_sorologico IS
    'Tabela de metadados que lista os resultados de um teste sorológico.';

COMMENT ON COLUMN resultados_teste_sorologico.rts_id IS
    'Identificador do tipo de resultado para teste de sorologia para SARS-Cov-2';

COMMENT ON COLUMN resultados_teste_sorologico.rts_desc IS
    'Descrição do tipo de resultado para teste sorológico de SARS-Cov-2';

ALTER TABLE resultados_teste_sorologico ADD CONSTRAINT pk_rts PRIMARY KEY ( rts_id );
ALTER TABLE resultados_teste_sorologico ADD CONSTRAINT ck_rts_01 CHECK ( rts_desc IS NOT NULL);

CREATE SEQUENCE seq_rts START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_rts
BEFORE INSERT
ON resultados_teste_sorologico
FOR EACH ROW
BEGIN
  :new.rts_id := seq_rts.nextval;
END;
/
ALTER TRIGGER tg_seq_rts DISABLE;