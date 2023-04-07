CREATE TABLE casos_amostras (
    cam_cas_id INTEGER,
    cam_tam_id INTEGER,
    cam_data   DATE
);

COMMENT ON TABLE casos_amostras IS
    'Tabela que demonstra relação de quais casos tiveram amostra coletada para exame diagnóstico.';

COMMENT ON COLUMN casos_amostras.cam_cas_id IS
    'Identificador do caso que está relacionado a amostra coletada no teste diagnóstico.';

COMMENT ON COLUMN casos_amostras.cam_tam_id IS
    'Identificador do tipo de amostra que foi coletada.';

COMMENT ON COLUMN casos_amostras.cam_data IS
    'Data da coleta da amostra para realização de teste diagnóstico.';

ALTER TABLE casos_amostras ADD CONSTRAINT pk_cam PRIMARY KEY ( cam_cas_id );

