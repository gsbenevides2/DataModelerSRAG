CREATE TRIGGER tg_h_mun
AFTER UPDATE OR DELETE
ON municipios
FOR EACH ROW
BEGIN
    INSERT INTO h_municipios VALUES
        (
            :OLD.mun_id,
            :OLD.mun_cod_ibge,
            :OLD.mun_nome,
            :OLD.mun_est_id,
            SYSDATE
        );
END;
/