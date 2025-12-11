# 🏪 Estilo Vivo - Sistema ERP

Sistema ERP completo y profesional para la gestión de "Estilo Vivo", una tienda de decoración en Las Condes, Chile.

## 🚀 Características

- ✅ Sistema de autenticación con 3 usuarios predefinidos
- ✅ Dashboard con métricas y alertas en tiempo real
- ✅ Gestión completa de productos (CRUD)
- ✅ Registro de ventas (CRUD)
- ✅ Gestión de proveedores (CRUD)
- ✅ Visualización de facturas (solo lectura)
- ✅ Diseño moderno y responsive con Tailwind CSS
- ✅ Interfaz intuitiva con iconos Lucide React

## 📋 Requisitos Previos

- Node.js 16+ instalado
- npm o yarn

## 🔧 Instalación

1. Instala las dependencias:
```bash
npm install
```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## 👤 Usuarios de Prueba

El sistema incluye 3 usuarios predefinidos:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin123` | Administrador |
| `contador` | `cont123` | Contador |
| `vendedor` | `vend123` | Vendedor |

## 📦 Módulos del Sistema

### 1. Dashboard
- Métricas principales (Productos, Ventas, Proveedores, Facturas)
- Alertas importantes (Facturas vencidas, Stock bajo, Vencimientos IVA)
- Resumen financiero (Ventas del mes, Cuentas por pagar, Balance estimado)

### 2. Gestión de Productos
- Listado completo de productos
- Crear, editar y eliminar productos
- Indicador visual de stock bajo (<10 unidades)
- Campos: Nombre, Categoría, Precio, Stock, Proveedor

### 3. Registro de Ventas
- Registro completo de ventas
- Crear, editar y eliminar ventas
- Estados visuales (Completada/Pendiente)
- Campos: Fecha, Cliente, Producto, Cantidad, Total, Estado

### 4. Gestión de Proveedores
- Listado de proveedores con información de contacto
- Crear, editar y eliminar proveedores
- Indicador de saldo pendiente (rojo si >0, verde si =0)
- Campos: Nombre, RUT, Contacto, Teléfono, Email, Saldo Pendiente

### 5. Gestión de Facturas
- Visualización de facturas (solo lectura)
- Estados: Pagada (verde), Pendiente (amarillo), Vencida (rojo)
- Información: N° Factura, Fecha, Cliente, Monto, Vencimiento, Estado

## 🎨 Tecnologías Utilizadas

- **React 18+** - Biblioteca de JavaScript para interfaces de usuario
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Biblioteca de iconos moderna
- **Vite** - Herramienta de construcción rápida
- **JavaScript ES6+** - Lenguaje de programación

## 📱 Diseño Responsive

El sistema está completamente optimizado para:
- 📱 Dispositivos móviles
- 📱 Tablets
- 💻 Escritorio

## 🔐 Seguridad

- Autenticación de usuarios
- Validación de formularios
- Confirmación antes de eliminar registros

## 📊 Datos de Ejemplo

El sistema incluye datos de ejemplo precargados:
- 5 productos iniciales
- 3 ventas de ejemplo
- 4 proveedores activos
- 4 facturas de muestra

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 📝 Notas

- Los datos se almacenan en el estado de React (no persisten al recargar)
- Para producción, se recomienda integrar con un backend y base de datos
- El sistema está diseñado para ser escalable y fácil de mantener

## 👨‍💻 Desarrollo

Este sistema fue desarrollado siguiendo las mejores prácticas de React:
- Componentes funcionales con Hooks
- Código limpio y comentado
- Estructura modular
- Reutilización de componentes

## 📄 Licencia

Este proyecto es de uso interno para Estilo Vivo.

---

**Desarrollado para Estilo Vivo - Las Condes, Chile** 🏪

