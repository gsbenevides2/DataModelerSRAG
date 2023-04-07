CREATE TABLE casos_antivirais_gripe (
    cag_cas_id INTEGER,
    cag_ang_id INTEGER,
    cag_data   DATE
);

COMMENT ON TABLE casos_antivirais_gripe IS
    'Tabela que demonstra relação de quais casos utilizaram antiviral para gripe.';

COMMENT ON COLUMN casos_antivirais_gripe.cag_cas_id IS
    'Identificador do caso que fez uso de antiviral para gripe.';

COMMENT ON COLUMN casos_antivirais_gripe.cag_ang_id IS
    'Identificador do antiviral para gripe utilizado naquele caso.';

COMMENT ON COLUMN casos_antivirais_gripe.cag_data IS
    'Data em que foi iniciado o tratamento com aquele antiviral para gripe.';

ALTER TABLE casos_antivirais_gripe ADD CONSTRAINT pk_cag PRIMARY KEY ( cag_cas_id );
