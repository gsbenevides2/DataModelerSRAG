CREATE TABLE casos_amostras (
    cam_cas_id INTEGER,
    cam_tam_id INTEGER,
    cam_data   DATE
);

COMMENT ON TABLE casos_amostras IS
    'Tabela que demonstra quais casos teve uma amostra coletada para exame diagnóstico.';

COMMENT ON COLUMN casos_amostras.cam_cas_id IS
    'Caso relacionado a amostra coletada para teste diagnóstico.';

COMMENT ON COLUMN casos_amostras.cam_tam_id IS
    'Identificador do tipo de amostra.';

COMMENT ON COLUMN casos_amostras.cam_data IS
    'Data da Coleta da amostra para realização do teste diagnóstico.';

ALTER TABLE casos_amostras ADD CONSTRAINT pk_cam PRIMARY KEY ( cam_cas_id );

