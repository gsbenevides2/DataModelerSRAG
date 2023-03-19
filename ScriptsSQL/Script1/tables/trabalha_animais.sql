CREATE TABLE trabalha_animais (
    tan_id        INTEGER,
    tan_descricao VARCHAR2(30)
);

COMMENT ON TABLE trabalha_animais IS
    'Tabela de metadados que lista os possiveis casos para alguém que trabalha com animais.';

COMMENT ON COLUMN trabalha_animais.tan_id IS
    'Identificador do tipo da situação.';

COMMENT ON COLUMN trabalha_animais.tan_descricao IS
    'Descrição do tipo da situação.';

ALTER TABLE trabalha_animais ADD CONSTRAINT pk_tan PRIMARY KEY ( tan_id );
ALTER TABLE trabalha_animais ADD CONSTRAINT ck_tan_01 CHECK ( tan_descricao IS NOT NULL);

CREATE SEQUENCE seq_tan START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_tan
BEFORE INSERT 
ON trabalha_animais
FOR EACH ROW
BEGIN
 :new.tan_id := seq_tan.nextval;
END;
/
ALTER TRIGGER tg_seq_tan DISABLE;