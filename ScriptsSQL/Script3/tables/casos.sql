CREATE TRIGGER tg_h_cas
AFTER UPDATE OR DELETE
ON casos
FOR EACH ROW
BEGIN
    INSERT INTO h_casos VALUES
        (
            :OLD.cas_id,
            :OLD.cas_data_notificacao,
            :OLD.cas_data_primeiros_sintomas,
            :OLD.cas_uni_id,
            :OLD.cas_estrangeiro,
            :OLD.cas_gen_id,
            :OLD.cas_data_nascimento,
            :OLD.cas_idg_id,
            :OLD.cas_rac_id,
            :OLD.cas_esc_id,
            :OLD.cas_mun_id,
            :OLD.cas_zon_id,
            :OLD.cas_nosocomial,
            :OLD.cas_sve_id,
            :OLD.cas_cla_id,
            :OLD.cas_data_digitacao,
            :OLD.cas_tan_id, 
            SYSDATE
        );
END;
/