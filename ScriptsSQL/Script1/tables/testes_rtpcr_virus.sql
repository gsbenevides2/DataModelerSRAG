CREATE TABLE testes_rtpcr_virus (
    tsr_ter_id INTEGER NOT NULL,
    tsr_vir_id INTEGER NOT NULL
);

COMMENT ON TABLE testes_rtpcr_virus IS
    'Tabela de muitos para muitos onde os testes podem identificar muitos virus.';

COMMENT ON COLUMN testes_rtpcr_virus.tsr_ter_id IS
    'Identificador do Teste.';

COMMENT ON COLUMN testes_rtpcr_virus.tsr_vir_id IS
    'Identificador do Virus.';

ALTER TABLE testes_rtpcr_virus ADD CONSTRAINT pk_tsr PRIMARY KEY ( tsr_ter_id,
                                                                   tsr_vir_id );