CREATE TRIGGER tg_h_dos
AFTER UPDATE OR DELETE
ON doses
FOR EACH ROW
BEGIN
    INSERT INTO h_doses VALUES
        (
            :OLD.dos_id,
            :OLD.dos_des,
            SYSDATE
        );
END;