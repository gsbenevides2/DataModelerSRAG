CREATE TABLE internacoes (
    int_cas_id INTEGER,
    int_data   DATE,
    int_uni_id INTEGER
);

COMMENT ON TABLE internacoes IS
    'Tabela contendo os casos em que ocorrerão internações.';

COMMENT ON COLUMN internacoes.int_cas_id IS
    'Identificador autoincremental do caso da internação.';

COMMENT ON COLUMN internacoes.int_data IS
    'Data da internação.';

COMMENT ON COLUMN internacoes.int_uni_id IS
    'Unidade de saúde que realizou a internação do paciente.';

ALTER TABLE internacoes ADD CONSTRAINT pk_int PRIMARY KEY ( int_cas_id );
ALTER TABLE internacoes ADD CONSTRAINT ck_int_01 CHECK (int_data IS NOT NULL);