import * as XLSX from 'xlsx';
import type { ReportTemplateData } from './reports-templates.types';
import type { QuickReportItem, SiabucReportData } from './reports.types';
import type { Loan } from '../loans/loans.types';

export const ALL_QUICK_REPORT_TEMPLATES: (QuickReportItem & { badge: string; description: string })[] = [
  {
    id: 'rep-carreras',
    title: 'Reporte de Préstamos por Carrera',
    badge: 'Circulación y Demanda Estudiantil',
    description: 'Población atendida por programa, títulos prestados, clasificación Dewey, fechas y modalidades de circulación.',
    iconName: 'BookOpen',
    iconBgColor: '#EFF6FF',
    iconColor: '#2563EB',
    fileName: 'reporte_prestamos_por_carrera.csv',
  },
  {
    id: 'rep-sanciones',
    title: 'Reporte Contable de Multas y Sanciones',
    badge: 'Financiero y Administrativo',
    description: 'Desglose de adeudos por alumno, días de retraso, montos tasados, recaudados, pendientes y condonaciones.',
    iconName: 'ClipboardCheck',
    iconBgColor: '#FFFBEB',
    iconColor: '#D97706',
    fileName: 'reporte_contable_multas_sanciones.csv',
  },
  {
    id: 'rep-inventario',
    title: 'Estado Físico de Ejemplares e Inventario',
    badge: 'Control Patrimonial y Activos',
    description: 'Código de inventario, ISBN, estantería, condición física (óptimo, maltratado, mantenimiento), rotación y valor contable.',
    iconName: 'Package',
    iconBgColor: '#F0FDF4',
    iconColor: '#16A34A',
    fileName: 'reporte_inventario_estado_fisico.csv',
  },
  {
    id: 'rep-acervo',
    title: 'Frecuencia de Consulta del Acervo',
    badge: 'Rotación y Sugerencias de Adquisición',
    description: 'Tasa de rotación de títulos, existencias vs préstamos, lista de espera y recomendaciones automáticas de compra.',
    iconName: 'RotateCcw',
    iconBgColor: '#FAF5FF',
    iconColor: '#9333EA',
    fileName: 'reporte_frecuencia_rotacion_acervo.csv',
  },
  {
    id: 'rep-morosidad',
    title: 'Reporte de Morosidad y Préstamos Vencidos',
    badge: 'Seguimiento Directo y Citatorios',
    description: 'Alumnos con libros vencidos hoy o >3 días, datos de contacto (teléfono/correo) para citación previa a fin de cuatrimestre.',
    iconName: 'AlertTriangle',
    iconBgColor: '#FEF2F2',
    iconColor: '#DC2626',
    fileName: 'reporte_morosidad_prestamos_vencidos.csv',
  },
  {
    id: 'rep-convenios',
    title: 'Reporte de Convenios y Préstamos Interbibliotecarios',
    badge: 'Red de Cooperación Bibliotecaria',
    description: 'Instituciones aliadas, responsables titulares, oficios de intercambio, libros prestados y recibidos en convenio.',
    iconName: 'Building2',
    iconBgColor: '#F0F9FF',
    iconColor: '#0284C7',
    fileName: 'reporte_convenios_interbibliotecarios.csv',
  },
  {
    id: 'rep-cedula',
    title: 'Cédula Estadística Semestral / Trimestral',
    badge: 'Formato Oficial / Dirección',
    description: 'Cédula oficial estandarizada: volúmenes catalogados, usuarios atendidos por mes, desglose sala vs domicilio.',
    iconName: 'BarChart3',
    iconBgColor: '#ECFDF5',
    iconColor: '#059669',
    fileName: 'cedula_estadistica_institucional.csv',
  },
];

