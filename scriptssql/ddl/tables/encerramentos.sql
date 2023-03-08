CREATE TABLE encerramentos (
    enc_cas_id INTEGER,
    enc_cri_id INTEGER,
    enc_data   DATE
);

COMMENT ON TABLE encerramentos IS
    'Tabela que listas quais casos possuem um encerramento.';

COMMENT ON COLUMN encerramentos.enc_cas_id IS
    'Identificador do caso que foi encerrado.';

COMMENT ON COLUMN encerramentos.enc_cri_id IS
    'Identificador do criterio utilizado no encerramento do caso.';

COMMENT ON COLUMN encerramentos.enc_data IS
    'Data de encerramento do caso.';

ALTER TABLE encerramentos ADD CONSTRAINT pk_enc PRIMARY KEY ( enc_cas_id );
ALTER TABLE encerramentos ADD CONSTRAINT ck_enc_01 CHECK (enc_data IS NOT NULL)
