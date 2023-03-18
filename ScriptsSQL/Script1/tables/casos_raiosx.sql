CREATE TABLE casos_raiosx (
    crx_cas_id INTEGER,
    crx_rai_id INTEGER,
    crx_date   DATE
);

COMMENT ON TABLE casos_raiosx IS
    'Tabela de relacionamento um para um entre um caso e um raio x.';

COMMENT ON COLUMN casos_raiosx.crx_cas_id IS
    'Identificador do caso do resultado do raiox.';

COMMENT ON COLUMN casos_raiosx.crx_rai_id IS
    'Identificador do tipo de resultado para o raiox realizado.';

COMMENT ON COLUMN casos_raiosx.crx_date IS
    'Data da realização do raio x.';

ALTER TABLE casos_raiosx ADD CONSTRAINT pk_crx PRIMARY KEY ( crx_cas_id );
