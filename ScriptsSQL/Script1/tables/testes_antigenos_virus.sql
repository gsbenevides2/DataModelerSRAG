CREATE TABLE testes_antigenos_virus (
    tsa_tea_id INTEGER NOT NULL,
    tsa_vir_id INTEGER NOT NULL
);

COMMENT ON TABLE testes_antigenos_virus IS
    'Tabela que lista os vírus encontrados pelo teste antígeno.';

COMMENT ON COLUMN testes_antigenos_virus.tsa_tea_id IS
    'Identificador do teste antígeno.';

COMMENT ON COLUMN testes_antigenos_virus.tsa_vir_id IS
    'Identificador do vírus encontrado no teste antígeno.';

ALTER TABLE testes_antigenos_virus ADD CONSTRAINT pk_tsa PRIMARY KEY ( tsa_tea_id,
                                                                        tsa_vir_id );