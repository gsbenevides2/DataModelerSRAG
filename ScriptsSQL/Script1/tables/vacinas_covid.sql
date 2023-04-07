CREATE TABLE vacinas_covid (
    vac_cas_id         INTEGER,
    vac_dos_id         INTEGER,
    vac_fab_id         INTEGER,
    vac_lote           VARCHAR2(50),
    vac_data_aplicacao DATE
);

COMMENT ON TABLE vacinas_covid IS
    'Tabela que as vacinas que cada caso venha possuir.';

COMMENT ON COLUMN vacinas_covid.vac_cas_id IS
    'Identificador do caso do paciente que foi vacinado contra COVID.';

COMMENT ON COLUMN vacinas_covid.vac_dos_id IS
    'Identificador do tipo da dose da vacina contra COVID.';

COMMENT ON COLUMN vacinas_covid.vac_fab_id IS
    'Identificador do fabricante da vacina contra COVID.';

COMMENT ON COLUMN vacinas_covid.vac_lote IS
    'Identificação do lote da vacina contra COVID.';

COMMENT ON COLUMN vacinas_covid.vac_data_aplicacao IS
    'Data de aplicação da vacina contra COVID.';

ALTER TABLE vacinas_covid ADD CONSTRAINT pk_vac PRIMARY KEY ( vac_cas_id,
                                                              vac_dos_id );