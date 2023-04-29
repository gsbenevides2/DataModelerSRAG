CREATE TRIGGER tg_h_rta
AFTER UPDATE OR DELETE
ON resultados_teste_antigeno
FOR EACH ROW
BEGIN
    INSERT INTO h_resultados_teste_antigeno VALUES
        (
            :OLD.rta_id,
            :OLD.rta_descricao,
            SYSDATE
        );
END;