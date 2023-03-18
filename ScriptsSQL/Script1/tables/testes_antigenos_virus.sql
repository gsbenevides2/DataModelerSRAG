CREATE TABLE testes_antigenos_virus (
    tsa_tea_id INTEGER NOT NULL,
    tsa_vir_id INTEGER NOT NULL
);

COMMENT ON TABLE testes_antigenos_virus IS
    'Tabela de muitos para muitos onde os testes podem identificar muitos virus.';

COMMENT ON COLUMN testes_antigenos_virus.tsa_tea_id IS
    'Identificador do Teste.';

COMMENT ON COLUMN testes_antigenos_virus.tsa_vir_id IS
    'Identificador do Virus.';

ALTER TABLE testes_antigenos_virus ADD CONSTRAINT pk_tsa PRIMARY KEY ( tsa_tea_id,
                                                                        tsa_vir_id );