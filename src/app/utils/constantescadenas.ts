export class ConstantesCadenas {
  static ESTADO_NO_VIGENTE: string = "0";
  static ESTADO_VIGENTE: string = "1";
  static ESTADO_TODOS: string = "2";
  static SELECCIONAR_ADUANA: string = "-1";
  static SELECCIONAR_UNIDAD_DESPACHO: string = "-1";
  static INDICADOR_SORTEO_FUNCIONARIO_POR_ZONA_ACTIVO: string = "1";
  static INDICADOR_SORTEO_FUNCIONARIO_POR_ZONA_INACTIVO: string = "0";
  static SELECCIONAR_GRUPO_FUNCIONARIO: string = "-1";
  static TITULO_AGREGAR_UNIDAD_DESPACHO: string = "AGREGAR UNIDAD DE DESPACHO";
  static TITULO_MODIFICAR_UNIDAD_DESPACHO: string = "MODIFICAR UNIDAD DE DESPACHO";
  static TITULO_AGREGAR_ZONA: string = "AGREGAR ZONA DE RECONOCIMIENTO";
  static TITULO_MODIFICAR_ZONA: string = "MODIFICAR ZONA DE RECONOCIMIENTO";
  static TITULO_AGREGAR_TURNO: string = "AGREGAR TURNO DE RECONOCIMIENTO";
  static TITULO_MODIFICAR_TURNO: string = "MODIFICAR TURNO DE RECONOCIMIENTO";
  static TITULO_HISTORICO_PONDERACION_CRITERIOS: string = "REGISTRO HISTÓRICO EN LAS PONDERACIONES DE CRITERIOS";
  static TITULO_SELECCION_FUNCIONARIOS: string = "FUNCIONARIOS";
  static TITULO_FUNCIONARIO_REGISTRADO_TURNO: string = "FUNCIONARIOS REGISTRADOS EN EL TURNO {0} DEL {1}";
  static TITULO_FUNCIONARIO_REGISTRADO_TURNO_SIN_HORARIO: string = "FUNCIONARIOS REGISTRADOS EL {0}";
  static TITULO_ASIGNACION_FUNCIONARIO_A_ZONA: string = "ASIGNACIÓN DE FUNCIONARIOS A ZONA";
  static TITULO_FUNCIONARIO_ASIGNADO_A_ZONA: string = "FUNCIONARIOS ASIGNADOS A ZONA";
  static MENSAJE_ERROR: string = "error";
  static MENSAJE_EXITOSO: string = "success";
  static MENSAJE_ADVERTENCIA: string = "info";
  static FORMATO_FECHA_DIA_MES_ANNIO: string = "dd/MM/yyyy";
  static FORMATO_FECHA_DIA_MES_ANNIO_MOMENT: string = "DD/MM/YYYY";
  static FORMATO_FECHA_DIA_MES_ANNIO_MOMENT_DASH: string = "DD-MM-YYYY";
  static FORMATO_FECHA_DIA_MES_ANNIO_HORA_MINUTO_SEGUNDO: string = "DD/MM/YYYY HH:mm:ss";
  static EXPRESION_REGULAR_DIA_MES_ANNIO: string = "^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$";
  static EXPRESION_REGULAR_HORA_MINUTO: string = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
  static CODIGO_ERROR_SERVICIO: string = "422";
  static CODIGO_ERROR_SOLICITUD_INCORRECTA: string = "400";
  static CODIGO_EXITO_SERVICIO: string = "001";
  static CODIGO_NO_ENCONTRADO: string = "999";
  static CODIGO_ERROR_NO_ENCONTRADO_SERVICIO: string = "404";
  static CODIGO_ERROR_SERVICIO_GRABAR: string = "500";
  static FORMATO_UNIDAD_TIEMPO_DIAS: string = "days";
  static FORMATO_UNIDAD_TIEMPO_MESES: string = "months";
  static FORMATO_UNIDAD_TIEMPO_ANNIOS: string = "years";
  static FORMATO_UNIDAD_TIEMPO_HORAS: string = "hours";
  static FORMATO_UNIDAD_TIEMPO_MINUTOS: string = "minutes";
  static FORMATO_UNIDAD_TIEMPO_SEGUNDOS: string = "seconds";
  static TIPO_CONSULTA_FUNCIONARIOS_REGISTRO: string = "R";
  static TIPO_CONSULTA_FUNCIONARIOS_CONSULTA: string = "C";
  static TIPO_SORTEO_INTERVALOS: string = "0";
  static TIPO_SORTEO_HORARIOS_FIJOS: string = "1";
  static PAGINA: string = "";

  static SELECCION_FUNCIONARIO: string = "-1";
  static TIPO_PARAMETRO_REST_REQUEST_PARAM: string = "1";
  static TIPO_PARAMETRO_REST_REQUEST_HEADER: string = "2";
  static TIPO_PARAMETRO_REST_REQUEST_BODY: string = "3";
  static TIPO_PARAMETRO_REST_PATH_VARIABLE: string = "4";
  static METHOD_HTTP_GET: string = "GET";
  static METHOD_HTTP_POST: string = "POST";
  static METHOD_HTTP_PUT: string = "PUT";
  static TIPO_OPERACION_ASIGNACION: string = "A";
  static TIPO_OPERACION_REASIGNACION: string = "R";
  static TIPO_SERVICIO_VALIDACION: string = "V";
  static TIPO_SERVICIO_GRABACION: string = "G";

  static ESTADO_ACTIVO: string = "1";
  static ESTADO_INACTIVO: string = "0";
  static TIPO_PARAMETRO_REPORTE_ASIGNACION_BLOQUE = "1";
  static TIPO_CONSULTA_REPORTE = "2";
  static NOMBRE_REPORTE_PAQUETES_FORMADOS_PDF = "rptReportePaquetes.pdf";
  static NOMBRE_REPORTE_PAQUETES_FORMADOS_XLS = "rptReportePaquetes.xls";
  static NOMBRE_REPORTE_CONSULTA_CATALOGO_FUNCIONARIO_PDF = "rptConsultaCatalogoFuncionario.pdf";
  static NOMBRE_REPORTE_CONSULTA_CATALOGO_FUNCIONARIO_XLS = "rptConsultaCatalogoFuncionario.xls";
  static NOMBRE_REPORTE_CONSULTA_SORTEO_ASIGNACION_PDF = "rptSorteoAsignacion.pdf";
  static NOMBRE_REPORTE_CONSULTA_SORTEO_ASIGNACION_XLS = "rptSorteoAsignacion.xls";
  static NOMBRE_REPORTE_ASIGNACION_BLOQUE_PAQUETES_PDF = "rptAsignacionBloquePaquetes.pdf";
  static NOMBRE_REPORTE_ASIGNACION_BLOQUE_PAQUETES_XLS = "rptAsignacionBloquePaquetes.xls";
  static TIPO_MIME_PDF = "application/pdf";
  static TIPO_MIME_EXCEL = "application/vnd.ms-excel";
  static TIPO_MIME_ARCHIVO = "application/octet-stream";
  static TIPO_MIME_CSV = "text/csv";
  static TIPO_MIME_XML = "application/xml";
  static TIPO_REPORTE_XLS = "xls";
  static TIPO_REPORTE_PDF = "pdf";
  static ROLES_DEFAULT_NORMATIVO = "ROL-DEFAULT-NORMATIVO";
  static ROLES_JEFE_SUPERVISOR = "ADUANA-JEFE-ADMTEMPORAL-REEX,ADUANA-JEFE-ADMTEMPORAL-PA,ADUANA-JEFE-DEPOSITO,ADUANA-JEFE-IMPORTACION,ADUANA-JEFE-MUA,ADUANA-JEFE-OFICIALES,ADUANA-JEFE-PROVINCIAS,ADUANA-OFICIAL-SUPERVISOR,SDA-EER-RL_JEFSUP_OP,ADU-JEF-EXP,SDA-MAN-JEF";
  static ANFORA_CANAL_ROJO_SALIDA = "06";
  static FILTRO_REGISTRO: string ="REGISTRO"; //cchavezt ATENCION BUGS
  static FILTRO_REGISTROAP: string ="REGISTROAP"; //cchavezt ATENCION BUGS
  static REGIMEN_EXPORTACION = "40";
  static REGIMEN_MANIFIESTO = "01";
  static REGIMEN_EER = "28";

}