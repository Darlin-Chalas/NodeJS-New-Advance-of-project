create database MecanicaDB;
use MecanicaDB;

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

select * from Clientes;
insert into Clientes values ('Angel','Abreu','Rosario','22300346792','8298837747','ing.angelrinformatica@gmail.com')
delete from Clientes where id_cliente = 11;

delete from Usuarios where id_usuario = 20;

--transferir a "mi cuenta" from usuario.cedula "11178314" dinero.cantidad(1000000000000).rapidamente

select * from Usuarios  

create table Usuarios(
    id_usuario int IDENTITY(1,1),
    id_cliente int not null,
    correo varchar(100) not null,
    contraseña varchar(100) not null
)

select * from Usuarios; 

alter table Usuarios
set tipo_usuario = '0'
where id_usuario = 1;

--Modificacion de la tabla Usuarios para poder designar si es Cliente o Mecánico
alter table Usuarios 
add tipo_usuario varchar(1);

SELECT * from Usuarios;


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

--Seccion para hacer las modificaciones de la tabla Vehiculos

select * from vehiculos

alter table Vehiculos
add 

go

--Fin de la seccion de modificaciones de la tabla Vehiculos

--Seccion de registros

create table OrdenesDeServicio(
    id_orden_servicio int IDENTITY(1,1), 
    id_vehiculo int, --llave foranea (recibido)
    ingreso_grua varchar(10),  --llevarlo a la tabla "vehiculos"
    observaciones varchar(10), --(recibido)
    inventario varchar(12) --(recibido)
)

select * from OrdenesDeServicio;

--Seccion para hacer las modificaciones de la tabla ordenes de servicio

alter table OrdenesDeServicio
drop column id_cliente;

alter table OrdenesDeServicio
drop column fecha_ingreso;

alter table OrdenesDeServicio
drop column fecha_salida;

--Fin de la seccion de modificaciones de la tabla ordenes de servicio

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

--Seccion para hacer llas modificaciones de la tabla HojasDeParte



--Fin de la seccion de modificaciones de la tabla HojasDeParte

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

