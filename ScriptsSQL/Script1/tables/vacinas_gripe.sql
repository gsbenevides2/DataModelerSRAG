CREATE TABLE vacinas_gripe (
    vag_cas_id INTEGER,
    vag_data   DATE
);

COMMENT ON TABLE vacinas_gripe IS
    'Tabela que listas quais casos o paciente tomou alguma vacina da gripe.';

COMMENT ON COLUMN vacinas_gripe.vag_cas_id IS
    'Identificador do caso que foi vacinado contra gripe.';

COMMENT ON COLUMN vacinas_gripe.vag_data IS
    'Data da ultima dose de vacina contra gripe que o paciente tomou.';

ALTER TABLE vacinas_gripe ADD CONSTRAINT pk_vag PRIMARY KEY ( vag_cas_id );