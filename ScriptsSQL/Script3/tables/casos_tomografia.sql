CREATE TRIGGER tg_h_cto
AFTER UPDATE OR DELETE
ON casos_tomografia
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_tomografia VALUES
        (
            :OLD.cto_cas_id,
            :OLD.cto_ast_id,
            :OLD.cto_date,
            SYSDATE
        );
END;
/