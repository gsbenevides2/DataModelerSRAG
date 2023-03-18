CREATE TABLE unidades (
    uni_id       INTEGER,
    uni_cod_cnes INTEGER,
    uni_nome     VARCHAR2(100),
    uni_mun_id   INTEGER
);

COMMENT ON TABLE unidades IS
    'Tabela que lista as unidades de saúde.';

COMMENT ON COLUMN unidades.uni_id IS
    'Identificador autoincremental da unidade de saúde.';

COMMENT ON COLUMN unidades.uni_cod_cnes IS
    'Código do CNES(Cadastro Nacional de Estabelecimentos de Saúde)';

COMMENT ON COLUMN unidades.uni_nome IS
    'Nome da unidade de saúde.';

COMMENT ON COLUMN unidades.uni_mun_id IS
    'Identificador do município em que se encontra a unidade de saúde.';

ALTER TABLE unidades ADD CONSTRAINT pk_uni PRIMARY KEY ( uni_id );
ALTER TABLE unidades ADD CONSTRAINT un_uni_cod_cnes UNIQUE ( uni_cod_cnes );
ALTER TABLE unidades ADD CONSTRAINT ck_uni_01 CHECK (uni_cod_cnes IS NOT NULL);
ALTER TABLE unidades ADD CONSTRAINT ck_uni_02 CHECK (uni_nome IS NOT NULL);
ALTER TABLE unidades ADD CONSTRAINT un_uni_03 CHECK (uni_mun_id IS NOT NULL);

CREATE SEQUENCE seq_uni NOCACHE;

CREATE TRIGGER tg_seq_uni
BEFORE INSERT
ON unidades
FOR EACH ROW
BEGIN
  :new.uni_id := seq_uni.nextval;
END;
/