export function buildReportTemplateData(
  reportId: string,
  _siabucData: SiabucReportData,
  loansList: Loan[] = [],
  dateRange?: { startDate?: string; endDate?: string }
): ReportTemplateData {
  const currentYear = new Date().getFullYear();
  const customPeriod = (dateRange?.startDate && dateRange?.endDate)
    ? `Del ${dateRange.startDate} al ${dateRange.endDate}`
    : `Periodo Anual ${currentYear}`;

  switch (reportId) {
    // --------------------------------------------------------------------------
    // A. REPORTE DE PRÉSTAMOS POR CARRERA
    // --------------------------------------------------------------------------
    case 'rep-carreras': {
      const rows = loansList.length > 0 ? loansList.map((loan, idx) => ({
        folio: loan.folio || `PR-00${idx + 1}`,
        matricula: `MAT-${120000 + idx * 7}`,
        usuario: loan.userName,
        carrera: loan.userCareerName || 'Ing. en Tecnologías de Información e Innovación Digital',
        tipoUsuario: loan.userCategory === 'TEACHER' ? 'Docente' : loan.userKind === 'ADMINISTRATIVE' ? 'Administrativo' : 'Alumno',
        libro: loan.resourceTitle,
        dewey: '005.13 — Programación',
        fechaPrestamo: loan.checkoutDate || '18 nov. 2026',
        fechaLimite: loan.dueDate || '28 nov. 2026',
        fechaDevolucion: loan.returnDate || (loan.status === 'RETURNED' ? loan.dueDate : 'En posesión'),
        modalidad: loan.tipoPrestamoNombre || 'Domicilio',
        estado: loan.status === 'RETURNED' ? 'Devuelto' : loan.status === 'OVERDUE' ? 'Vencido' : 'Activo',
      })) : [
        {
          folio: 'PR-001',
          matricula: '202300124',
          usuario: 'Irvin Alejandro Ortiz Silvestre',
          carrera: 'Ing. en Tecnologías de Información e Innovación Digital',
          tipoUsuario: 'Alumno',
          libro: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          dewey: '005.1 — Programación',
          fechaPrestamo: '18 nov. 2026',
          fechaLimite: '28 nov. 2026',
          fechaDevolucion: '23 nov. 2026',
          modalidad: 'Domicilio',
          estado: 'Devuelto',
        },
        {
          folio: 'PR-002',
          matricula: '202300892',
          usuario: 'Carlos Mendoza Ríos',
          carrera: 'Ing. en Mecatrónica Industrial',
          tipoUsuario: 'Alumno',
          libro: 'Cálculo de una variable: Trascendentes tempranas',
          dewey: '515.1 — Matemáticas',
          fechaPrestamo: '20 nov. 2026',
          fechaLimite: '27 nov. 2026',
          fechaDevolucion: 'En posesión',
          modalidad: 'Domicilio',
          estado: 'Activo',
        },
        {
          folio: 'PR-003',
          matricula: '202201455',
          usuario: 'Mariana Galván Torres',
          carrera: 'Ing. en Biotecnología',
          tipoUsuario: 'Alumno',
          libro: 'Molecular Biology of the Cell',
          dewey: '571.6 — Biología Celular',
          fechaPrestamo: '15 nov. 2026',
          fechaLimite: '22 nov. 2026',
          fechaDevolucion: 'En posesión',
          modalidad: 'Sala',
          estado: 'Vencido',
        },
        {
          folio: 'PR-004',
          matricula: 'DOC-5542',
          usuario: 'Mtro. Fernando Arreola',
          carrera: 'Ing. en Tecnologías de Información e Innovación Digital',
          tipoUsuario: 'Docente',
          libro: 'Designing Data-Intensive Applications',
          dewey: '004.2 — Arquitectura de Sistemas',
          fechaPrestamo: '10 nov. 2026',
          fechaLimite: '30 nov. 2026',
          fechaDevolucion: 'En posesión',
          modalidad: 'Domicilio',
          estado: 'Activo',
        },
      ];

      return {
        id: 'rep-carreras',
        code: 'REP-CIR-01',
        title: 'Reporte de Préstamos por Carrera y Demanda Estudiantil',
        categoryBadge: 'Circulación Académica',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Periodo Anual ${currentYear}`,
        description: 'Auditoría detallada de población estudiantil atendida, acervo solicitado, modalidades de lectura y clasificaciones Dewey más demandadas.',
        kpis: [
          { label: 'AÑO DE INFORME', value: currentYear },
          { label: 'TOTAL PRÉSTAMOS', value: rows.length || 15 },
          { label: 'ALUMNOS ATENDIDOS', value: Math.max(Math.round(rows.length * 0.85), 9) },
          { label: 'PROM. LIBROS / ESTUDIANTE', value: '2.4' },
          { label: 'CARRERA LÍDER DE LECTURA', value: 'ITIID' },
          { label: '% DEVOLUCIÓN A TIEMPO', value: '93.3%', highlight: true },
        ],
        trendChartTitle: 'Distribución Mensual de Préstamos por Modalidad',
        trendChartSubtitle: 'Comparativa de Préstamos a Domicilio vs. Consulta en Sala',
        trendSeries: [
          { label: 'Ene', value: 3, sublabel: 'Domicilio: 2, Sala: 1' },
          { label: 'Feb', value: 5, sublabel: 'Domicilio: 4, Sala: 1' },
          { label: 'Mar', value: 8, sublabel: 'Domicilio: 6, Sala: 2' },
          { label: 'Abr', value: 6, sublabel: 'Domicilio: 5, Sala: 1' },
          { label: 'May', value: 10, sublabel: 'Domicilio: 8, Sala: 2' },
          { label: 'Jun', value: 12, sublabel: 'Domicilio: 9, Sala: 3' },
          { label: 'Jul', value: 4, sublabel: 'Domicilio: 3, Sala: 1' },
          { label: 'Ago', value: 7, sublabel: 'Domicilio: 5, Sala: 2' },
          { label: 'Sep', value: 14, sublabel: 'Domicilio: 11, Sala: 3' },
          { label: 'Oct', value: 18, sublabel: 'Domicilio: 14, Sala: 4' },
          { label: 'Nov', value: rows.length || 15, sublabel: 'Domicilio: 12, Sala: 3' },
          { label: 'Dic', value: 2, sublabel: 'Domicilio: 2, Sala: 0' },
        ],
        rankingChartTitle: 'Demanda de Préstamos por Programa Académico',
        rankingChartSubtitle: 'Índice de circulación por Carrera / Facultad',
        rankingSeries: [
          { label: 'Ing. en Tecnologías de Información (ITIID)', value: 42, color: '#2563EB' },
          { label: 'Ing. en Mecatrónica Industrial', value: 28, color: '#3B82F6' },
          { label: 'Ing. en Biotecnología', value: 19, color: '#60A5FA' },
          { label: 'Lic. en Administración y Gestión', value: 12, color: '#93C5FD' },
          { label: 'Ing. en Redes y Telecomunicaciones', value: 8, color: '#BFDBFE' },
        ],
        columns: [
          { key: 'folio', header: 'FOLIO', minWidth: '95px' },
          { key: 'matricula', header: 'MATRÍCULA / NÓMINA', minWidth: '130px' },
          { key: 'usuario', header: 'NOMBRE DEL USUARIO', minWidth: '180px' },
          { key: 'carrera', header: 'CARRERA / ÁREA', minWidth: '220px' },
          {
            key: 'tipoUsuario',
            header: 'TIPO',
            minWidth: '95px',
            badge: (val) => ({
              text: val,
              bg: val === 'Docente' ? '#FEF3C7' : '#EFF6FF',
              color: val === 'Docente' ? '#92400E' : '#1D4ED8',
            }),
          },
          { key: 'libro', header: 'TÍTULO DEL LIBRO', minWidth: '220px' },
          { key: 'dewey', header: 'DEWEY / CLASIF.', minWidth: '140px' },
          { key: 'fechaPrestamo', header: 'F. PRÉSTAMO', minWidth: '115px' },
          { key: 'fechaLimite', header: 'F. LÍMITE', minWidth: '115px' },
          { key: 'fechaDevolucion', header: 'F. DEVOLUCIÓN', minWidth: '120px' },
          {
            key: 'modalidad',
            header: 'MODALIDAD',
            minWidth: '110px',
            badge: (val) => ({
              text: val,
              bg: val === 'Domicilio' ? '#F0FDF4' : '#F5F3FF',
              color: val === 'Domicilio' ? '#166534' : '#6B21A8',
            }),
          },
          {
            key: 'estado',
            header: 'ESTADO',
            minWidth: '100px',
            badge: (val) => ({
              text: val,
              bg: val === 'Devuelto' ? '#DCFCE7' : val === 'Vencido' ? '#FEE2E2' : '#DBEAFE',
              color: val === 'Devuelto' ? '#15803D' : val === 'Vencido' ? '#B91C1C' : '#1E40AF',
            }),
          },
        ],
        rows,
        totalSummaryRow: {
          folio: 'TOTALES',
          matricula: `${rows.length} registros`,
          usuario: '—',
          carrera: 'Todas las áreas',
          tipoUsuario: '100% comunidad',
          libro: '—',
          dewey: '—',
          fechaPrestamo: '—',
          fechaLimite: '—',
          fechaDevolucion: '—',
          modalidad: 'Circulación general',
          estado: 'Concluido / En regla',
        },
        defaultFileName: 'reporte_prestamos_carreras_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // B. REPORTE CONTABLE DE MULTAS Y SANCIONES
    // --------------------------------------------------------------------------
    case 'rep-sanciones': {
      const rows = [
        {
          folioSancion: 'SAN-2026-001',
          nombre: 'Mariana Galván Torres',
          identificador: '202201455 · mariana.galvan@upd.edu.mx',
          carrera: 'Ing. en Biotecnología',
          motivo: 'Retraso de 3 días en devolución de Molecular Biology',
          diasRetraso: 3,
          montoTasado: '$45.00',
          montoPagado: '$0.00',
          montoPendiente: '$45.00',
          folioRecibo: 'PEND-001',
          fechaEmision: '22 nov. 2026',
          fechaLiquidacion: 'Pendiente',
          estado: 'Pendiente de cobro',
        },
        {
          folioSancion: 'SAN-2026-002',
          nombre: 'Carlos Mendoza Ríos',
          identificador: '202300892 · carlos.mendoza@upd.edu.mx',
          carrera: 'Ing. en Mecatrónica Industrial',
          motivo: 'Retraso de 2 días en libro de Cálculo',
          diasRetraso: 2,
          montoTasado: '$30.00',
          montoPagado: '$30.00',
          montoPendiente: '$0.00',
          folioRecibo: 'REC-2026-042',
          fechaEmision: '15 nov. 2026',
          fechaLiquidacion: '16 nov. 2026',
          estado: 'Pagado',
        },
        {
          folioSancion: 'SAN-2026-003',
          nombre: 'Luis Eduardo Morales',
          identificador: '202100412 · luis.morales@upd.edu.mx',
          carrera: 'Ing. en Tecnologías de Información',
          motivo: 'Deterioro leve en portada de libro prestado',
          diasRetraso: 0,
          montoTasado: '$50.00',
          montoPagado: '$50.00',
          montoPendiente: '$0.00',
          folioRecibo: 'REC-2026-039',
          fechaEmision: '05 nov. 2026',
          fechaLiquidacion: '07 nov. 2026',
          estado: 'Pagado',
        },
        {
          folioSancion: 'SAN-2026-004',
          nombre: 'Andrea Rentería Soto',
          identificador: '202301981 · andrea.renteria@upd.edu.mx',
          carrera: 'Lic. en Administración y Gestión',
          motivo: 'Retraso justificado por incapacidad médica oficial',
          diasRetraso: 4,
          montoTasado: '$60.00',
          montoPagado: '$0.00',
          montoPendiente: '$0.00',
          folioRecibo: 'COND-2026-008',
          fechaEmision: '12 oct. 2026',
          fechaLiquidacion: '13 oct. 2026',
          estado: 'Condonado (Justif. Médico)',
        },
      ];

      return {
        id: 'rep-sanciones',
        code: 'REP-FIN-02',
        title: 'Reporte Contable de Multas, Sanciones y Recaudación',
        categoryBadge: 'Administrativo y Financiero',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Ejercicio Fiscal ${currentYear}`,
        description: 'Auditoría financiera de multas generadas por morosidad o daño material, folios de recibo y recaudación presupuestal.',
        kpis: [
          { label: 'AÑO FISCAL', value: currentYear },
          { label: 'TOTAL EMITIDO', value: '$185.00 MXN' },
          { label: 'RECAUDADO EN CAJA', value: '$80.00 MXN' },
          { label: 'PENDIENTE DE COBRO', value: '$45.00 MXN' },
          { label: 'CONDONACIONES', value: '$60.00 MXN' },
          { label: 'EFICIENCIA DE COBRO', value: '64.0%', highlight: true },
        ],
        trendChartTitle: 'Recaudación Mensual de Multas Bibliotecarias',
        trendChartSubtitle: 'Ingresos por cuotas de recuperación y resarcimiento',
        trendSeries: [
          { label: 'Ene', value: 0 }, { label: 'Feb', value: 30 }, { label: 'Mar', value: 45 },
          { label: 'Abr', value: 15 }, { label: 'May', value: 60 }, { label: 'Jun', value: 90 },
          { label: 'Jul', value: 0 }, { label: 'Ago', value: 20 }, { label: 'Sep', value: 50 },
          { label: 'Oct', value: 60 }, { label: 'Nov', value: 80 }, { label: 'Dic', value: 0 },
        ],
        rankingChartTitle: 'Causas de Multa y Sanción Económica',
        rankingChartSubtitle: 'Distribución por motivo de afectación',
        rankingSeries: [
          { label: 'Días de retraso acumulados', value: 75, color: '#D97706' },
          { label: 'Daño o maltrato físico', value: 15, color: '#F59E0B' },
          { label: 'Pérdida temporal de material', value: 10, color: '#FBBF24' },
        ],
        columns: [
          { key: 'folioSancion', header: 'FOLIO SANCIÓN', minWidth: '120px' },
          { key: 'nombre', header: 'NOMBRE DEUDOR', minWidth: '180px' },
          { key: 'identificador', header: 'MATRÍCULA / CORREO', minWidth: '220px' },
          { key: 'carrera', header: 'CARRERA', minWidth: '200px' },
          { key: 'motivo', header: 'MOTIVO DETALLADO', minWidth: '240px' },
          { key: 'diasRetraso', header: 'DÍAS RETRASO', minWidth: '100px', align: 'center' },
          { key: 'montoTasado', header: 'TASADO', minWidth: '90px', align: 'right' },
          { key: 'montoPagado', header: 'PAGADO', minWidth: '90px', align: 'right' },
          { key: 'montoPendiente', header: 'PENDIENTE', minWidth: '95px', align: 'right' },
          { key: 'folioRecibo', header: 'FOLIO RECIBO', minWidth: '110px' },
          { key: 'fechaEmision', header: 'F. EMISIÓN', minWidth: '105px' },
          {
            key: 'estado',
            header: 'ESTADO',
            minWidth: '130px',
            badge: (val) => ({
              text: val,
              bg: val.includes('Pagado') ? '#DCFCE7' : val.includes('Condonado') ? '#E0E7FF' : '#FEE2E2',
              color: val.includes('Pagado') ? '#15803D' : val.includes('Condonado') ? '#3730A3' : '#B91C1C',
            }),
          },
        ],
        rows,
        totalSummaryRow: {
          folioSancion: 'TOTALES',
          nombre: `${rows.length} sanciones registradas`,
          identificador: '—',
          carrera: '—',
          motivo: 'Auditoría contable anual',
          diasRetraso: '9 días acum.',
          montoTasado: '$185.00 MXN',
          montoPagado: '$80.00 MXN',
          montoPendiente: '$45.00 MXN',
          folioRecibo: 'Caja Acervo',
          fechaEmision: '—',
          estado: 'Liquidado en 64%',
        },
        defaultFileName: 'reporte_contable_sanciones_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // C. ESTADO FÍSICO DE EJEMPLARES E INVENTARIO PATRIMONIAL
    // --------------------------------------------------------------------------
    case 'rep-inventario': {
      const rows = [
        {
          codigo: 'ACT-LIB-00101',
          isbn: '978-0-13-235088-4',
          titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          autor: 'Robert C. Martin',
          editorial: 'Prentice Hall (2008)',
          ubicacion: 'Estante A-3 · Pasillo 2',
          coleccion: 'Colección General',
          condicion: 'Excelente',
          prestamosTotales: 14,
          valorPatrimonial: '$850.00 MXN',
          estatusOperativo: 'En servicio activo',
        },
        {
          codigo: 'ACT-LIB-00102',
          isbn: '978-0-13-235088-4',
          titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship (Copia 2)',
          autor: 'Robert C. Martin',
          editorial: 'Prentice Hall (2008)',
          ubicacion: 'Estante A-3 · Pasillo 2',
          coleccion: 'Colección General',
          condicion: 'Regular',
          prestamosTotales: 22,
          valorPatrimonial: '$850.00 MXN',
          estatusOperativo: 'En servicio activo',
        },
        {
          codigo: 'ACT-LIB-00215',
          isbn: '978-607-481-777-5',
          titulo: 'Cálculo de una variable: Trascendentes tempranas',
          autor: 'James Stewart',
          editorial: 'Cengage Learning (2020)',
          ubicacion: 'Estante C-1 · Pasillo 1',
          coleccion: 'Reserva Académica',
          condicion: 'Excelente',
          prestamosTotales: 18,
          valorPatrimonial: '$1,200.00 MXN',
          estatusOperativo: 'En servicio activo',
        },
        {
          codigo: 'ACT-LIB-00342',
          isbn: '978-0-201-63361-0',
          titulo: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          autor: 'Erich Gamma, Richard Helm',
          editorial: 'Addison-Wesley (1994)',
          ubicacion: 'Taller de Encuadernación',
          coleccion: 'Colección General',
          condicion: 'En empastado/mantenimiento',
          prestamosTotales: 38,
          valorPatrimonial: '$1,100.00 MXN',
          estatusOperativo: 'En mantenimiento correctivo',
        },
        {
          codigo: 'ACT-LIB-00409',
          isbn: '978-0-8153-4432-2',
          titulo: 'Molecular Biology of the Cell (6th Edition)',
          autor: 'Bruce Alberts, Alexander Johnson',
          editorial: 'Garland Science (2014)',
          ubicacion: 'Estante B-2 · Pasillo 3',
          coleccion: 'Consulta Interna',
          condicion: 'Excelente',
          prestamosTotales: 9,
          valorPatrimonial: '$2,400.00 MXN',
          estatusOperativo: 'En servicio activo',
        },
      ];

      return {
        id: 'rep-inventario',
        code: 'REP-PAT-03',
        title: 'Estado Físico de Ejemplares y Control Patrimonial',
        categoryBadge: 'Inventario Físico y Activos',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Corte de Inventario ${currentYear}`,
        description: 'Censo patrimonial de activos bibliográficos: ubicación en estantería, condición física de preservación, desgaste y valuación contable.',
        kpis: [
          { label: 'AÑO DE REVISIÓN', value: currentYear },
          { label: 'TOTAL EJEMPLARES CENSADOS', value: '103 volúmenes' },
          { label: 'EN CONDICIÓN EXCELENTE', value: '88 volúmenes' },
          { label: 'EN MANTENIMIENTO / EMPASTE', value: '3 volúmenes' },
          { label: 'VALOR PATRIMONIAL ESTIMADO', value: '$118,500.00 MXN' },
          { label: 'ÍNDICE DE PRESERVACIÓN', value: '96.2%', highlight: true },
        ],
        trendChartTitle: 'Distribución del Acervo por Condición Física',
        trendChartSubtitle: 'Diagnóstico de conservación y desgaste de materiales',
        trendSeries: [
          { label: 'Excelente (Nuevo)', value: 68, color: '#16A34A' },
          { label: 'Regular (Buen uso)', value: 24, color: '#3B82F6' },
          { label: 'Desgaste / Reparable', value: 8, color: '#D97706' },
          { label: 'En mantenimiento', value: 3, color: '#DC2626' },
        ],
        rankingChartTitle: 'Desgaste y Rotación por Área de Estantería',
        rankingChartSubtitle: 'Promedio de circulación por pasillo y colección',
        rankingSeries: [
          { label: '000 — Ciencias Computacionales (Estante A)', value: 24.5, color: '#2563EB' },
          { label: '500 — Ciencias Puras y Cálculo (Estante C)', value: 18.2, color: '#3B82F6' },
          { label: '600 — Tecnología y Medicina (Estante B)', value: 14.8, color: '#60A5FA' },
          { label: '300 — Ciencias Sociales y Negocios', value: 8.6, color: '#93C5FD' },
        ],
        columns: [
          { key: 'codigo', header: 'CÓDIGO INVENTARIO / BARRAS', minWidth: '150px' },
          { key: 'isbn', header: 'ISBN', minWidth: '140px' },
          { key: 'titulo', header: 'TÍTULO DEL MATERIAL', minWidth: '240px' },
          { key: 'autor', header: 'AUTOR / EDITORIAL', minWidth: '200px' },
          { key: 'ubicacion', header: 'UBICACIÓN FÍSICA', minWidth: '170px' },
          { key: 'coleccion', header: 'COLECCIÓN', minWidth: '140px' },
          {
            key: 'condicion',
            header: 'CONDICIÓN FÍSICA',
            minWidth: '150px',
            badge: (val) => ({
              text: val,
              bg: val === 'Excelente' ? '#DCFCE7' : val === 'Regular' ? '#EFF6FF' : '#FEF3C7',
              color: val === 'Excelente' ? '#15803D' : val === 'Regular' ? '#1D4ED8' : '#92400E',
            }),
          },
          { key: 'prestamosTotales', header: 'PRÉSTAMOS HIST.', minWidth: '120px', align: 'center' },
          { key: 'valorPatrimonial', header: 'VALOR ESTIMADO', minWidth: '120px', align: 'right' },
          { key: 'estatusOperativo', header: 'ESTATUS OPERATIVO', minWidth: '160px' },
        ],
        rows,
        totalSummaryRow: {
          codigo: 'TOTALES',
          isbn: '103 ejemplares registrados',
          titulo: '—',
          autor: '—',
          ubicacion: 'Acervo Central UPD',
          coleccion: '100% catalogado',
          condicion: '96% apto',
          prestamosTotales: '412 préstamos acumulados',
          valorPatrimonial: '$118,500.00 MXN',
          estatusOperativo: 'Inventario conciliado',
        },
        defaultFileName: 'reporte_inventario_patrimonial_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // D. FRECUENCIA DE CONSULTA DEL ACERVO Y ADQUISICIONES
    // --------------------------------------------------------------------------
    case 'rep-acervo': {
      const rows = [
        {
          titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          autor: 'Robert C. Martin (2008)',
          dewey: '005.1 — Computación',
          ejemplaresDisponibles: '2 de 2 en uso',
          prestamosPeriodo: 14,
          tasaRotacion: '94.2%',
          colaEspera: 4,
          recomendacion: 'Adquisición urgente (+3 ejemplares)',
          prioridad: 'Alta',
        },
        {
          titulo: 'Cálculo de una variable: Trascendentes tempranas',
          autor: 'James Stewart (Ed. 2020)',
          dewey: '515 — Matemáticas',
          ejemplaresDisponibles: '3 de 4 en uso',
          prestamosPeriodo: 11,
          tasaRotacion: '82.5%',
          colaEspera: 2,
          recomendacion: 'Adquisición recomendada (+2 ejemplares)',
          prioridad: 'Media',
        },
        {
          titulo: 'Design Patterns: Elements of Reusable Software',
          autor: 'Erich Gamma et al.',
          dewey: '005.12 — Software',
          ejemplaresDisponibles: '1 de 1 en uso',
          prestamosPeriodo: 9,
          tasaRotacion: '88.0%',
          colaEspera: 3,
          recomendacion: 'Adquisición urgente (+2 ejemplares)',
          prioridad: 'Alta',
        },
        {
          titulo: 'Molecular Biology of the Cell',
          autor: 'Bruce Alberts (2014)',
          dewey: '571 — Biología',
          ejemplaresDisponibles: '1 de 2 en uso',
          prestamosPeriodo: 5,
          tasaRotacion: '45.0%',
          colaEspera: 0,
          recomendacion: 'Existencias suficientes',
          prioridad: 'Baja',
        },
        {
          titulo: 'Administración Estratégica y Política de Negocios',
          autor: 'Thomas L. Wheelen',
          dewey: '658 — Administración',
          ejemplaresDisponibles: '0 de 3 en uso',
          prestamosPeriodo: 1,
          tasaRotacion: '12.0%',
          colaEspera: 0,
          recomendacion: 'Baja demanda / Reevaluar ubicación',
          prioridad: 'Baja',
        },
      ];

      return {
        id: 'rep-acervo',
        code: 'REP-ROT-04',
        title: 'Frecuencia de Consulta, Rotación y Sugerencias de Compra',
        categoryBadge: 'Desarrollo de Colecciones',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Diagnóstico Semestral ${currentYear}`,
        description: 'Tasa de rotación del material bibliográfico, tiempos en estante vs. préstamo, colas de espera y sugerencias de compra para títulos de alta demanda.',
        kpis: [
          { label: 'AÑO DE ANÁLISIS', value: currentYear },
          { label: 'TÍTULOS MONITOREADOS', value: '36 títulos' },
          { label: 'TASA PROM. ROTACIÓN', value: '71.5%' },
          { label: 'RESERVAS EN ESPERA', value: '9 alumnos' },
          { label: 'NUEVAS COMPRAS SUGERIDAS', value: '7 títulos' },
          { label: 'EFICIENCIA DE USO', value: '84.8%', highlight: true },
        ],
        trendChartTitle: 'Tasa de Rotación vs. Disponibilidad de Ejemplares',
        trendChartSubtitle: 'Porcentaje de tiempo que cada libro pasa fuera del estante',
        trendSeries: [
          { label: 'Clean Code', value: 94, sublabel: '14 préstamos / 4 en espera' },
          { label: 'Design Patterns', value: 88, sublabel: '9 préstamos / 3 en espera' },
          { label: 'Cálculo Stewart', value: 82, sublabel: '11 préstamos / 2 en espera' },
          { label: 'Head First Java', value: 76, sublabel: '8 préstamos / 1 en espera' },
          { label: 'Molecular Biology', value: 45, sublabel: '5 préstamos / 0 en espera' },
          { label: 'Admin Estratégica', value: 12, sublabel: '1 préstamo / 0 en espera' },
        ],
        rankingChartTitle: 'Demanda No Satisfecha (Lista de Espera)',
        rankingChartSubtitle: 'Alumnos que solicitaron el libro mientras estaba agotado',
        rankingSeries: [
          { label: 'Clean Code (Robert C. Martin)', value: 4, color: '#DC2626' },
          { label: 'Design Patterns (GoF)', value: 3, color: '#EA580C' },
          { label: 'Cálculo Stewart (Ed. 2020)', value: 2, color: '#D97706' },
          { label: 'Clean Architecture (Uncle Bob)', value: 2, color: '#CA8A04' },
        ],
        columns: [
          { key: 'titulo', header: 'TÍTULO BIBLIOGRÁFICO', minWidth: '240px' },
          { key: 'autor', header: 'AUTOR Y EDICIÓN', minWidth: '180px' },
          { key: 'dewey', header: 'DEWEY / CAT.', minWidth: '140px' },
          { key: 'ejemplaresDisponibles', header: 'DISPONIBILIDAD', minWidth: '140px' },
          { key: 'prestamosPeriodo', header: 'PRÉSTAMOS PERIODO', minWidth: '130px', align: 'center' },
          { key: 'tasaRotacion', header: 'ROTACIÓN', minWidth: '100px', align: 'center' },
          { key: 'colaEspera', header: 'COLA ESPERA', minWidth: '105px', align: 'center' },
          {
            key: 'recomendacion',
            header: 'RECOMENDACIÓN AUTOMÁTICA',
            minWidth: '220px',
            badge: (val) => ({
              text: val,
              bg: val.includes('urgente') ? '#FEE2E2' : val.includes('recomendada') ? '#FEF3C7' : '#DCFCE7',
              color: val.includes('urgente') ? '#B91C1C' : val.includes('recomendada') ? '#92400E' : '#15803D',
            }),
          },
          {
            key: 'prioridad',
            header: 'PRIORIDAD',
            minWidth: '95px',
            badge: (val) => ({
              text: val,
              bg: val === 'Alta' ? '#FEE2E2' : val === 'Media' ? '#FEF3C7' : '#F1F5F9',
              color: val === 'Alta' ? '#B91C1C' : val === 'Media' ? '#92400E' : '#475569',
            }),
          },
        ],
        rows,
        totalSummaryRow: {
          titulo: 'TOTALES Y PROMEDIOS',
          autor: '—',
          dewey: '—',
          ejemplaresDisponibles: '7 en uso / 12 totales',
          prestamosPeriodo: '40 préstamos',
          tasaRotacion: '71.5% promedio',
          colaEspera: '9 en espera',
          recomendacion: '7 adquisiciones sugeridas',
          prioridad: 'Atención inmediata',
        },
        defaultFileName: 'reporte_frecuencia_rotacion_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // E. REPORTE DE MOROSIDAD Y PRÉSTAMOS VENCIDOS
    // --------------------------------------------------------------------------
    case 'rep-morosidad': {
      const rows = [
        {
          matricula: '202201455',
          nombre: 'Mariana Galván Torres',
          carrera: 'Ing. en Biotecnología',
          telefono: '618-245-8819',
          correo: 'mariana.galvan@upd.edu.mx',
          folioPrestamo: 'PR-003',
          libro: 'Molecular Biology of the Cell (6th Ed.)',
          fechaLimite: '22 nov. 2026',
          diasRetraso: 3,
          estadoSeguimiento: 'Retraso crítico (>3 días)',
          accionSugerida: 'Llamada y Citatorio previo a fin de cuatrimestre',
        },
        {
          matricula: '202300411',
          nombre: 'Emiliano Valenzuela Ruiz',
          carrera: 'Ing. en Mecatrónica Industrial',
          telefono: '618-109-3320',
          correo: 'emiliano.valenzuela@upd.edu.mx',
          folioPrestamo: 'PR-007',
          libro: 'Física Universitaria con Física Moderna Vol. 1',
          fechaLimite: '24 nov. 2026',
          diasRetraso: 1,
          estadoSeguimiento: 'Vencido reciente',
          accionSugerida: 'Envío de correo de recordatorio',
        },
        {
          matricula: '202100889',
          nombre: 'Sofía Castañeda Olvera',
          carrera: 'Lic. en Administración y Gestión',
          telefono: '618-877-1234',
          correo: 'sofia.castaneda@upd.edu.mx',
          folioPrestamo: 'PR-011',
          libro: 'Contabilidad Financiera y de Costos',
          fechaLimite: '18 nov. 2026',
          diasRetraso: 6,
          estadoSeguimiento: 'Bloqueo temporal de servicios',
          accionSugerida: 'Cita con Coordinación de Carrera',
        },
      ];

      return {
        id: 'rep-morosidad',
        code: 'REP-MOR-05',
        title: 'Reporte de Morosidad y Seguimiento a Préstamos Vencidos',
        categoryBadge: 'Cobranza y Recuperación',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Corte Semanal al ${new Date().toLocaleDateString('es-MX')}`,
        description: 'Padrón urgente de usuarios con libros no devueltos a tiempo, días acumulados y datos de contacto para citación previa a cierre de actas.',
        kpis: [
          { label: 'FECHA DE CORTE', value: 'Hoy' },
          { label: 'ALUMNOS MOROSOS', value: rows.length },
          { label: 'LIBROS RETENIDOS', value: rows.length },
          { label: 'RETRASO PROMEDIO', value: '3.3 días' },
          { label: 'CASOS CRÍTICOS (>3 DÍAS)', value: 2 },
          { label: 'ESTATUS DE RETORNO', value: 'Requiere acción', highlight: true },
        ],
        trendChartTitle: 'Distribución de Morosidad por Programa Educativo',
        trendChartSubtitle: 'Alumnos con adeudo activo según su carrera',
        trendSeries: [
          { label: 'Biotecnología', value: 1, sublabel: '1 alumno · 3 días' },
          { label: 'Mecatrónica', value: 1, sublabel: '1 alumno · 1 día' },
          { label: 'Administración', value: 1, sublabel: '1 alumno · 6 días' },
          { label: 'Tecnologías Info.', value: 0, sublabel: 'Al día (0 morosos)' },
        ],
        rankingChartTitle: 'Días de Retraso por Alumno',
        rankingChartSubtitle: 'Gravedad del atraso en entrega de material',
        rankingSeries: [
          { label: 'Sofía Castañeda Olvera (Admin)', value: 6, color: '#B91C1C' },
          { label: 'Mariana Galván Torres (Biotec)', value: 3, color: '#DC2626' },
          { label: 'Emiliano Valenzuela (Mecat)', value: 1, color: '#F59E0B' },
        ],
        columns: [
          { key: 'matricula', header: 'MATRÍCULA', minWidth: '110px' },
          { key: 'nombre', header: 'ALUMNO DEUDOR', minWidth: '180px' },
          { key: 'carrera', header: 'CARRERA', minWidth: '190px' },
          { key: 'telefono', header: 'TELÉFONO', minWidth: '120px' },
          { key: 'correo', header: 'CORREO INSTITUCIONAL', minWidth: '210px' },
          { key: 'folioPrestamo', header: 'FOLIO', minWidth: '90px' },
          { key: 'libro', header: 'TÍTULO DEL LIBRO', minWidth: '220px' },
          { key: 'fechaLimite', header: 'FECHA LÍMITE', minWidth: '110px' },
          { key: 'diasRetraso', header: 'RETRASO', minWidth: '90px', align: 'center' },
          {
            key: 'estadoSeguimiento',
            header: 'ESTADO DE SEGUIMIENTO',
            minWidth: '160px',
            badge: (val) => ({
              text: val,
              bg: val.includes('crítico') || val.includes('Bloqueo') ? '#FEE2E2' : '#FEF3C7',
              color: val.includes('crítico') || val.includes('Bloqueo') ? '#B91C1C' : '#92400E',
            }),
          },
          { key: 'accionSugerida', header: 'ACCIÓN RECOMENDADA', minWidth: '220px' },
        ],
        rows,
        totalSummaryRow: {
          matricula: 'TOTALES',
          nombre: `${rows.length} alumnos en morosidad`,
          carrera: '—',
          telefono: '—',
          correo: '—',
          folioPrestamo: '—',
          libro: '3 libros retenidos',
          fechaLimite: '—',
          diasRetraso: '10 días acum.',
          estadoSeguimiento: 'Atención inmediata',
          accionSugerida: 'Citar antes de evaluación final',
        },
        defaultFileName: 'reporte_morosidad_vencidos_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // F. REPORTE DE CONVENIOS Y PRÉSTAMOS INTERBIBLIOTECARIOS
    // --------------------------------------------------------------------------
    case 'rep-convenios': {
      const rows = [
        {
          institucion: 'Universidad Juárez del Estado de Durango (UJED)',
          claveConvenio: 'CONV-2024-UJED-01',
          responsable: 'Dra. Patricia Martínez Solís',
          contacto: 'patricia.martinez@ujed.mx · (618) 812-3400',
          folioOficio: 'OF-PIB-2026-08',
          librosPrestadosExternos: 6,
          librosRecibidosExternos: 4,
          vigenciaConvenio: 'Vigente (Dic 2027)',
          estadoOperativo: 'Activo con intercambio',
        },
        {
          institucion: 'Instituto Tecnológico de Durango (ITD)',
          claveConvenio: 'CONV-2023-ITD-04',
          responsable: 'Ing. Roberto Andrade Campos',
          contacto: 'randrade@itdurango.edu.mx · (618) 818-4500',
          folioOficio: 'OF-PIB-2026-11',
          librosPrestadosExternos: 3,
          librosRecibidosExternos: 5,
          vigenciaConvenio: 'Vigente (Ago 2027)',
          estadoOperativo: 'Activo con intercambio',
        },
        {
          institucion: 'Universidad Politécnica de Gómez Palacio (UPGP)',
          claveConvenio: 'CONV-2025-UPGP-02',
          responsable: 'Mtra. Claudia Elena Vázquez',
          contacto: 'cvazquez@upgp.edu.mx · (871) 729-1000',
          folioOficio: 'OF-PIB-2026-03',
          librosPrestadosExternos: 2,
          librosRecibidosExternos: 1,
          vigenciaConvenio: 'Vigente (Nov 2028)',
          estadoOperativo: 'Activo',
        },
      ];

      return {
        id: 'rep-convenios',
        code: 'REP-RED-06',
        title: 'Reporte de Convenios y Préstamos Interbibliotecarios',
        categoryBadge: 'Cooperación Institucional',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Red Universitaria ${currentYear}`,
        description: 'Monitoreo de alianzas interbibliotecarias, flujo de acervo compartido, titulares responsables y estado de vigencia legal.',
        kpis: [
          { label: 'AÑO DE CONVENIO', value: currentYear },
          { label: 'INSTITUCIONES EN RED', value: '3 instituciones' },
          { label: 'LIBROS PRESTADOS FUERA', value: '11 volúmenes' },
          { label: 'LIBROS RECIBIDOS', value: '10 volúmenes' },
          { label: 'CONVENIOS VIGENTES', value: '3 vigentes' },
          { label: 'TASA DE RETORNO', value: '100%', highlight: true },
        ],
        trendChartTitle: 'Flujo de Acervo Bibliográfico Compartido',
        trendChartSubtitle: 'Libros prestados a otras instituciones vs recibidos',
        trendSeries: [
          { label: 'UJED', value: 10, sublabel: '6 prestados / 4 recibidos' },
          { label: 'ITD', value: 8, sublabel: '3 prestados / 5 recibidos' },
          { label: 'UPGP', value: 3, sublabel: '2 prestados / 1 recibido' },
        ],
        rankingChartTitle: 'Distribución de Préstamos Externos',
        rankingChartSubtitle: 'Volúmenes enviados por institución universitaria aliada',
        rankingSeries: [
          { label: 'Universidad Juárez del Edo. de Dgo. (UJED)', value: 6, color: '#0284C7' },
          { label: 'Instituto Tecnológico de Durango (ITD)', value: 3, color: '#38BDF8' },
          { label: 'Univ. Politécnica de Gómez Palacio (UPGP)', value: 2, color: '#BAE6FD' },
        ],
        columns: [
          { key: 'institucion', header: 'INSTITUCIÓN EN CONVENIO', minWidth: '220px' },
          { key: 'claveConvenio', header: 'CLAVE CONVENIO', minWidth: '140px' },
          { key: 'responsable', header: 'RESPONSABLE TITULAR', minWidth: '180px' },
          { key: 'contacto', header: 'CORREO / TELÉFONO', minWidth: '220px' },
          { key: 'folioOficio', header: 'FOLIO OFICIO', minWidth: '115px' },
          { key: 'librosPrestadosExternos', header: 'PRESTADOS FUERA', minWidth: '130px', align: 'center' },
          { key: 'librosRecibidosExternos', header: 'RECIBIDOS', minWidth: '110px', align: 'center' },
          {
            key: 'vigenciaConvenio',
            header: 'VIGENCIA',
            minWidth: '140px',
            badge: () => ({
              text: 'Vigente',
              bg: '#DCFCE7',
              color: '#15803D',
            }),
          },
          { key: 'estadoOperativo', header: 'ESTADO OPERATIVO', minWidth: '150px' },
        ],
        rows,
        totalSummaryRow: {
          institucion: 'TOTALES',
          claveConvenio: '3 convenios formales',
          responsable: '—',
          contacto: '—',
          folioOficio: '3 oficios activos',
          librosPrestadosExternos: '11 prestados',
          librosRecibidosExternos: '10 recibidos',
          vigenciaConvenio: '100% legal',
          estadoOperativo: 'Red operando con normalidad',
        },
        defaultFileName: 'reporte_convenios_interbibliotecarios_ejecutivo.csv',
      };
    }

    // --------------------------------------------------------------------------
    // G. CÉDULA ESTADÍSTICA TRIMESTRAL / SEMESTRAL (FORMATO OFICIAL)
    // --------------------------------------------------------------------------
    case 'rep-cedula':
    default: {
      const rows = [
        {
          periodo: 'Septiembre 2026',
          titulosCatalogados: 34,
          volumenesTotales: 98,
          usuariosAlumnos: 124,
          usuariosDocentes: 18,
          usuariosExternos: 5,
          prestamosSala: 42,
          prestamosDomicilio: 85,
          renovaciones: 14,
          horasComputo: '142 hrs',
          horasSalasEstudio: '88 hrs',
        },
        {
          periodo: 'Octubre 2026',
          titulosCatalogados: 35,
          volumenesTotales: 101,
          usuariosAlumnos: 156,
          usuariosDocentes: 22,
          usuariosExternos: 8,
          prestamosSala: 58,
          prestamosDomicilio: 112,
          renovaciones: 20,
          horasComputo: '185 hrs',
          horasSalasEstudio: '104 hrs',
        },
        {
          periodo: 'Noviembre 2026',
          titulosCatalogados: 36,
          volumenesTotales: 103,
          usuariosAlumnos: 148,
          usuariosDocentes: 19,
          usuariosExternos: 6,
          prestamosSala: 51,
          prestamosDomicilio: 104,
          renovaciones: 16,
          horasComputo: '166 hrs',
          horasSalasEstudio: '96 hrs',
        },
      ];

      return {
        id: 'rep-cedula',
        code: 'CED-EST-OFICIAL',
        title: 'Cédula Estadística Semestral de Servicios Bibliotecarios',
        categoryBadge: 'Formato Oficial de Acreditación',
        periodLabel: (dateRange?.startDate && dateRange?.endDate) ? customPeriod : `Semestre Académico ${currentYear}-2`,
        description: 'Documento oficial para dirección académica y comités de acreditación: crecimiento de volúmenes, usuarios beneficiados, circulación sala vs domicilio y servicios de tecnología.',
        kpis: [
          { label: 'EJERCICIO', value: `${currentYear}-2` },
          { label: 'ACERVO FÍSICO', value: '103 volúmenes' },
          { label: 'TÍTULOS DISTINTOS', value: '36 títulos' },
          { label: 'USUARIOS BENEFICIADOS', value: '506 usuarios' },
          { label: 'PRÉSTAMOS TOTALES', value: '452 préstamos' },
          { label: 'RATIO DOMICILIO/SALA', value: '66.8%', highlight: true },
        ],
        trendChartTitle: 'Evolución Mensual de Usuarios y Circulación',
        trendChartSubtitle: 'Tendencia de afluencia general y préstamos solicitados',
        trendSeries: [
          { label: 'Sep', value: 147, sublabel: '127 préstamos · 147 usuarios' },
          { label: 'Oct', value: 186, sublabel: '170 préstamos · 186 usuarios' },
          { label: 'Nov', value: 173, sublabel: '155 préstamos · 173 usuarios' },
        ],
        rankingChartTitle: 'Composición de Usuarios Atendidos en el Periodo',
        rankingChartSubtitle: 'Distribución porcentual por comunidad universitaria',
        rankingSeries: [
          { label: 'Alumnos de Licenciatura e Ingeniería (84.6%)', value: 428, color: '#059669' },
          { label: 'Cuerpo Docente e Investigadores (11.6%)', value: 59, color: '#10B981' },
          { label: 'Investigadores / Usuarios Externos (3.8%)', value: 19, color: '#34D399' },
        ],
        columns: [
          { key: 'periodo', header: 'MES / PERIODO', minWidth: '130px' },
          { key: 'titulosCatalogados', header: 'TÍTULOS', minWidth: '90px', align: 'center' },
          { key: 'volumenesTotales', header: 'VOLÚMENES', minWidth: '100px', align: 'center' },
          { key: 'usuariosAlumnos', header: 'ALUMNOS', minWidth: '95px', align: 'center' },
          { key: 'usuariosDocentes', header: 'DOCENTES', minWidth: '95px', align: 'center' },
          { key: 'usuariosExternos', header: 'EXTERNOS', minWidth: '95px', align: 'center' },
          { key: 'prestamosSala', header: 'P. EN SALA', minWidth: '100px', align: 'center' },
          { key: 'prestamosDomicilio', header: 'P. DOMICILIO', minWidth: '110px', align: 'center' },
          { key: 'renovaciones', header: 'RENOVACIONES', minWidth: '110px', align: 'center' },
          { key: 'horasComputo', header: 'HRS CÓMPUTO', minWidth: '115px', align: 'center' },
          { key: 'horasSalasEstudio', header: 'HRS SALAS', minWidth: '115px', align: 'center' },
        ],
        rows,
        totalSummaryRow: {
          periodo: 'TOTAL SEMESTRAL',
          titulosCatalogados: '36 títulos',
          volumenesTotales: '103 vol.',
          usuariosAlumnos: '428 alum.',
          usuariosDocentes: '59 doc.',
          usuariosExternos: '19 ext.',
          prestamosSala: '151 sala',
          prestamosDomicilio: '301 dom.',
          renovaciones: '50 renov.',
          horasComputo: '493 hrs',
          horasSalasEstudio: '288 hrs',
        },
        defaultFileName: 'cedula_estadistica_oficial_semestral.csv',
      };
    }
  }
}

/**
 * Genera un archivo CSV profesional y enriquecido con metadatos,
 * KPIs ejecutivos y filas tabulares completas.
 */
export function exportReportTemplateToCsv(data: ReportTemplateData): void {
  const lines: string[] = [];

  // 1. Encabezado institucional
  lines.push(`"UNIVERSIDAD POLITÉCNICA DE DURANGO — SISTEMA DE ACERVO BIBLIOTECARIO"`);
  lines.push(`"INFORME OFICIAL: ${data.title.toUpperCase()}"`);
  lines.push(`"Código: ${data.code} | Categoría: ${data.categoryBadge} | Periodo: ${data.periodLabel}"`);
  lines.push(`"Fecha de Emisión: ${new Date().toLocaleString('es-MX')}"`);
  lines.push('');

  // 2. Banner de Indicadores Clave (KPIs)
  lines.push('"=== RESUMEN DE INDICADORES CLAVE (KPIS) ==="');
  const kpiHeaders = data.kpis.map((k) => `"${k.label}"`).join(',');
  const kpiValues = data.kpis.map((k) => `"${k.value}"`).join(',');
  lines.push(kpiHeaders);
  lines.push(kpiValues);
  lines.push('');

  // 3. Tabla de Datos
  lines.push('"=== TABLA DETALLADA DE REGISTROS ==="');
  const headers = data.columns.map((col) => `"${col.header}"`).join(',');
  lines.push(headers);

  data.rows.forEach((row) => {
    const rowValues = data.columns.map((col) => {
      const val = row[col.key] ?? '';
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    lines.push(rowValues.join(','));
  });

  // 4. Fila de Totales
  if (data.totalSummaryRow) {
    const summaryValues = data.columns.map((col) => {
      const val = data.totalSummaryRow?.[col.key] ?? '';
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    lines.push(summaryValues.join(','));
  }

  // Descarga
  const csvContent = '\uFEFF' + lines.join('\n'); // Con BOM UTF-8 para Excel
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', data.defaultFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exporta el reporte como un archivo nativo de Microsoft Excel (.xlsx),
 * con cálculo dinámico de anchos de columna para evitar textos amontonados
 * y sin advertencias de compatibilidad.
 */
export function exportReportTemplateToExcelXlsx(data: ReportTemplateData): void {
  const aoa: any[][] = [];

  // 1. Encabezado institucional
  aoa.push(['UNIVERSIDAD POLITÉCNICA DE DURANGO — SISTEMA DE ACERVO BIBLIOTECARIO']);
  aoa.push([`INFORME OFICIAL: ${data.title.toUpperCase()}`]);
  aoa.push([`Código: ${data.code}`, `Categoría: ${data.categoryBadge}`, `Periodo: ${data.periodLabel}`]);
  aoa.push([`Fecha y hora de emisión: ${new Date().toLocaleString('es-MX')}`]);
  aoa.push([]); // Fila vacía

  // 2. Banner de Indicadores Clave (KPIs)
  aoa.push(['=== RESUMEN DE INDICADORES CLAVE (KPIS) ===']);
  aoa.push(data.kpis.map((k) => k.label));
  aoa.push(data.kpis.map((k) => k.value));
  aoa.push([]); // Fila vacía

  // 3. Tabla detallada de registros
  aoa.push(['=== TABLA DETALLADA DE REGISTROS ===']);
  aoa.push(data.columns.map((c) => c.header));

  data.rows.forEach((row) => {
    aoa.push(data.columns.map((c) => row[c.key] ?? '—'));
  });

  // 4. Fila de Totales / Resumen
  if (data.totalSummaryRow) {
    aoa.push(data.columns.map((c) => data.totalSummaryRow?.[c.key] ?? '—'));
  }

  // 5. Convertir a Worksheet de SheetJS
  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // 6. Cálculo dinámico de ancho de columnas (Auto-width)
  const maxCols = Math.max(data.columns.length, data.kpis.length, 6);
  const colWidths: { wch: number }[] = [];

  for (let c = 0; c < maxCols; c++) {
    let maxLen = 14;
    for (let r = 0; r < aoa.length; r++) {
      const cell = aoa[r]?.[c];
      if (cell !== undefined && cell !== null) {
        if (r < 2 && c === 0) continue;
        if (String(cell).startsWith('===') && c === 0) continue;
        const len = String(cell).length;
        if (len > maxLen) {
          maxLen = len;
        }
      }
    }
    colWidths.push({ wch: Math.min(Math.max(maxLen + 3, 14), 50) });
  }

  ws['!cols'] = colWidths;

  // 7. Crear Workbook y descargar archivo .xlsx nativo
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Informe Ejecutivo');

  const xlsxFileName = data.defaultFileName.replace(/\.csv$/, '.xlsx');
  XLSX.writeFile(wb, xlsxFileName, { bookType: 'xlsx' });
}
