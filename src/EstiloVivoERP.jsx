import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

// Usuarios predefinidos
const USUARIOS = {
  admin: { password: 'admin123', rol: 'Administrador', nombre: 'Administrador' },
  contador: { password: 'cont123', rol: 'Contador', nombre: 'Contador' },
  vendedor: { password: 'vend123', rol: 'Vendedor', nombre: 'Vendedor' }
};

// Datos iniciales
const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Lámpara Moderna', categoria: 'Iluminación', precio: 45000, stock: 15, proveedor: 'LuzTotal' },
  { id: 2, nombre: 'Sofá 3 Cuerpos', categoria: 'Muebles', precio: 350000, stock: 3, proveedor: 'Mueblería Chile' },
  { id: 3, nombre: 'Cortinas Blackout', categoria: 'Textiles', precio: 85000, stock: 8, proveedor: 'Textil Express' },
  { id: 4, nombre: 'Mesa Centro', categoria: 'Muebles', precio: 120000, stock: 12, proveedor: 'Mueblería Chile' },
  { id: 5, nombre: 'Cojines Decorativos', categoria: 'Decoración', precio: 25000, stock: 5, proveedor: 'Textil Express' }
];

const VENTAS_INICIALES = [
  { id: 1, fecha: '2024-01-15', cliente: 'María González', producto: 'Lámpara Moderna', cantidad: 2, total: 90000, estado: 'Completada' },
  { id: 2, fecha: '2024-01-18', cliente: 'Juan Pérez', producto: 'Sofá 3 Cuerpos', cantidad: 1, total: 350000, estado: 'Pendiente' },
  { id: 3, fecha: '2024-01-20', cliente: 'Ana Silva', producto: 'Cortinas Blackout', cantidad: 3, total: 255000, estado: 'Completada' }
];

const PROVEEDORES_INICIALES = [
  { id: 1, nombre: 'LuzTotal', rut: '76.123.456-7', contacto: 'Carlos Méndez', telefono: '+56 9 1234 5678', email: 'contacto@luztotal.cl', saldo: 0 },
  { id: 2, nombre: 'Mueblería Chile', rut: '77.234.567-8', contacto: 'Patricia Soto', telefono: '+56 9 2345 6789', email: 'ventas@muebleriachile.cl', saldo: 150000 },
  { id: 3, nombre: 'Textil Express', rut: '78.345.678-9', contacto: 'Roberto Díaz', telefono: '+56 9 3456 7890', email: 'info@textilexpress.cl', saldo: 0 },
  { id: 4, nombre: 'Maderera Sur', rut: '79.456.789-0', contacto: 'Laura Fernández', telefono: '+56 9 4567 8901', email: 'contacto@madererasur.cl', saldo: 85000 }
];

const FACTURAS_INICIALES = [
  { id: 1, numero: 'FAC-001', fecha: '2024-01-10', cliente: 'María González', monto: 90000, vencimiento: '2024-02-10', estado: 'Pagada' },
  { id: 2, numero: 'FAC-002', fecha: '2024-01-15', cliente: 'Juan Pérez', monto: 350000, vencimiento: '2024-02-15', estado: 'Pendiente' },
  { id: 3, numero: 'FAC-003', fecha: '2024-01-20', cliente: 'Ana Silva', monto: 255000, vencimiento: '2024-02-20', estado: 'Pendiente' },
  { id: 4, numero: 'FAC-004', fecha: '2024-01-05', cliente: 'Pedro Martínez', monto: 120000, vencimiento: '2024-01-30', estado: 'Vencida' }
];

// Función para formatear moneda chilena
const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(valor);
};

