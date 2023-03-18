CREATE TABLE suporte_ventilador (
    sve_id        NUMBER(1),
    sve_descricao VARCHAR2(30)
);

COMMENT ON TABLE suporte_ventilador IS
    'Tabela de metadados que lista todos os suportes ventilatórios utilizados.';

COMMENT ON COLUMN suporte_ventilador.sve_id IS
    'Indentificador do suporte ventilatório utilizado.';

COMMENT ON COLUMN suporte_ventilador.sve_descricao IS
    'Descrição do tipo de suporte ventilatório utilizado.';

ALTER TABLE suporte_ventilador ADD CONSTRAINT pk_sve PRIMARY KEY ( sve_id );
ALTER TABLE suporte_ventilador ADD CONSTRAINT ck_sve_01 CHECK ( sve_descricao IS NOT NULL );

CREATE SEQUENCE seq_sve START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_sve
BEFORE INSERT
ON suporte_ventilador
FOR EACH ROW
BEGIN
  :new.sve_id := seq_sve.nextval;
END;
/
ALTER TRIGGER tg_seq_sve DISABLE;