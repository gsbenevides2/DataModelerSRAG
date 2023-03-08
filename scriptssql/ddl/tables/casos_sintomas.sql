CREATE TABLE casos_sintomas (
    csi_sin_id INTEGER,
    csi_cas_id INTEGER
);

COMMENT ON TABLE casos_sintomas IS
    'Tabela de relacionamento de muitos para muitos entre casos e sintomas.';

COMMENT ON COLUMN casos_sintomas.csi_sin_id IS
    'Identificador do Sintoma.';

COMMENT ON COLUMN casos_sintomas.csi_cas_id IS
    'Identificador do Caso';

ALTER TABLE casos_sintomas ADD CONSTRAINT pk_csi PRIMARY KEY ( csi_sin_id,
                                                               csi_cas_id );
