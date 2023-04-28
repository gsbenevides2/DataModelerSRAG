CREATE TRIGGER tg_h_esc
AFTER UPDATE OR DELETE
ON escolaridades
FOR EACH ROW
BEGIN
    INSERT INTO h_escolaridades VALUES
        (
            :OLD.esc_id,
            :OLD.esc_descricao,
            SYSDATE
        );
END;