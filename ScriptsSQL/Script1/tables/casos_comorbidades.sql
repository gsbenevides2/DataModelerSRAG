CREATE TABLE casos_comorbidades (
    cco_cas_id INTEGER,
    cco_com_id INTEGER
);

COMMENT ON TABLE casos_comorbidades IS
    'Tabela de relacionamento muitos para muitos entre os casos e as comorbidades dos pacientes.';

COMMENT ON COLUMN casos_comorbidades.cco_cas_id IS
    'Identificador do caso.';

COMMENT ON COLUMN casos_comorbidades.cco_com_id IS
    'Identificador da comobidade.';

ALTER TABLE casos_comorbidades ADD CONSTRAINT pk_cco PRIMARY KEY ( cco_cas_id,
                                                                   cco_com_id );
