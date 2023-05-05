CREATE TRIGGER tg_h_cag
AFTER UPDATE OR DELETE
ON casos_antivirais_gripe
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_antivirais_gripe VALUES
        (
            :OLD.cag_cas_id,
            :OLD.cag_ang_id,
            :OLD.cag_data,
            SYSDATE
        );
END;
/