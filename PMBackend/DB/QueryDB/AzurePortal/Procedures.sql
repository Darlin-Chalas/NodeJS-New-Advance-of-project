create procedure Clientes_insert
    @nombre varchar(100),
    @apellido_paterno varchar(100),
    @apellido_materno varchar(100),
    @cedula varchar(18),
    @telefono varchar(15),
    @correo varchar(100)
as
begin
    insert into Clientes values(
        @nombre,
        @apellido_paterno,
        @apellido_materno,
        @cedula,
        @telefono,
        @correo
    )
end

exec Clientes_insert 
    @nombre = 'Miguel', 
    @apellido_paterno = 'Alcantara',
    @apellido_materno = 'Smith',
    @cedula = '12938018302',
    @telefono = '8093048012',
    @correo = 'unapersona@gmail.com';
go

create procedure Clientes_select
@id INT
as
begin
    select * from Clientes where id_cliente = @id
end

exec Clientes_select @id = 1;
go

create procedure Clientes_update
    @nombre varchar(100),
    @apellido_paterno varchar(100),
    @apellido_materno varchar(100),
    @cedula varchar(18),
    @telefono varchar(15),
    @correo varchar(100),
    @id int
as
begin
    update Clientes set
    nombre = @nombre,
    apellido_paterno =  @apellido_paterno,
    apellido_materno = @apellido_materno,
    cedula = @cedula,
    telefono = @telefono,
    correo = @correo
    where id_cliente = @id
end

exec Clientes_update
    @nombre = 'Angel',
    @apellido_paterno = 'Abreu',
    @apellido_materno = 'Rosario',
    @cedula = '22300124111',
    @telefono = '8096770818',
    @correo = 'angus3833@gmail.com',
    @id = 1;
go

create procedure Clientes_delete
@id int
as
begin 
    delete from Clientes where id_cliente = @id
end

exec Clientes_delete @id = 1;
go


exec Clientes_insert 
    @nombre = 'Miguel', 
    @apellido_paterno = 'Alcantara',
    @apellido_materno = 'Smith',
    @cedula = '12938018302',
    @telefono = '8093048012',
    @correo = 'unapersona@gmail.com';
go

-------Procedimientos de la tabla Usuarios-------

create procedure Usuarios_insert
    @id_cliente INT,
    @correo VARCHAR(100),
    @contraseña VARCHAR(100),
    @nombre VARCHAR(20)
as
begin
    insert into Usuarios values(
        @id_cliente,
        @correo,
        @contraseña,
        @nombre
    )
end
go

EXECUTE Usuarios_insert
    @id_cliente = 1,
    @correo = "angus3833@gmail.com",
    @contraseña = 1234,
    @nombre = "Angel";
go

EXECUTE Usuarios_insert
    @id_cliente = 2,
    @correo = "charlin123@gmail,com",
    @contraseña = 2468,
    @nombre = "Darlin"
go
-------Procedimientos de la tabla Empleados-------

create procedure Empleados_insert
    @nombre varchar(100),
    @apellido_paterno varchar(100),
    @apellido_materno varchar(100),
    @cedula varchar(18),
    @direccion varchar(100),
    @telefono varchar(15),
    @sueldo_por_hora money,
    @ocupacion varchar(100),
    @cuenta_bancaria varchar(50),
    @banco varchar(50), --cuenta bancaria
    @correo varchar(100)
as
begin
    insert into Empleados values(
        @nombre,
        @apellido_paterno,
        @apellido_materno,
        @cedula,
        @direccion,
        @telefono,
        @sueldo_por_hora,
        @ocupacion,
        @cuenta_bancaria,
        @banco,
        @correo
    )
end

exec Empleados_insert
    @nombre = 'Antonio',
    @apellido_paterno = 'De la rosa',
    @apellido_materno = 'Aguinaldo',
    @cedula = '12312312312',
    @direccion = 'una calle que no se cual es',
    @telefono = '8099384412',
    @sueldo_por_hora = 20,
    @ocupacion = 'Mecanico',
    @cuenta_bancaria = '000000000000',
    @banco = 'Banco Adopen',
    @correo = 'uncorreo@gmail.com';
go

create procedure Empleados_select
    @id INT
as
begin
    select * from Empleados where id_empleado = @id;
end

exec Empleados_select @id = 1;
go

create procedure Empleados_update
    @nombre varchar(100),
    @apellido_paterno varchar(100),
    @apellido_materno varchar(100),
    @cedula varchar(18),
    @direccion varchar(100),
    @telefono varchar(15),
    @sueldo money,
    @ocupacion varchar(100),
    @cuenta_bancaria varchar(50),
    @banco varchar(50), --cuenta bancaria
    @correo varchar(100),
    @id int
