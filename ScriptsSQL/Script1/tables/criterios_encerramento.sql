CREATE TABLE criterios_encerramento (
    cri_id   INTEGER,
    cri_desc VARCHAR2(50)
);

COMMENT ON TABLE criterios_encerramento IS
    'Tabela de metadados que lista os possíveis critérios de encerramento do caso.';

COMMENT ON COLUMN criterios_encerramento.cri_id IS
    'Identificador do critério de encerramento do caso.';

COMMENT ON COLUMN criterios_encerramento.cri_desc IS
    'Descrição do critério de encerramento.';

ALTER TABLE criterios_encerramento ADD CONSTRAINT pk_cri PRIMARY KEY ( cri_id );
ALTER TABLE criterios_encerramento ADD CONSTRAINT ck_cri_01 CHECK (cri_desc IS NOT NULL);

CREATE SEQUENCE seq_cri START WITH 5 NOCACHE;

CREATE TRIGGER tg_seq_cri
BEFORE INSERT
ON criterios_encerramento
FOR EACH ROW
BEGIN
    :new.cri_id := seq_cri.nextval;
END;
/

ALTER TRIGGER tg_seq_cri DISABLE;
