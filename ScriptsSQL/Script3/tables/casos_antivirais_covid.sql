CREATE TRIGGER tg_h_cac
AFTER UPDATE OR DELETE
ON casos_antivirais_covid
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_antivirais_covid VALUES
        (
            :OLD.cas_cas_id,
            :OLD.cas_anc_id,
            :OLD.cas_data_inicio,
            SYSDATE
        );
END;