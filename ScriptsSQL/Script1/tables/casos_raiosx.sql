CREATE TABLE casos_raiosx (
    crx_cas_id INTEGER,
    crx_rai_id INTEGER,
    crx_date   DATE
);

COMMENT ON TABLE casos_raiosx IS
    'Tabela que demonstra relação de quais casos realizaram exame de raios X.';

COMMENT ON COLUMN casos_raiosx.crx_cas_id IS
    'Identificador do caso que realizou um exame de raios X.';

COMMENT ON COLUMN casos_raiosx.crx_rai_id IS
    'Identificador do tipo de resultado do exame de raios X realizado.';

COMMENT ON COLUMN casos_raiosx.crx_date IS
    'Data em que foi realizado o exame de raios X.';

ALTER TABLE casos_raiosx ADD CONSTRAINT pk_crx PRIMARY KEY ( crx_cas_id );
