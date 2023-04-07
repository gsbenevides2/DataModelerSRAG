CREATE TABLE doses (
    dos_id  INTEGER,
    dos_des VARCHAR2(10)
);

COMMENT ON TABLE doses IS
    'Tabela de metadados que lista as doses da vacina de COVID-19.';

COMMENT ON COLUMN doses.dos_id IS
    'Identificador unico e autoincremental do tipo de dose de vacina.';

COMMENT ON COLUMN doses.dos_des IS
    'Descrição do tipo de dose da vacina.';

ALTER TABLE doses ADD CONSTRAINT pk_dos PRIMARY KEY ( dos_id );
ALTER TABLE doses ADD CONSTRAINT ck_dos_01 CHECK (dos_des IS NOT NULL);

CREATE SEQUENCE seq_dos NOCACHE;

CREATE TRIGGER tg_seq_dos
BEFORE INSERT
ON doses
FOR EACH ROW
BEGIN
    :new.dos_id := seq_dos.nextval;
END;
/