as
begin 
    update Empleados set
    nombre = @nombre,
    apellido_paterno = @apellido_paterno,
    apellido_materno = @apellido_materno,
    cedula = @cedula,
    direccion = @direccion,
    telefono = @telefono,
    sueldo = @sueldo,
    ocupacion = @ocupacion,
    cuenta_bancaria = @cuenta_bancaria,
    correo = @correo
    where id_empleado = @id
end

--aqui va la ejecucion
go

create procedure Empleados_delete
    @id int
as
begin
    delete from Empleados where id_empleado = @id
end

--aqui va la ejecucion

EXECUTE Empleados_delete @id = 1;

-------Procedimientos de la tabla Proveedores-------
go

create procedure Proveedores_insert
    @nombre varchar(100),    
    @ubicacion varchar(100),
    @cuenta_bancaria varchar(50),
    @banco varchar(50), --cuenta bancaria
    @rnc varchar(50),
    @tipo_de_proveedor varchar(100), --materiales, servicios, piezas
    @clasificacion varchar(50), --local o internacional
    @estado varchar(50), --activo o inactivo
    @correo varchar(100)
as
begin 
    insert into Proveedores values(
        @nombre,
        @ubicacion,
        @cuenta_bancaria,
        @banco,
        @rnc,
        @tipo_de_proveedor,
        @clasificacion,
        @estado,
        @correo
    )
end

--aqui va la ejecucion
go 

create procedure Proveedores_select
    @id int
as
begin 
    select * from Proveedores where id_proveedor = @id
end

--aqui va la ejecucion
go

create procedure Proveedores_update
    @nombre varchar(100),
    @ubicacion varchar(100),
    @cuenta_bancaria varchar(50),
    @banco varchar(50), --cuenta bancaria
    @rnc varchar(50),
    @tipo_proveedor varchar(100), --materiales, servicios, piezas
    @clasificacion varchar(50), --local o internacional
    @estado varchar(50), --activo o inactivo
    @correo varchar(100),
    @id int
as
begin 
    update Proveedores set
    nombre = @nombre,
    ubicacion = @ubicacion,
    banco = @banco,
    rnc = @rnc,
    tipo_proveedor = @tipo_proveedor,
    clasificacion = @clasificacion,
    estado = @estado,
    correo = @correo
    where id_proveedor = @id
end

--aqui va la ejecucion
go

create procedure Proveedores_delete
    @id INT
as 
begin 
    delete from Proveedores where id_proveedor = @id
end

--aqui va la ejecucion
go

-------Procedimientos de la tabla Vehiculos-------

create procedure Vehiculos_insert
    @id_cliente int, --llave foranea
    @marca varchar(100),
    @modelo varchar(100),
    @color varchar(100),
    @kilometraje int,
    @placa varchar(100),
    @numero_de_serie varchar(100),
    @fecha_entrada datetime
as 
begin 
    insert into Vehiculos values(
        @id_cliente,
        @marca,
        @modelo,
        @color,
        @kilometraje,
        @placa,
        @numero_de_serie,
        @fecha_entrada
    )
end

--aqui va la ejecucion
go

create procedure Vehiculos_select
    @id int
as 
begin 
    select * from Vehiculos where id_vehiculo = @id;
end

--aqui va la ejecucion
go

create procedure Vehiculos_update
    @id_cliente int, --llave foranea
    @marca varchar(100),
    @modelo varchar(100),
    @color varchar(100),
    @kilometraje int,
    @placa varchar(100),
    @numero_serie varchar(100),
    @fecha_registro datetime,
    @id int 
as 
begin 
    update Vehiculos set
    id_cliente = @id_cliente,
    marca = @marca,
    modelo = @modelo,
    color = @color,
    kilometraje = @kilometraje,
    placa = @placa,
    numero_serie = @numero_serie,
    fecha_registro = @fecha_registro
    where id_vehiculo = @id
end

--aqui va la ejecucion
go

create procedure Vehiculos_delete
    @id int
as 
begin 
    delete from Vehiculos where id_vehiculo = @id
end

--aqui va la ejecucion
go

-------Procedimientos para la tabla de ordenes de servicio-------

create procedure OrdenesDeServicio_insert
    @id_vehiculo int, --llave foranea
    @id_cliente int,
    @fecha_ingreso datetime,
    @fecha_salida datetime
as
begin
    insert into OrdenesDeServicio values(
        @id_vehiculo, --llave foranea
        @id_cliente,
        @fecha_ingreso,
        @fecha_salida
    )
end

--aqui va la ejecucion
go

create procedure OrdenesDeServicio_select
    @id int
as
begin
    select * from OrdenesDeServicio where id_orden_servicio = @id
