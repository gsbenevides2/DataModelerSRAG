CREATE TABLE classificacoes (
    cla_id   INTEGER,
    cla_desc VARCHAR2(50)
);

COMMENT ON TABLE classificacoes IS
    'Tabela de metadados que lista as possíveis classificações finais para os casos.';

COMMENT ON COLUMN classificacoes.cla_id IS
    'Identificador da classficação final do caso.';

COMMENT ON COLUMN classificacoes.cla_desc IS
    'Descrição da classificação final do caso.';

ALTER TABLE classificacoes ADD CONSTRAINT pk_cla PRIMARY KEY ( cla_id );
ALTER TABLE classificacoes ADD CONSTRAINT ck_cla_01 CHECK (cla_desc IS NOT NULL);

CREATE SEQUENCE seq_cla START WITH 5 NOCACHE;

CREATE TRIGGER tg_seq_cla
BEFORE INSERT
ON classificacoes
FOR EACH ROW
BEGIN
    :new.cla_id := seq_cla.nextval;
END;
/

ALTER TRIGGER tg_seq_cla DISABLE;
