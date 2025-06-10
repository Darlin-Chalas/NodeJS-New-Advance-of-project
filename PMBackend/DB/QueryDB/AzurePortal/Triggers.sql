CREATE TRIGGER trg_AfterInsertUsuario
ON Usuarios
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE u
    SET u.correo = c.correo
    FROM Usuarios u
    INNER JOIN INSERTED i ON u.id_usuario = i.id_usuario
    INNER JOIN Clientes c ON i.id_cliente = c.id_cliente;
END