end

--aqui va la ejecucion
go

create procedure OrdenesDeServicio_update
    @id_vehiculo int, --llave foranea
    @fecha datetime,
    @fechaS datetime,
    @id int
as
begin 
    update OrdenesDeServicio set
    id_vehiculo = @id_vehiculo,
    fecha_ingreso = @fecha,
    fecha_salida = @fechaS
    where id_orden_servicio = @id
end


--aqui va la ejecicion
go

create procedure OrdenesDeServicio_delete
    @id int
as
begin
    delete from OrdenesDeServicio where id_orden_servicio = @id
end

--aqui va la ejecucion
go

-------Procedimientos de la tabla HojasDeParte-------

create procedure HojasDeParte_insert
    @id_servicio int, --llave foranea
    @id_mecanico int, --llave foranea
    @fecha_inicio datetime, --fecha y hora en el momento
    @ultima_modificacion datetime,
    @concepto varchar(500),
    @precio_piezas_total money,
    @costo_por_hora money,
    @horas_trabajadas int,
    @precio_horas_total money,
    @repuestos_utilizados varchar,
    @precio_final_total money
as
begin
    insert into HojasDeParte values(
        @id_servicio,
        @id_mecanico,
        @fecha_inicio,
        @ultima_modificacion,
        @concepto,
        @precio_piezas_total,
        @costo_por_hora,
        @horas_trabajadas,
        @precio_horas_total,
        @repuestos_utilizados,
        @precio_final_total
    )
end

--aqui va la ejecucion
go

create procedure HojasDeParte_select
    @id int
as
begin
    select * from HojasDeParte where id_hoja_de_parte = @id
end

--aqui va la ejecucion
go

create procedure HojasDeParte_alter
    @id_servicio int, --llave foranea
    @id_mecanico int, --llave foranea
    @fecha_inicio datetime, --fecha y hora en el momento
    @ultima_modificacion datetime,
    @concepto varchar(500),
    @precio_piezas_total money,
    @costo_por_hora money,
    @horas_trabajadas int,
    @id int
as
begin
    update HojasDeParte set
    id_servicio = @id_servicio,
    id_mecanico = @id_mecanico,
    fecha_inicio = @fecha_inicio,
    ultima_modificacion = @ultima_modificacion,
    concepto = @concepto,
    precio_piezas_total = @precio_piezas_total,
    costo_por_hora = @costo_por_hora,
    horas_trabajadas = @horas_trabajadas
    where id_hoja_de_parte = @id
end

--aqui va la ejecucion
go

create procedure HojasDeParte_delete
    @id int
as
begin
    delete from HojasDeParte where id_hoja_de_parte = @id
end

--aqui va la ejecucion
go

-------Procedimientos de la tabla RepuestosStock-------

create procedure RepuestosStock_insert
    @id_proveedor int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_stock int,
    @impuesto_parcial money
as
begin
    insert into RepuestosStock values(
        @id_proveedor,
        @nombre,
        @descripcion,
        @precio_unitario,
        @cantidad_stock,
        @impuesto_parcial
    )
end 

--aqui va la ejecucion
go

create procedure RepuestosStock_select
    @id int
as
begin
    select * from RepuestosStock where id_repuesto_stock = @id
end

--aqui va la ejecucion 
go

create procedure RepuestosStock_update
    @id_proveedor int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_stock int,
    @impuesto_parcial money,
    @id int
as
begin
    update RepuestosStock set
    id_proveedor = @id_proveedor,
    nombre = @nombre,
    descripcion = @descripcion,
    precio_unitario = @precio_unitario,
    cantidad_stock = @cantidad_stock
    where id_repuesto_stock = @id
end

--aqui va la ejecucion
go

create procedure RepuestosStock_delete
    @id int
as
begin
    delete from RepuestosStock where id_repuesto_stock = @id
end

--aqui va la ejecucion
go

-------Procedimientos de la tabla RepuestosCompra-------

create procedure RepuestosCompra_insert
    @id_proveedor int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_piezas int,
    @impuesto_parcial money
as
begin
    insert into RepuestosCompra values(
        @id_proveedor,
        @nombre,
        @descripcion,
        @precio_unitario,
        @cantidad_piezas,
        @impuesto_parcial
    )
end

--aqui va la ejecucion
go

create procedure RepuestosCompra_select
    @id int
as
begin
    select * from RepuestosCompra where id_repuesto_compra = @id
end

--aqui va la ejecucion
go

create procedure RepuestosCompra_update
    @id_proveedor int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_piezas int,
    @impuesto_parcial money,
    @id int
