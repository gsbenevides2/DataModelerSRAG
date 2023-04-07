CREATE TABLE testes_rtpcr (
    ter_cas_id         INTEGER,
    ter_rtr_id         INTEGER,
    ter_data_resultado DATE
);

COMMENT ON TABLE testes_rtpcr IS
    'Tabela que lista os casos em que foram realizados testes RT/PCR.';

COMMENT ON COLUMN testes_rtpcr.ter_cas_id IS
    'Identificador do caso para aquele teste de RT/PCR.';

COMMENT ON COLUMN testes_rtpcr.ter_rtr_id IS
    'Identificador do resultado do teste de RT/PCR.';

COMMENT ON COLUMN testes_rtpcr.ter_data_resultado IS
    'Data do resultado do teste de RT/PCR.';

ALTER TABLE testes_rtpcr ADD CONSTRAINT pk_ter PRIMARY KEY ( ter_cas_id );