--Seccion de entidades

create table Clientes(
    id_cliente int IDENTITY(1,1),
    nombre varchar(100),
    apellido_paterno varchar(100),
    apellido_materno varchar(100),
    cedula varchar(18),
    telefono varchar(15),
    correo varchar(100)
)

SELECT * from Clientes;

create table Usuarios(
    id_usuario int IDENTITY(1,1),
    id_cliente int not null,
    correo varchar(100) not null,
    contraseña varchar(100) not null
)

SELECT * from Usuarios;

ALTER TABLE Usuarios
add correo varchar(100);

Alter table Usuarios
drop column correo;


create table Empleados(
    id_empleado int IDENTITY(1,1),
    nombre varchar(100),
    apellido_paterno varchar(100),
    apellido_materno varchar(100),
    cedula varchar(18),
    direccion varchar(100),
    telefono varchar(15),
    sueldo money,
    ocupacion varchar(100),
    cuenta_bancaria varchar(50),
    banco varchar(50), --cuenta bancaria
    correo varchar(100)
)

create table Proveedores(
    id_proveedor int IDENTITY(1,1),
    nombre varchar(100),
    ubicacion varchar(100),
    cuenta_bancaria varchar(50),
    banco varchar(50), --cuenta bancaria
    rnc varchar(50),
    tipo_proveedor varchar(100), --materiales, servicios, piezas
    clasificacion varchar(50), --local o internacional
    estado varchar(50), --activo o inactivo
    correo varchar(100)
)

--Seccion de trabajo

create table Vehiculos(
    id_vehiculo int IDENTITY(1,1),
    id_cliente int, --llave foranea
    marca varchar(100),
    modelo varchar(100),
    color varchar(100),
    kilometraje int,
    placa varchar(100),
    numero_serie varchar(100),
    fecha_registro datetime
)

--Seccion de registros

create table OrdenesDeServicio(
    id_orden_servicio int IDENTITY(1,1),
    id_vehiculo int, --llave foranea
    id_cliente int,
    fecha_ingreso datetime,
    fecha_salida datetime
)

ALTER Table OrdenesDeServicio
ADD
Marca varchar(100),
Modelo varchar(100),
Color varchar(20),
Kilometraje varchar(50),
Placas varchar(50),
[Numero de Serie] varchar(100),
Ingreso_grua varchar(10),
--Lo que estoy pensando es que el nombre y el Email
--lo tome del mismo cliente que tiene la sesion iniciada
Telefono varchar(15),
Trabajo_realizar varchar(MAX),
Observaciones varchar(MAX),
Inventario_gato varchar(10),
Inventario_herramientas varchar(10),
Inventario_triangulos varchar(10),
Inventario_tapetes varchar(10),
inventario_llanta_refaccion varchar(10),
Inventario_extintor varchar(10),
Inventario_antena varchar(10),
Inventario_emblemas varchar(10),
Inventario_tapetes_rueda varchar(10),
Inventario_cables varchar(10),
Inventario_estereo varchar(10),
Inventario_encendedor varchar(10)
go

--Linea divisora------------------------------

create table HojasDeParte(
    id_hoja_de_parte int IDENTITY(1,1),
    id_servicio int, --llave foranea
    id_mecanico int, --llave foranea
    fecha_inicio datetime, --fecha y hora en el momento
    ultima_modificacion datetime,
    concepto varchar(1000),
    costo_por_hora money,
    horas_trabajadas int,
    precio_horas_total money,
    repuestos_utilizados varchar,
    --la idea de repuestos utilizados:
    --5 digitos para el id del repuesto
    --que se utilizará y otros 5 digitos
    --para la cantidad que se va a usar
    precio_piezas_total money,
    precio_final_total money
)

create table RepuestosStock(
    id_repuesto_stock int IDENTITY(1,1),
    id_proveedor int, --llave foranea
    nombre varchar(100),
    descripcion varchar(500),
    precio_unitario money,
    cantidad_stock int,
    inversion_total as precio_unitario * cantidad_stock,
    impuesto_parcial money
)

/*alter table RepuestosStock
add id_provedor int;
alter table RepuestosStock
add constraint FK_RepuestosStock_id_proveedor
foreign key (id_proveedor) references Proveedores(id_proveedor)*/



--Seccion de procesos

create table RepuestosCompra(
    id_repuesto_compra int IDENTITY(1,1),
    id_proveedor int, --llave foranea
    nombre varchar(100),
    descripcion varchar(500),
    precio_unitario money,
    cantidad_piezas int,
    costo_total as precio_unitario * cantidad_piezas,
    impuesto_parcial money
)

/*alter table RepuestosCompra
add id_proveedor int;
alter table RepuestosCompra
add constraint FK_RepuestosCompra_id_proveedor
foreign key (id_proveedor) references Proveedores(id_proveedor)*/



create table RepuestosVenta(
    id_repuesto_venta int IDENTITY(1,1),
    id_repuesto_stock int,
    nombre varchar(100),
    descripcion varchar(500),
    precio_unitario money,
    cantidad_piezas int,
    venta_total as precio_unitario * cantidad_piezas,
    impuesto_parcial money,
)
GO

create table SolicitudesDeFactura(
    id_solicitud_factura int IDENTITY(1,1),
    id_hoja_de_parte int, --llave foranea
    fecha datetime, --fecha y hora en el momento

) --solicitado por el mecanico

create table Facturas(
    id_factura int IDENTITY(1,1),
    id_solicitud_factura int, --llave foranea
    id_cliente int, --llave foranea
    id_vehiculo int, --llave foranea
    id_mecanico int, --llave foranea
    id_vendedor int, --llave foranea
    fecha datetime,
    estado varchar(50),
    costo_por_hora money
    --en una factura van las horas trabajadas
    --tambien va el costo total cosporhora x htrabajadas
)

CREATE TABLE Contacto (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100),
    correo NVARCHAR(100),
    mensaje NVARCHAR(MAX)
);