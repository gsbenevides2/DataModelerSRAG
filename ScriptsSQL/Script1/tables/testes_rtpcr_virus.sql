CREATE TABLE testes_rtpcr_virus (
    tsr_ter_id INTEGER NOT NULL,
    tsr_vir_id INTEGER NOT NULL
);

COMMENT ON TABLE testes_rtpcr_virus IS
    'Tabela que lista os vírus encontrados pelo teste RT/PCR.';

COMMENT ON COLUMN testes_rtpcr_virus.tsr_ter_id IS
    'Identificador do teste RT/PCR.';

COMMENT ON COLUMN testes_rtpcr_virus.tsr_vir_id IS
    'Identificador do vírus encontrado no teste RT/PCR.';

ALTER TABLE testes_rtpcr_virus ADD CONSTRAINT pk_tsr PRIMARY KEY ( tsr_ter_id,
                                                                   tsr_vir_id );