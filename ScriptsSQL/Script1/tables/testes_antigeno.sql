CREATE TABLE testes_antigeno (
    tea_cas_id         INTEGER,
    tea_tta_id         INTEGER,
    tea_rta_id         INTEGER,
    tea_data_resultado DATE
);

COMMENT ON TABLE testes_antigeno IS
    'Tabela que lista os casos em que foram realizados testes para pesquisa de antígeno.';

COMMENT ON COLUMN testes_antigeno.tea_cas_id IS
    'Identificador do caso para aquele teste antígeno.';

COMMENT ON COLUMN testes_antigeno.tea_tta_id IS
    'Identificador do tipo de teste para pesquisa de antígenos que foi realizado.';

COMMENT ON COLUMN testes_antigeno.tea_rta_id IS
    'Identificador do resultado do teste para pesquisa de antígenos.';

COMMENT ON COLUMN testes_antigeno.tea_data_resultado IS
    'Data do resultado do teste antígeno.';

ALTER TABLE testes_antigeno ADD CONSTRAINT pk_tea PRIMARY KEY ( tea_cas_id );