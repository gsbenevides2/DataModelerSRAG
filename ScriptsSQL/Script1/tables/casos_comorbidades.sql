CREATE TABLE casos_comorbidades (
    cco_cas_id INTEGER,
    cco_com_id INTEGER
);

COMMENT ON TABLE casos_comorbidades IS
    'Tabela que demonstra relação de quais casos reportaram comorbidades.';

COMMENT ON COLUMN casos_comorbidades.cco_cas_id IS
    'Identificador do caso que possuí aquela comorbidade relacionada.';

COMMENT ON COLUMN casos_comorbidades.cco_com_id IS
    'Identificador da comorbidade relacionada à aquele caso.';

ALTER TABLE casos_comorbidades ADD CONSTRAINT pk_cco PRIMARY KEY ( cco_cas_id,
                                                                   cco_com_id );
