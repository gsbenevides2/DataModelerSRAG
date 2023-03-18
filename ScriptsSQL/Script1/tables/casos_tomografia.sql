CREATE TABLE casos_tomografia (
    cto_cas_id INTEGER,
    cto_ast_id INTEGER,
    cto_date   DATE
);

COMMENT ON TABLE casos_tomografia IS
    'Tabela de relação um para muitos entre os casos e os possiveis aspectos de tomografias.';

COMMENT ON COLUMN casos_tomografia.cto_cas_id IS
    'Identificador do caso que gerou a tomografia.';

COMMENT ON COLUMN casos_tomografia.cto_ast_id IS
    'Identificação do resultado que define o aspecto da tomografia.';

COMMENT ON COLUMN casos_tomografia.cto_date IS
    'Data em que foi realizada a tomografia.';

ALTER TABLE casos_tomografia ADD CONSTRAINT pk_cto PRIMARY KEY ( cto_cas_id );
ALTER TABLE casos_tomografia ADD CONSTRAINT ck_cto_01 CHECK (cto_ast_id IS NOT NULL);