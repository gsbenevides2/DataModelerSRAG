CREATE TRIGGER tg_h_cam
AFTER UPDATE OR DELETE
ON casos_amostras
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_amostras VALUES
        (
            :OLD.cam_cas_id,
            :OLD.cam_tam_id,
            :OLD.cam_data,
            SYSDATE
        );
END;