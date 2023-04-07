CREATE TABLE teste_sorologicos (
    tso_cas_id         INTEGER,
    tso_tas_id         INTEGER,
    tso_tts_id         INTEGER,
    tso_data_coleta    DATE,
    tso_data_resultado DATE,
    tso_rts_igg        NUMBER(1),
    tso_rts_igm        NUMBER(1),
    tso_rts_iga        NUMBER(1)
);

COMMENT ON TABLE teste_sorologicos IS
    'Tabela que lista quais casos foram realizados testes sorológicos.';

COMMENT ON COLUMN teste_sorologicos.tso_cas_id IS
    'Identificador do caso que realizou um teste sorológico para SARS-Cov-2.';

COMMENT ON COLUMN teste_sorologicos.tso_tas_id IS
    'Identificador do tipo de amostra usada no teste sorológico.';

COMMENT ON COLUMN teste_sorologicos.tso_tts_id IS
    'Identificador do tipo de teste sorológico realizado.';

COMMENT ON COLUMN teste_sorologicos.tso_data_coleta IS
    'Data da coleta da amostra para teste sorológico.';

COMMENT ON COLUMN teste_sorologicos.tso_data_resultado IS
    'Data do resultado do teste sorológico.';

COMMENT ON COLUMN teste_sorologicos.tso_rts_igg IS
    'Resultado do teste sorológico na busca de anticorpos IGG.';

COMMENT ON COLUMN teste_sorologicos.tso_rts_igm IS
    'Resultado do teste sorológico na busca de anticorpos IGM.';

COMMENT ON COLUMN teste_sorologicos.tso_rts_iga IS
    'Resultado do teste sorológico na busca de anticorpos IGA.';

ALTER TABLE teste_sorologicos ADD CONSTRAINT pk_tso PRIMARY KEY ( tso_cas_id );

