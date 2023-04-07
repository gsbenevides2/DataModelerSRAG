CREATE TABLE casos_sintomas (
    csi_sin_id INTEGER,
    csi_cas_id INTEGER
);

COMMENT ON TABLE casos_sintomas IS
    'Tabela que demonstra relação de entre casos e sintomas.';

COMMENT ON COLUMN casos_sintomas.csi_sin_id IS
    'Identificador do sintoma relacionado à aquele caso.';

COMMENT ON COLUMN casos_sintomas.csi_cas_id IS
    'Identificador do caso que teve aquele sintoma.';

ALTER TABLE casos_sintomas ADD CONSTRAINT pk_csi PRIMARY KEY ( csi_sin_id,
                                                               csi_cas_id );
