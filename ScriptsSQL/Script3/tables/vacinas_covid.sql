CREATE TRIGGER tg_h_vac
AFTER UPDATE OR DELETE
ON vacinas_covid
FOR EACH ROW
BEGIN
    INSERT INTO h_vacinas_covid VALUES
        (
            :OLD.vac_cas_id,
            :OLD.vac_dos_id,
            :OLD.vac_fab_id,
            :OLD.vac_lote,
            :OLD.vac_data_aplicacao,
            SYSDATE
        );
END;