CREATE TABLE genero (
    gen_id        NUMBER(1),
    gen_descricao VARCHAR2(15)
);

COMMENT ON TABLE genero IS
    'Tabela de metadados contendo dos generos informados pelos pacientes.';

COMMENT ON COLUMN genero.gen_id IS
    'Identificador do genero.';

COMMENT ON COLUMN genero.gen_descricao IS
    'Descrição do genero.';

ALTER TABLE genero ADD CONSTRAINT pk_gen PRIMARY KEY ( gen_id );
ALTER TABLE genero ADD CONSTRAINT ck_gen_01 CHECK (gen_descricao IS NOT NULL);

CREATE SEQUENCE seq_gen START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_gen
BEFORE INSERT
ON genero
FOR EACH ROW
BEGIN
    :new.gen_id := seq_gen.nextval;
END;
/
ALTER TRIGGER tg_seq_gen DISABLE;