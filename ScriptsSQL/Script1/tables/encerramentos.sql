CREATE TABLE encerramentos (
    enc_cas_id INTEGER,
    enc_cri_id INTEGER,
    enc_data   DATE
);

COMMENT ON TABLE encerramentos IS
    'Tabela que demonstra relação entre os casos e o critério de encerramento.';

COMMENT ON COLUMN encerramentos.enc_cas_id IS
    'Identificador do caso que foi encerrado.';

COMMENT ON COLUMN encerramentos.enc_cri_id IS
    'Identificador do critério utilizado no encerramento do caso.';

COMMENT ON COLUMN encerramentos.enc_data IS
    'Data de encerramento do caso.';

ALTER TABLE encerramentos ADD CONSTRAINT pk_enc PRIMARY KEY ( enc_cas_id );
