CREATE TABLE evolucoes (
    evo_id   NUMBER(1),
    evo_desc VARCHAR2(30)
);

COMMENT ON TABLE evolucoes IS
    'Tabela de metadados que possui os indica alta ou obito.';

COMMENT ON COLUMN evolucoes.evo_id IS
    'Identificador da evolução do caso';

COMMENT ON COLUMN evolucoes.evo_desc IS
    'Descrição da evolução do caso.';

ALTER TABLE evolucoes ADD CONSTRAINT pk_evo PRIMARY KEY ( evo_id );
ALTER TABLE evolucoes ADD CONSTRAINT ck_evo_01 CHECK (evo_desc IS NOT NULL);

CREATE SEQUENCE seq_evo START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_evo
BEFORE INSERT
ON evolucoes
FOR EACH ROW
BEGIN
    :new.evo_id := seq_evo.nextval;
END;
/
ALTER TRIGGER tg_seq_evo DISABLE;