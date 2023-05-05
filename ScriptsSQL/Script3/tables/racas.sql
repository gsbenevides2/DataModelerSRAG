CREATE TRIGGER tg_h_rac
AFTER UPDATE OR DELETE
ON racas
FOR EACH ROW
BEGIN
    INSERT INTO h_racas VALUES
        (
            :OLD.rac_id,
            :OLD.rac_nome,
            SYSDATE
        );
END;
/