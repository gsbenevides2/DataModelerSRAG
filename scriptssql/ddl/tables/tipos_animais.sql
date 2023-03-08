CREATE TABLE tipos_animais (
    tan_id        INTEGER,
    tan_descricao VARCHAR2(30)
);

COMMENT ON TABLE tipos_animais IS
    'Tabela que lista todos os tipos de animais possiveis que um caso pode ter.';

COMMENT ON COLUMN tipos_animais.tan_id IS
    'Identificador do tipo de animal';

COMMENT ON COLUMN tipos_animais.tan_descricao IS
    'Descrição do tipo de animal.';

ALTER TABLE tipos_animais ADD CONSTRAINT pk_tan PRIMARY KEY ( tan_id );
ALTER TABLE tipos_animais ADD CONSTRAINT ck_tan_01 CHECK ( tan_descricao IS NOT NULL);

CREATE SEQUENCE seq_tan START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_tan
BEFORE INSERT 
ON tipos_animais
FOR EACH ROW
BEGIN
 :new.tan_id := seq_tan.nextval;
END;
/
ALTER TRIGGER tg_seq_tan DISABLE;