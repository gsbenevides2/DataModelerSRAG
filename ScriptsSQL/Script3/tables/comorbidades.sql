CREATE TRIGGER tg_h_com
AFTER UPDATE OR DELETE
ON comorbidades
FOR EACH ROW
BEGIN
    INSERT INTO h_comorbidades VALUES
        (
            :OLD.com_id,
            :OLD.com_nome,
            SYSDATE
        );
END;