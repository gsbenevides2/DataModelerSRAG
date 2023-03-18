CREATE TABLE resultados_teste_rtpc (
    rtr_id  INTEGER,
    rtr_des VARCHAR2(40)
);

COMMENT ON TABLE resultados_teste_rtpc IS
    'Tabela que lista os tipos de resultados possiveis para testes de RT/PCR.';

COMMENT ON COLUMN resultados_teste_rtpc.rtr_id IS
    'Identificador do Tipo de Resultado para testes de RT/PCR.';

COMMENT ON COLUMN resultados_teste_rtpc.rtr_des IS
    'Descrição do tipo de resultado para testes de RT/PCR.';

ALTER TABLE resultados_teste_rtpc ADD CONSTRAINT pk_rtr PRIMARY KEY ( rtr_id );
ALTER TABLE resultados_teste_rtpc ADD CONSTRAINT ck_rtr_01 CHECK ( rtr_des IS NOT NULL );

CREATE SEQUENCE seq_rtr START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_rtr
BEFORE INSERT
ON resultados_teste_rtpc
FOR EACH ROW
BEGIN
  :new.rtr_id := seq_rtr.nextval;
END;
/
ALTER TRIGGER tg_seq_rtr DISABLE;