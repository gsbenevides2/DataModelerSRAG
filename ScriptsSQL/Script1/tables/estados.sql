CREATE TABLE estados (
    est_id   INTEGER,
    est_nome VARCHAR2(10)
);

COMMENT ON TABLE estados IS
    'Tabela de metadados que lista os estados do Brasil.';

COMMENT ON COLUMN estados.est_id IS
    'Identificador único e autoincremental do estado.';

COMMENT ON COLUMN estados.est_nome IS
    'Nome do estado.';

ALTER TABLE estados ADD CONSTRAINT pk_est PRIMARY KEY ( est_id );

CREATE SEQUENCE seq_est NOCACHE;

CREATE TRIGGER tg_seq_est
BEFORE INSERT
ON estados
FOR EACH ROW
BEGIN
    :new.est_id := seq_est.nextval;
END;
/