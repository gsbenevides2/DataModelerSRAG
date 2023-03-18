CREATE TABLE municipios (
    mun_id       INTEGER,
    mun_cod_ibge INTEGER,
    mun_nome     VARCHAR2(30),
    mun_est_id   INTEGER
);

COMMENT ON TABLE municipios IS
    'Tabela contendo uma relação dos municípios do Brasil.';

COMMENT ON COLUMN municipios.mun_id IS
    'Identificador autoincremental do município.';

COMMENT ON COLUMN municipios.mun_cod_ibge IS
    'Código IBGE do Múnicipio.';

COMMENT ON COLUMN municipios.mun_nome IS
    'Nome do município no IBGE.';

COMMENT ON COLUMN municipios.mun_est_id IS
    'Identificador do estado que pertence aquele município.';

ALTER TABLE municipios ADD CONSTRAINT pk_mun PRIMARY KEY ( mun_id );
ALTER TABLE municipios ADD CONSTRAINT un_mun_cod_ibge UNIQUE ( mun_cod_ibge );
ALTER TABLE municipios ADD CONSTRAINT ck_mun_01 CHECK ( mun_cod_ibge IS NOT NULL );
ALTER TABLE municipios ADD CONSTRAINT ck_mun_02 CHECK ( mun_nome IS NOT NULL );
ALTER TABLE municipios ADD CONSTRAINT ck_mun_03 CHECK ( mun_est_id IS NOT NULL );

CREATE SEQUENCE seq_mun NOCACHE;

CREATE TRIGGER tg_seq_mun
BEFORE INSERT
ON municipios
FOR EACH ROW
BEGIN
    :new.mun_id := seq_mun.nextval;
END;
/