--Restricciones de la tabla para Clientes

alter table Clientes
add constraint PK_Clientes_id_cliente
primary key (id_cliente),
constraint CK_Clientes_not_null
check (nombre is not null),
check (apellido_paterno is not null),
check (apellido_materno is not null),
check (cedula is not null),
check (telefono is not null),
check (correo is not null),
constraint DF_Clientes_defaults
default 'desconocido' for nombre,
default 'desconocido' for apellido_paterno,
default 'desconocido' for apellido_materno,
default 'desconocido' for telefono,
default 'desconocido' for correo,
constraint UQ_Clientes_cedula
unique (cedula);

--Restricciones de la tabla para Usuarios

alter table Usuarios
add constraint PK_Usuarios_id_usuario
primary key (id_usuario),
constraint FK_Usuarios_id_cliente
foreign key (id_cliente) references Clientes(id_cliente);

--Restricciones de la tabla para Empleados

alter table Empleados
add constraint PK_Empleados_id_empleado
primary key (id_empleado),
constraint CK_Empleados_not_null
check (nombre is not null),
check (apellido_paterno is not null),
check (apellido_materno is not null),
check (cedula is not null),
check (direccion is not null),
check (telefono is not null),
check (sueldo is not null),
check (ocupacion is not null),
check (cuenta_bancaria is not null),
check (banco is not null),
check (correo is not null);


--Restricciones de la tabla para Proveedores

alter table Proveedores
add constraint PK_Proveedores_id_proveedor
primary key (id_proveedor),
constraint CK_Proveedores_not_null
check (nombre is not null),
check (ubicacion is not null),
check (cuenta_bancaria is not null),
check (banco is not null),
check (rnc is not null),
check (tipo_proveedor is not null),
check (clasificacion is not null),
check (estado is not null),
check (correo is not null),
constraint UQ_Proveedores_cuenta_bancaria
unique (cuenta_bancaria),
constraint DF_Proveedores_rnc
default 'inexistente' for rnc;

--Restricciones de la tabla para Vehiculos

alter table Vehiculos
add constraint PK_Vehiculo_id_vehiculo
primary key (id_vehiculo),
constraint FK_Vehiculos_id_cliente
foreign key (id_cliente) references Clientes(id_cliente),
constraint CK_Vehiculos_not_null
check (id_cliente is not null),
check (marca is not null),
check (modelo is not null),
check (color is not null),
check (kilometraje is not null),
check (placa is not null),
check (numero_serie is not null),
check (fecha_registro is not null),
constraint DF_Vehiculos_defaults
default 'desconocida' for marca,
default 'desconocido' for modelo,
default 'desconocido' for color,
default 'desconocido' for kilometraje,
default 'desconocido' for placa,
default 'desconocido' for numero_serie,
default getdate() for fecha_registro,
constraint UQ_Vehiculos_placa
unique (placa);

--Restriccoines de la tabla para Ordenes de servicio

alter table OrdenesDeServicio
add constraint PK_OrdenesDeServicio_id_orden_de_servicio
primary key (id_orden_servicio),
constraint FK_OrdenesDeServicio_id_vehiculo
foreign key (id_vehiculo) references Vehiculos(id_vehiculo),
constraint FK_OrdenesDeServicio_id_cliente
foreign key (id_cliente) references Clientes(id_cliente),
constraint CK_OrdenesDeServicio_not_null
check (id_vehiculo is not null);
--constraint DF_OrdenesDeServicio_defaults
--default getdate() for fecha;
go
--Restricciones de la tabla de Hojas de parte

alter table HojasDeParte
add constraint PK_HojasDeParte_id_hoja_de_parte
primary key (id_hoja_de_parte),
constraint FK_HojasDeParte_llaves_foraneas
foreign key (id_servicio) references OrdenesDeServicio(id_orden_servicio),
foreign key (id_mecanico) references Empleados(id_empleado),
constraint CK_HojasDeParte_not_null
check (id_servicio is not null),
check (id_mecanico is not null),
check (ultima_modificacion is not null),
check (concepto is not null),
check (precio_piezas_total is not null),
check (costo_por_hora is not null),
check (horas_trabajadas is not null),
constraint DF_HojasDeParte_defaults
default getdate() for fecha_inicio,
default getdate() for ultima_modificacion;


