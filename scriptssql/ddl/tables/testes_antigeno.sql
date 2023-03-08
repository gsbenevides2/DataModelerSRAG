CREATE TABLE testes_antigeno (
    tea_cas_id         INTEGER,
    tea_tta_id         INTEGER,
    tea_rta_id         INTEGER,
    tea_vir_id         INTEGER,
    tea_data_resultado DATE
);

COMMENT ON TABLE testes_antigeno IS
    'Tabela que lista os casos emque foram realizado teste para pesquisa de antigeno.';

COMMENT ON COLUMN testes_antigeno.tea_cas_id IS
    'Identificador do caso para aquele teste antigeno.';

COMMENT ON COLUMN testes_antigeno.tea_tta_id IS
    'Identificador do tipo de teste para pesquisa de antigenos que foi realizado.';

COMMENT ON COLUMN testes_antigeno.tea_rta_id IS
    'Identificador do resultado do teste para pesquisa de antigenos.';

COMMENT ON COLUMN testes_antigeno.tea_vir_id IS
    'Identificador do Virus respiratório encontrado no teste .';

COMMENT ON COLUMN testes_antigeno.tea_data_resultado IS
    'Data do resultado de teste antigeno.';

ALTER TABLE testes_antigeno ADD CONSTRAINT pk_tea PRIMARY KEY ( tea_cas_id );