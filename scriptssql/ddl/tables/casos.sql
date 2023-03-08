CREATE TABLE casos (
    cas_id                      INTEGER,
    cas_data_notificacao        DATE,
    cas_data_primeiros_sintomas DATE ,
    cas_uni_id                  INTEGER,
    cas_estrangeiro             CHAR(1),
    cas_gen_id                  NUMBER(1),
    cas_data_nascimento         DATE,
    cas_idg_id                  NUMBER(1),
    cas_rac_id                  NUMBER(1),
    cas_esc_id                  NUMBER(1),
    cas_mun_id                  INTEGER,
    cas_zon_id                  NUMBER(1),
    cas_nosocomial              CHAR(1),
    cas_sve_id                  NUMBER(1),
    cas_cla_id                  INTEGER,
    cas_data_digitacao          DATE
);

COMMENT ON TABLE casos IS
    'Tabela que contem todos os casos de SRAG Síndrome Respiratória Aguda Grave, registrada pelo Sistema Único de Saúde(SUS).';

COMMENT ON COLUMN casos.cas_id IS
    'Identificador autoincremental de cada caso de sindrome respiratória aguda grave.';

COMMENT ON COLUMN casos.cas_data_notificacao IS
    'Data do preenchimento da ficha de notificação.';

COMMENT ON COLUMN casos.cas_data_primeiros_sintomas IS
    'Data de inicio dos primeiros sintomas do caso.';

COMMENT ON COLUMN casos.cas_uni_id IS
    'Identificador da unidade de saúde que realizou a notificação.';

COMMENT ON COLUMN casos.cas_estrangeiro IS
    'Boleano que representa se o paciente é ou não estrangeiro.';

COMMENT ON COLUMN casos.cas_gen_id IS
    'Genero do paciente.';

COMMENT ON COLUMN casos.cas_data_nascimento IS
    'Data de nascimento do paciente.';

COMMENT ON COLUMN casos.cas_idg_id IS
    'Identificador da idade gestacional do paciente.';

COMMENT ON COLUMN casos.cas_rac_id IS
    'Identificador da raça declarada pelo paciente.';

COMMENT ON COLUMN casos.cas_esc_id IS
    'Idetificador do nível de escolaridade do paciente.';

COMMENT ON COLUMN casos.cas_mun_id IS
    'Identificador do município de residencia do paciente.';

COMMENT ON COLUMN casos.cas_zon_id IS
    'Zona de geografica de endereço do Paciente.';

COMMENT ON COLUMN casos.cas_nosocomial IS
    'Caso de Sindrome respiratória aguda grave adquirida em atendimento hospitalar.';

COMMENT ON COLUMN casos.cas_sve_id IS
    'Identificador do nível de suporte ventilatório utilizado.';

COMMENT ON COLUMN casos.cas_cla_id IS
    'Identificador da classificação do caso de SRAG';

COMMENT ON COLUMN casos.cas_data_digitacao IS
    'Data de inserção do caso no sistema.';

ALTER TABLE casos ADD CONSTRAINT pk_cas PRIMARY KEY ( cas_id );
ALTER TABLE casos ADD CONSTRAINT ck_cas_01 CHECK (cas_data_notificacao IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_02 CHECK (cas_data_primeiros_sintomas IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_03 CHECK (cas_uni_id IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_04 CHECK (cas_estrangeiro IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_05 CHECK (cas_gen_id IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_06 CHECK (cas_idg_id IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_07 CHECK (cas_rac_id IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_08 CHECK (cas_mun_id IS NOT NULL);
ALTER TABLE casos ADD CONSTRAINT ck_cas_09 CHECK (cas_cla_id IS NOT NULL);

CREATE SEQUENCE seq_cas START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_cas
BEFORE INSERT
ON casos
FOR EACH ROW
BEGIN
    :new.cas_id := seq_cas.nextval;
END;
/