-----Modificaciones en las relaciones de las tablas de repuestos-----

--Restricciones de la tabla de las Compras de repuestos

alter table RepuestosCompra
add constraint PK_RepuestosCompra_id_repuesto_compra
primary key (id_repuesto_compra),
constraint FK_RepuestosCompra_llaves_foraneas
foreign key (id_proveedor) references Proveedores(id_proveedor),
constraint CK_RepuestosCompra_not_null
check (nombre is not null),
check (descripcion is not null),
check (precio_unitario is not null),
check (impuesto_parcial is not null),
constraint DF_RepuestosCompra_defaults
default 'desconocido' for nombre,
default 'desconocido' for descripcion,
default 0 for cantidad_piezas,
default 0 for precio_unitario,
default 0 for impuesto_parcial;

--Restricciones de la tabla del almacen de Repuestos

alter table RepuestosStock
add constraint PK_RepuestosStock_id_repuesto_stock
primary key (id_repuesto_stock),
constraint FK_RepuestosStock_llaves_foraneas
foreign key (id_proveedor) references Proveedores(id_proveedor),
constraint CK_RepuestosStock_not_null
check (nombre is not null),
check (descripcion is not null),
check (precio_unitario is not null),
check (impuesto_parcial is not null),
constraint DF_RepuestosStock_defaults
default 'desconocido' for nombre,
default 'desconocido' for descripcion,
default 0 for cantidad_stock,
default 0 for precio_unitario,
default 0 for impuesto_parcial;

--hay que quitar la llave foranea

--Restricciones de la tabla de las Ventas de repuestos

alter table RepuestosVenta
add constraint PK_RepuestosVenta_id_repuesto_venta
primary key (id_repuesto_venta),
constraint FK_RepuestosVenta_id_repuestos_stock
foreign key (id_repuesto_stock) references RepuestosStock(id_repuesto_stock),
constraint CK_RepuestosVenta_not_null
check (nombre is not null),
check (descripcion is not null),
check (precio_unitario is not null),
check (impuesto_parcial is not null),
constraint DF_RepuestosVenta_defaults
default 'desconocido' for nombre,
default 'desconocido' for descripcion,
default 0 for cantidad_piezas,
default 0 for precio_unitario,
default 0 for impuesto_parcial;

--Restricciones de la tabla para las Solicitudes de facturas

alter table SolicitudesDeFactura
add constraint PK_SolicitudesDeFactura_id_solicitud_de_factura
primary key (id_solicitud_factura),
constraint FK_SolicitudesDeFactura_id_hoja_de_parte
foreign key (id_hoja_de_parte) references HojasDeParte(id_hoja_de_parte),
constraint CK_SolicitudesDeFactura_not_null
check (id_hoja_de_parte is not null);

--Restricciones de la tabla para Facturas

alter table Facturas
add constraint PK_Facturas_id_factura
primary key (id_factura),
constraint FK_Facturas_llaves_foraneas
foreign key (id_solicitud_factura) references SolicitudesDeFactura(id_solicitud_factura),
foreign key (id_cliente) references Clientes(id_cliente),
foreign key (id_vehiculo) references Vehiculos(id_vehiculo),
foreign key (id_mecanico) references Empleados(id_empleado),
foreign key (id_vendedor) references Empleados(id_empleado),
constraint CK_Facturas_not_null
check (id_solicitud_factura is not null),
check (id_cliente is not null),
check (id_vehiculo is not null),
check (id_mecanico is not null),
check (id_vendedor is not null),
check (estado is not null),
check (costo_por_hora is not null),
constraint DF_Facturas_defaults
default getdate() for fecha,
default 'desconocido' for estado;

--Restricciones de la tabla para Usuarios

alter table Usuarios
--add constraint PK_Usuarios_id_usuario
--primary key (id_usuario),
add constraint UQ_Usuarios_correo
unique (correo)
go