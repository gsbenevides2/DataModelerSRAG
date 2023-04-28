CREATE TRIGGER tg_h_virus_respiratorios
AFTER UPDATE OR DELETE
ON virus_respiratorios
FOR EACH ROW
BEGIN
    INSERT INTO h_virus_respiratorios VALUES
        (
            :OLD.vir_id,
            :OLD.vir_des,
            SYSDATE
        );
END;