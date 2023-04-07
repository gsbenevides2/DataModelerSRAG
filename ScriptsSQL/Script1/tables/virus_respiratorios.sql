CREATE TABLE virus_respiratorios (
    vir_id  INTEGER,
    vir_des VARCHAR2(40)
);

COMMENT ON TABLE virus_respiratorios IS
    'Tabela de metadados que lista os possíveis vírus respiratórios.';

COMMENT ON COLUMN virus_respiratorios.vir_id IS
    'Identificador do vírus respiratório.';

COMMENT ON COLUMN virus_respiratorios.vir_des IS
    'Descrição do vírus respiratório.';

ALTER TABLE virus_respiratorios ADD CONSTRAINT pk_vir PRIMARY KEY ( vir_id );
ALTER TABLE virus_respiratorios ADD CONSTRAINT ck_vir_01 CHECK ( vir_des IS NOT NULL );

CREATE SEQUENCE seq_vir NOCACHE;

CREATE TRIGGER tg_seq_vir
BEFORE INSERT 
ON virus_respiratorios
FOR EACH ROW
BEGIN
 :new.vir_id := seq_vir.nextval;
END;
/