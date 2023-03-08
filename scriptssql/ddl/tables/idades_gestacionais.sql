CREATE TABLE idades_gestacionais (
    idg_id        NUMBER(1),
    idg_descricao VARCHAR2(50)
);

COMMENT ON TABLE idades_gestacionais IS
    'Tabela de metadados de idades gestacionais.';

COMMENT ON COLUMN idades_gestacionais.idg_id IS
    'Identificador do tipo de idade gestacional do paciente.';

COMMENT ON COLUMN idades_gestacionais.idg_descricao IS
    'Descrição da idade gestacional do paciente.';

ALTER TABLE idades_gestacionais ADD CONSTRAINT pk_idg PRIMARY KEY ( idg_id );
ALTER TABLE idades_gestacionais ADD CONSTRAINT ck_idg_01 CHECK (idg_descricao IS NOT NULL);

CREATE SEQUENCE seq_idg START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_idg
BEFORE INSERT
ON idades_gestacionais
FOR EACH ROW
BEGIN
    :new.idg_id := seq_idg.nextval;
END;
/
ALTER TRIGGER tg_seq_idg DISABLE;