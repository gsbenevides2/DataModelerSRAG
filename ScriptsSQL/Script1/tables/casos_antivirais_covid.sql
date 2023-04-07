CREATE TABLE casos_antivirais_covid (
    cac_cas_id      INTEGER,
    cac_anc_id      INTEGER,
    cac_data_inicio DATE
);

COMMENT ON TABLE casos_antivirais_covid IS
    'Tabela que demonstra relação de quais casos utilizaram antiviral para COVID.';

COMMENT ON COLUMN casos_antivirais_covid.cac_cas_id IS
    'Identificador do caso que fez uso de antiviral para COVID.';

COMMENT ON COLUMN casos_antivirais_covid.cac_anc_id IS
    'Identificador do antiviral para COVID utilizado naquele caso.';

COMMENT ON COLUMN casos_antivirais_covid.cac_data_inicio IS
    'Data em que foi iniciado o tratamento com aquele antiviral para COVID.';

ALTER TABLE casos_antivirais_covid ADD CONSTRAINT pk_cac PRIMARY KEY ( cac_cas_id );
