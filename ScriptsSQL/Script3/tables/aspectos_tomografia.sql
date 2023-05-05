CREATE TRIGGER tg_h_ast
AFTER UPDATE OR DELETE
ON aspectos_tomografia
FOR EACH ROW
BEGIN
    INSERT INTO h_aspectos_tomografia VALUES
        (:OLD.ast_id, :OLD.ast_descricao, SYSDATE);
END;
/