CREATE TRIGGER tg_h_crx
AFTER UPDATE OR DELETE
ON casos_raiosx
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_raiosx VALUES
        (
            :OLD.crx_cas_id,
            :OLD.crx_rai_id,
            :OLD.crx_date,
            SYSDATE
        );
END;