as
begin
    update RepuestosCompra set
    id_proveedor = @id_proveedor,
    nombre = @nombre,
    descripcion = @descripcion,
    precio_unitario = @precio_unitario,
    cantidad_piezas = @cantidad_piezas,
    impuesto_parcial = @impuesto_parcial
    where id_repuesto_compra = @id
end

--aqui va la ejecucion
go

create procedure RepuestosCompra_delete
    @id int
as
begin
    delete from RepuestosCompra where id_repuesto_compra = @id
end

--aqui va la ejecucion
go

-------Procedimiento de la tabla RepuestosVenta-------

create procedure RepuestosVenta_insert
    @id_repuestos_stock int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_piezas int,
    @impuesto_parcial money
as 
begin
    insert into RepuestosVenta values(
        @id_repuestos_stock,
        @nombre,
        @descripcion,
        @precio_unitario,
        @cantidad_piezas,
        @impuesto_parcial
    )
end

--aqui va la ejecucion
go

create procedure RepuestosVenta_select
    @id int
as
begin
    select * from RepuestosVenta where id_repuesto_venta = @id
end

--aqui va la ejecucion
go

create procedure RepuestosVenta_update
    @id_repuestos_stock int, --llave foranea
    @nombre varchar(100),
    @descripcion varchar(500),
    @precio_unitario money,
    @cantidad_piezas int,
    @impuesto_parcial money,
    @id int
as
begin
    update RepuestosVenta set
    id_repuesto_stock = @id_repuestos_stock,
    nombre = @nombre,
    descripcion = @descripcion,
    precio_unitario = @precio_unitario,
    cantidad_piezas = @cantidad_piezas,
    impuesto_parcial = @impuesto_parcial
    where id_repuesto_venta = @id
end

--aqui va la ejecucion
go

create procedure RepuestosVenta_delete
    @id int
as
begin
    delete from RepuestosVenta where id_repuesto_venta = @id
end

--aqui va la ejecucion
go

-------Procedimientos para la tabla SolicitudesDeFactura-------

create procedure SolicitudesDeFactura_insert
    @id_hoja_de_parte int,
    @fecha datetime --fecha y hora en el momento
as
begin
    insert into SolicitudesDeFactura values(
        @id_hoja_de_parte,
        @fecha
    )
end

--aqui va la ejecucion
go

create procedure SolicitudesDeFactura_select
    @id int
as
begin
    select * from SolicitudesDeFactura where id_solicitud_factura = @id
end

--aqui va la ejecucion
go

create procedure SolicitudesDeFactura_update
    @id_hoja_de_parte int, --llave foranea
    @fecha datetime, --fecha y hora en el momento
    @id int
as
begin
    update SolicitudesDeFactura set
    id_hoja_de_parte = @id_hoja_de_parte,
    fecha = @fecha
    where id_solicitud_factura = @id
end

--aqui va la ejecucion
go

create procedure SolicitudesDeFactura_delete
    @id int
as
begin
    delete from SolicitudesDeFactura where id_solicitud_factura = @id
end

--aqui va la ejecucion
go

-------Procedimientos de la tabla de Facturas-------

create procedure Facturas_insert
    @id_solicitud_factura int,
    @id_cliente int, --llave foranea
    @id_vehiculo int, --llave foranea
    @id_mecanico int, --llave foranea
    @id_vendedor int, --llave foranea
    @fecha datetime,
    @estado varchar(50),
    @costo_por_hora money
as
begin
    insert into Facturas values(
        @id_solicitud_factura,
        @id_cliente,
        @id_vehiculo,
        @id_mecanico,
        @id_vendedor,
        @fecha,
        @estado,
        @costo_por_hora
    )
end

--aqui va la ejecucion
go

create procedure Facturas_select
    @id int
as
begin
    select * from Facturas where id_factura = @id
end

--aqui va la ejecucion
go

create procedure Facturas_update
    @id_solicitud_factura int, --llave foranea
    @id_cliente int, --llave foranea
    @id_vehiculo int, --llave foranea
    @id_mecanico int, --llave foranea
    @id_vendedor int, --llave foranea
    @fecha datetime,
    @estado varchar(50),
    @costo_por_hora money,
    @horas_trabajadas int,
    @id int
as
begin
    update Facturas set
    id_solicitud_factura = @id_solicitud_factura,
    id_cliente = @id_cliente,
    id_vehiculo = @id_vehiculo,
    id_mecanico = @id_mecanico,
    id_vendedor = @id_vendedor,
    fecha = @fecha,
    estado = @estado,
    costo_por_hora = @costo_por_hora
    where id_factura = @id
end

--aqui va la ejecucion
go

create procedure Facturas_detete
    @id int
as
begin
    delete from Facturas where id_factura = @id
end

--aqui va la ejecucion
go

--cualquier modificacionS