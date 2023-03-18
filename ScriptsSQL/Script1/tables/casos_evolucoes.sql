CREATE TABLE casos_evolucoes (
    cev_cas_id INTEGER,
    cev_evo_id NUMBER(1),
    cev_date   DATE
);

COMMENT ON TABLE casos_evolucoes IS
    'Tabela que indica quais casos possuem um evolução.';

COMMENT ON COLUMN casos_evolucoes.cev_cas_id IS
    'Identificador do caso que evoluiu.';

COMMENT ON COLUMN casos_evolucoes.cev_evo_id IS
    'Identificador do tipo de evolução do caso.';

COMMENT ON COLUMN casos_evolucoes.cev_date IS
    'Data da evolução do caso.';

ALTER TABLE casos_evolucoes ADD CONSTRAINT pk_cev PRIMARY KEY ( cev_cas_id );
ALTER TABLE casos_evolucoes ADD CONSTRAINT ck_cev_01 CHECK (cev_evo_id IS NOT NULL);
