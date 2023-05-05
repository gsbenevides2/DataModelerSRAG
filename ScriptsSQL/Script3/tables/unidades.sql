CREATE TRIGGER tg_h_uni
AFTER UPDATE OR DELETE
ON unidades
FOR EACH ROW
BEGIN
    INSERT INTO h_unidades VALUES
        (
            :OLD.uni_id,
            :OLD.uni_cod_cnes,
            :OLD.uni_nome,
            :OLD.uni_mun_id,
            SYSDATE
        );
END;
/