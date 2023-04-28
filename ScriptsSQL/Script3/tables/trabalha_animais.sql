CREATE TRIGGER tg_h_trabalha_animais
AFTER UPDATE OR DELETE
ON trabalha_animais
FOR EACH ROW
BEGIN
    INSERT INTO h_trabalha_animais VALUES
        (
            :OLD.tan_id,
            :OLD.tan_descricao,
            SYSDATE
        );
END;