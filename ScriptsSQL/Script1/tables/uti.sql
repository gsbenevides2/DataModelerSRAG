CREATE TABLE uti (
    uti_cas_id       INTEGER,
    uti_data_entrada DATE,
    uti_data_saida   DATE
);

COMMENT ON TABLE uti IS
    'Tabela que lista os casos que foram parar na UTI.';

COMMENT ON COLUMN uti.uti_cas_id IS
    'Identificador do caso onde o paciente foi parar na UTI.';

COMMENT ON COLUMN uti.uti_data_entrada IS
    'Data de entrada na UTI.';

COMMENT ON COLUMN uti.uti_data_saida IS
    'Data de saída da UTI.';

ALTER TABLE uti ADD CONSTRAINT pk_uti PRIMARY KEY ( uti_cas_id );

