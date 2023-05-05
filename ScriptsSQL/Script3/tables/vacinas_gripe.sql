CREATE TRIGGER tg_h_vag
AFTER UPDATE OR DELETE
ON vacinas_gripe
FOR EACH ROW
BEGIN
    INSERT INTO h_vacinas_gripe VALUES
        (
            :OLD.vag_cas_id,
            :OLD.vag_data,
            SYSDATE
        );
END;
/