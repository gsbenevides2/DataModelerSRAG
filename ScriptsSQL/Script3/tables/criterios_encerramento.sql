CREATE TRIGGER tg_h_cri
AFTER UPDATE OR DELETE
ON criterios_encerramento
FOR EACH ROW
BEGIN
    INSERT INTO h_criterios_encerramento VALUES
        (
            :OLD.cri_id,
            :OLD.cri_desc,
            SYSDATE
        );
END;
/