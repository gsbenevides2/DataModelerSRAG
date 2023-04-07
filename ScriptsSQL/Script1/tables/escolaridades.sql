CREATE TABLE escolaridades (
    esc_id        NUMBER(1),
    esc_descricao VARCHAR2(40)
);

COMMENT ON TABLE escolaridades IS
    'Tabela de metadados que lista possíveis tipos de escolaridade que o paciente pode possuir.';

COMMENT ON COLUMN escolaridades.esc_id IS
    'Identificador único do tipo de escolaridade.';

COMMENT ON COLUMN escolaridades.esc_descricao IS
    'Descrição do tipo de escolaridade.';

ALTER TABLE escolaridades ADD CONSTRAINT pk_esc PRIMARY KEY ( esc_id );
ALTER TABLE escolaridades ADD CONSTRAINT ck_esc_01 CHECK (esc_descricao IS NOT NULL);

CREATE SEQUENCE seq_esc START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_esc
BEFORE INSERT
ON escolaridades
FOR EACH ROW
BEGIN
    :new.esc_id := seq_esc.nextval;
END;
/

ALTER TRIGGER tg_seq_esc DISABLE;