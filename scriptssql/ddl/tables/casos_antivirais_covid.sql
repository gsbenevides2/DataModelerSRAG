CREATE TABLE casos_antivirais_covid (
    cac_cas_id      INTEGER,
    cac_anc_id      INTEGER,
    cac_data_inicio DATE
);

COMMENT ON TABLE casos_antivirais_covid IS
    'Tabela de relação um para um com atributos. Um caso pode ter usado um antiviral. ';

COMMENT ON COLUMN casos_antivirais_covid.cac_cas_id IS
    'Identificador do caso relacionado a aquele antiviral.';

COMMENT ON COLUMN casos_antivirais_covid.cac_anc_id IS
    'Identificador do antiviral utilizado.';

COMMENT ON COLUMN casos_antivirais_covid.cac_data_inicio IS
    'Data em que foi iniciado o tratamento com o antiviral. para covid';

ALTER TABLE casos_antivirais_covid ADD CONSTRAINT pk_cac PRIMARY KEY ( cac_cas_id );
