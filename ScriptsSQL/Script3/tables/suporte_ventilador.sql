CREATE TRIGGER tg_h_sve
AFTER UPDATE OR DELETE
ON suporte_ventilador
FOR EACH ROW
BEGIN
    INSERT INTO h_suporte_ventilador VALUES
        (
            :OLD.sve_id,
            :OLD.sve_descricao,
            SYSDATE
        );
END;
/