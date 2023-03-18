CREATE TABLE vacinas_covid (
    vac_cas_id         INTEGER,
    vac_dos_id         INTEGER,
    vac_fab_id         INTEGER,
    vac_lote           VARCHAR2(10),
    vac_data_aplicacao DATE
);

COMMENT ON TABLE vacinas_covid IS
    'Tabela que as vacinas que cada caso venha possuir.';

COMMENT ON COLUMN vacinas_covid.vac_cas_id IS
    'Identificador único da vacina do paciente.';

COMMENT ON COLUMN vacinas_covid.vac_dos_id IS
    'Identificador do tipo da dose da vacina.';

COMMENT ON COLUMN vacinas_covid.vac_fab_id IS
    'Código do fabricante da vacina.';

COMMENT ON COLUMN vacinas_covid.vac_lote IS
    'Identificação do lote da vacina.';

COMMENT ON COLUMN vacinas_covid.vac_data_aplicacao IS
    'Data de aplicação da vacina.';

ALTER TABLE vacinas_covid ADD CONSTRAINT pk_vac PRIMARY KEY ( vac_cas_id,
                                                              vac_dos_id );