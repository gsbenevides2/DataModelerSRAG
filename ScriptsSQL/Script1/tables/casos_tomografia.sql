CREATE TABLE casos_tomografia (
    cto_cas_id INTEGER,
    cto_ast_id INTEGER,
    cto_date   DATE
);

COMMENT ON TABLE casos_tomografia IS
    'Tabela que demonstra relação de entre casos e tomografia.';

COMMENT ON COLUMN casos_tomografia.cto_cas_id IS
    'Identificador do casos onde foi realizado uma tomografia.';

COMMENT ON COLUMN casos_tomografia.cto_ast_id IS
    'Identificador do tipo de resultado da tomografia do caso.';

COMMENT ON COLUMN casos_tomografia.cto_date IS
    'Data em que foi realizada a tomografia.';

ALTER TABLE casos_tomografia ADD CONSTRAINT pk_cto PRIMARY KEY ( cto_cas_id );
ALTER TABLE casos_tomografia ADD CONSTRAINT ck_cto_01 CHECK (cto_ast_id IS NOT NULL);