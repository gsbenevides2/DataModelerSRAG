CREATE TRIGGER tg_h_rtr
AFTER UPDATE OR DELETE
ON resultados_teste_rtpc
FOR EACH ROW
BEGIN
    INSERT INTO h_resultados_teste_rtpc VALUES
        (
            :OLD.rtr_id,
            :OLD.rtr_des,
            SYSDATE
        );
END;