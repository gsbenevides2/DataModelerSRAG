CREATE TABLE casos_animais (
    can_cas_id INTEGER,
    can_tan_id INTEGER
);

COMMENT ON TABLE casos_animais IS
    'Tabela de relacionamentos muito para muitos entre os casos e os tipos de animais envolvidos em cada caso.';

COMMENT ON COLUMN casos_animais.can_cas_id IS
    'Identificador do caso.';

COMMENT ON COLUMN casos_animais.can_tan_id IS
    'Identificador do tipo de animal.';

ALTER TABLE casos_animais ADD CONSTRAINT pk_can PRIMARY KEY ( can_cas_id,
                                                              can_tan_id );