// Componente Login
const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usuario || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const userData = USUARIOS[usuario.toLowerCase()];
    if (userData && userData.password === password) {
      onLogin({ usuario, ...userData });
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-4">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Estilo Vivo</h1>
          <p className="text-gray-600">Sistema ERP - Las Condes, Chile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={mostrarPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-12"
                placeholder="Ingrese su contraseña"
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {mostrarPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Usuarios de prueba: admin/admin123, contador/cont123, vendedor/vend123
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Componente Principal
const EstiloVivoERP = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [moduloActual, setModuloActual] = useState('dashboard');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [formData, setFormData] = useState({});

  // Estados para datos
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [ventas, setVentas] = useState(VENTAS_INICIALES);
  const [proveedores, setProveedores] = useState(PROVEEDORES_INICIALES);
  const [facturas] = useState(FACTURAS_INICIALES);

  // Cálculos del Dashboard
  const totalProductos = productos.length;
  const totalVentas = ventas.length;
  const totalProveedores = proveedores.length;
  const totalFacturas = facturas.length;

  const ventasMes = ventas
    .filter(v => new Date(v.fecha).getMonth() === new Date().getMonth())
    .reduce((sum, v) => sum + v.total, 0);

  const cuentasPorPagar = proveedores.reduce((sum, p) => sum + p.saldo, 0);

  const facturasPendientes = facturas.filter(f => f.estado === 'Pendiente').length;

  const balanceEstimado = ventasMes - cuentasPorPagar;

  const facturasVencidas = facturas.filter(f => {
    if (f.estado === 'Vencida') return true;
    if (f.estado === 'Pendiente') {
      const vencimiento = new Date(f.vencimiento);
      return vencimiento < new Date();
    }
    return false;
  });

  const stockBajo = productos.filter(p => p.stock < 10);

  const proximosVencimientosIVA = facturas.filter(f => {
    if (f.estado === 'Pendiente') {
      const vencimiento = new Date(f.vencimiento);
      const hoy = new Date();
      const diffDias = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
      return diffDias > 0 && diffDias <= 7;
    }
    return false;
  });

  // Funciones CRUD genéricas
  const abrirModal = (item = null) => {
    setItemEditando(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setItemEditando(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' || name === 'cantidad' || name === 'total' || name === 'saldo' || name === 'monto'
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (moduloActual === 'productos') {
      if (itemEditando) {
        setProductos(productos.map(p => p.id === itemEditando.id ? { ...formData, id: itemEditando.id } : p));
      } else {
        const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
        setProductos([...productos, { ...formData, id: nuevoId }]);
      }
    } else if (moduloActual === 'ventas') {
      if (itemEditando) {
        setVentas(ventas.map(v => v.id === itemEditando.id ? { ...formData, id: itemEditando.id } : v));
      } else {
        const nuevoId = Math.max(...ventas.map(v => v.id), 0) + 1;
        setVentas([...ventas, { ...formData, id: nuevoId }]);
      }
    } else if (moduloActual === 'proveedores') {
      if (itemEditando) {
        setProveedores(proveedores.map(p => p.id === itemEditando.id ? { ...formData, id: itemEditando.id } : p));
      } else {
        const nuevoId = Math.max(...proveedores.map(p => p.id), 0) + 1;
        setProveedores([...proveedores, { ...formData, id: nuevoId }]);
      }
    }

    cerrarModal();
  };

  const eliminarItem = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro?')) {
      if (moduloActual === 'productos') {
        setProductos(productos.filter(p => p.id !== id));
      } else if (moduloActual === 'ventas') {
        setVentas(ventas.filter(v => v.id !== id));
      } else if (moduloActual === 'proveedores') {
        setProveedores(proveedores.filter(p => p.id !== id));
      }
    }
  };

  // Renderizado de módulos
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Bienvenido, {usuarioLogueado.nombre}
        </h2>
        <p className="text-indigo-100">Rol: {usuarioLogueado.rol}</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Productos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalProductos}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ventas</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalVentas}</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Proveedores</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalProveedores}</p>
            </div>
            <Users className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Facturas</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalFacturas}</p>
            </div>
            <FileText className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Alertas Importantes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          Alertas Importantes
        </h3>
        <div className="space-y-3">
          {facturasVencidas.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="font-semibold text-red-800">
                {facturasVencidas.length} Factura(s) Vencida(s)
              </p>
              <p className="text-sm text-red-600 mt-1">
                Requieren atención inmediata
              </p>
            </div>
          )}
          {stockBajo.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <p className="font-semibold text-yellow-800">
                {stockBajo.length} Producto(s) con Stock Bajo
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Considerar reposición de inventario
              </p>
            </div>
          )}
          {proximosVencimientosIVA.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="font-semibold text-blue-800">
                {proximosVencimientosIVA.length} Próximo(s) Vencimiento(s) IVA
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Revisar facturas pendientes
              </p>
            </div>
          )}
          {facturasVencidas.length === 0 && stockBajo.length === 0 && proximosVencimientosIVA.length === 0 && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <p className="font-semibold text-green-800">
                No hay alertas pendientes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen Financiero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90">Ventas del Mes</p>
          <p className="text-2xl font-bold mt-1">{formatearMoneda(ventasMes)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90">Cuentas por Pagar</p>
          <p className="text-2xl font-bold mt-1">{formatearMoneda(cuentasPorPagar)}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90">Facturas Pendientes</p>
          <p className="text-2xl font-bold mt-1">{facturasPendientes}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90">Balance Estimado</p>
          <p className="text-2xl font-bold mt-1">{formatearMoneda(balanceEstimado)}</p>
        </div>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{producto.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatearMoneda(producto.precio)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${producto.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                    {producto.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.proveedor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModal(producto)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => eliminarItem(producto.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        title={itemEditando ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
            <input
              type="text"
              name="proveedor"
              value={formData.proveedor || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={cerrarModal}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderVentas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Registro de Ventas</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Venta
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventas.map((venta) => (
                <tr key={venta.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{venta.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.producto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.cantidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatearMoneda(venta.total)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      venta.estado === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {venta.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModal(venta)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => eliminarItem(venta.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        title={itemEditando ? 'Editar Venta' : 'Nueva Venta'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formData.cliente || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
            <select
              name="producto"
              value={formData.producto || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.nombre}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
            <input
              type="number"
              name="total"
              value={formData.total || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="Completada">Completada</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={cerrarModal}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderProveedores = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Proveedor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo Pendiente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proveedor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proveedor.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.rut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.contacto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${proveedor.saldo > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatearMoneda(proveedor.saldo)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModal(proveedor)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => eliminarItem(proveedor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        title={itemEditando ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RUT</label>
            <input
              type="text"
              name="rut"
              value={formData.rut || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contacto</label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Saldo Pendiente</label>
            <input
              type="number"
              name="saldo"
              value={formData.saldo || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={cerrarModal}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderFacturas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Facturas</h2>
        <p className="text-sm text-gray-600">Solo lectura - Visualización de facturas</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Factura</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facturas.map((factura) => (
                <tr key={factura.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{factura.numero}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{factura.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{factura.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatearMoneda(factura.monto)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.vencimiento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      factura.estado === 'Pagada' 
                        ? 'bg-green-100 text-green-800' 
                        : factura.estado === 'Vencida' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {factura.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Si no hay usuario logueado, mostrar login
  if (!usuarioLogueado) {
    return <Login onLogin={setUsuarioLogueado} />;
  }

  // Renderizar aplicación principal
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Estilo Vivo</h1>
              <p className="text-xs text-gray-500">ERP System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setModuloActual('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              moduloActual === 'dashboard'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setModuloActual('productos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              moduloActual === 'productos'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            Productos
          </button>
          <button
            onClick={() => setModuloActual('ventas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              moduloActual === 'ventas'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Ventas
          </button>
          <button
            onClick={() => setModuloActual('proveedores')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              moduloActual === 'proveedores'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            Proveedores
          </button>
          <button
            onClick={() => setModuloActual('facturas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              moduloActual === 'facturas'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            Facturas
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setUsuarioLogueado(null)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {moduloActual === 'dashboard' && 'Dashboard'}
                {moduloActual === 'productos' && 'Gestión de Productos'}
                {moduloActual === 'ventas' && 'Registro de Ventas'}
                {moduloActual === 'proveedores' && 'Gestión de Proveedores'}
                {moduloActual === 'facturas' && 'Gestión de Facturas'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{usuarioLogueado.nombre}</p>
                <p className="text-xs text-gray-500">{usuarioLogueado.rol}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {usuarioLogueado.nombre.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido del Módulo */}
        <div className="p-8">
          {moduloActual === 'dashboard' && renderDashboard()}
          {moduloActual === 'productos' && renderProductos()}
          {moduloActual === 'ventas' && renderVentas()}
          {moduloActual === 'proveedores' && renderProveedores()}
          {moduloActual === 'facturas' && renderFacturas()}
        </div>
      </main>
    </div>
  );
};

export default EstiloVivoERP;

