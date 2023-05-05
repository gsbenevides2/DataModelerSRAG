CREATE TRIGGER tg_h_est
AFTER UPDATE OR DELETE
ON estados
FOR EACH ROW
BEGIN
    INSERT INTO h_estados VALUES
        (
            :OLD.est_id,
            :OLD.est_nome,
            SYSDATE
        );
END;
/