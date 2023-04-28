CREATE TRIGGER tg_h_evo
AFTER UPDATE OR DELETE
ON evolucoes
FOR EACH ROW
BEGIN
    INSERT INTO h_evolucoes VALUES
        (
            :OLD.evo_id,
            :OLD.evo_desc,
            SYSDATE
        );
END;