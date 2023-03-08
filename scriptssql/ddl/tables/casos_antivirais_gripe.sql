CREATE TABLE casos_antivirais_gripe (
    cag_cas_id INTEGER,
    cag_ang_id INTEGER,
    cag_data   DATE
);

COMMENT ON TABLE casos_antivirais_gripe IS
    'Tabela de relação um para um com atributos. Um caso pode ter usado um antiviral. ';

COMMENT ON COLUMN casos_antivirais_gripe.cag_cas_id IS
    'Identificador do caso que fez uso de antiviral.';

COMMENT ON COLUMN casos_antivirais_gripe.cag_ang_id IS
    'Identificador do antiviral para gripe utilizado.';

COMMENT ON COLUMN casos_antivirais_gripe.cag_data IS
    'Data em que foi iniciado o tratamento com o antiviral.';

ALTER TABLE casos_antivirais_gripe ADD CONSTRAINT pk_cag PRIMARY KEY ( cag_cas_id );
