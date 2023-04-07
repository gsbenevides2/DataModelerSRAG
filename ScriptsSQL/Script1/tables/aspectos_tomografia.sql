CREATE TABLE aspectos_tomografia (
    ast_id        INTEGER,
    ast_descricao VARCHAR2(100)
);

COMMENT ON TABLE aspectos_tomografia IS
    'Tabela de metadados que lista os possíveis aspectos de tomografia.';

COMMENT ON COLUMN aspectos_tomografia.ast_id IS
    'Identificador do tipo de aspecto da tomografia.';

COMMENT ON COLUMN aspectos_tomografia.ast_descricao IS
    'Descrição do aspecto da tomografia.';

ALTER TABLE aspectos_tomografia ADD CONSTRAINT pk_ast PRIMARY KEY ( ast_id );
ALTER TABLE aspectos_tomografia ADD CONSTRAINT ck_ast_01 CHECK (ast_descricao IS NOT NULL);


CREATE SEQUENCE seq_ast START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_ast
BEFORE INSERT
ON aspectos_tomografia
FOR EACH ROW
BEGIN
    :new.ast_id := seq_ast.nextval;
END;
/

ALTER TRIGGER tg_seq_ast DISABLE;
