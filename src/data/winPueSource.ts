export const WIN_SOURCE = {
  "win_1_1": {
    "expected": "Objetivos esperados:\n•\tEl saludo debe contener el nombre del asesor, mencionar que que es representante de Win.\n•\tPersonalizar con el nombre o apellido del cliente \nEjemplo:\nBuenas tardes le saluda la srta:….de WIN tengo el gusto de hablar con el sr…..  Mucho gusto sr…... mire Nos comunicamos porque hemos tenido una interacción a través de WhatsApp y: ¿Sabemos que está interesado en nuestro servicio de internet? Para validar la cobertura Me confirma su dirección por favor …\nOUT\nMe permite continuar con la llamada( solicitar permisompara continuar con la llamada)\n",
    "failures": "No se presenta con su nombre\nNo Indica nombre de la empresa Win\nNo personaliza la llamada\nNo solicita consentimiento (Ventas OUT - SOCIOS)\nAtiende despues de los 5 segundos (InHouse)",
    "exclusion": "No se especifica exclusión."
  },
  "win_1_2": {
    "expected": "Objetivos esperados:\n•\tValidar y Confirmar al cliente que tiene cobertura.\n•\tCorroborar que la instalación no sea para centro comercial , galerías (no puerta a calle) o un lan center o cabina de internet.\n      Ejemplo:\n•\tPara poder continuar primero debemos validar que puedas contar con el servicio en tu zona, bríndame tu dirección, ¿vives en casa, edificio o condominio? \n\nPara casas, consultas obligatorias:\n•\tDirección y referencias del domicilio, \n•\tIndependización por pisos o interiores. Si la respuesta es sí, consulta por el Ambiente donde reside tu cliente.\n\nPara edificios, consulta:\n•\tDirección y referencias del domicilio.\n•\tTipo de edificio: Departamento o Condominio.\n•\tNombre del edificio.\n•\tCantidad de torres en el edificio.\n•\tPermiso para instalar vía cableado aéreo o ductería, (distritos de alto valor y edificio no habilitado)\n•\tPuedes consultar en el siguiente link sobre el estado del edificio: bit.ly/45iF24p\n",
    "failures": "No valida direccion ó No confirma cobertura\nNo descarta predio (casa, condominio, edificio)\nNo confirma documento de cliente (DNI)\nNo valida instalación por tendido aéreo\nNo valida inquilino y/o propietario (solo en venta)",
    "exclusion": "No se especifica exclusión."
  },
  "win_1_3": {
    "expected": "Objetivos esperados:\n\n•\tEl asesor debe demostrar interés en concretar la venta; buen tono de voz y/o en sus acciones por concretar la transacción.\n•\tDebe ser espontáneo en su manera de expresarse (no debe ser robotizado, tampoco seguir un speech).\n•\tSu Lenguaje debe ser sencillo, simple y ligero (no tecnicismo).\n•\tEl asesor debe mencionar como mínimo 1 reconocimiento de la empresa win. \n",
    "failures": "Reconocimientos y satisfacción de la empresa Win \nTono de voz lineal / Robotizado / Desganado\nTecnicismo / muletillas \nVocalización incorrecta",
    "exclusion": "Solo para cliente exploratorio"
  },
  "win_2_1": {
    "expected": " Objetivos esperados:\n\n• Realizar preguntas para identificar la necesidad y conocer al cliente. (Mínimo 2 preguntas)\n• Mantener comunicación fluida (no sea cuestionamiento)\n Indentifica tipo de cliente \n\nEjemplo:\n\nHoy en día, \n\n¿Cuál es el uso principal de su internet en casa? (trabajo, estudios , entrenamiento)\n\n¿Cuántos dispositivos sueles conectar en el internet que tienes?\n\n¿Qué problemas presentas actualmente con tu servicio de internet?\n\n¿En que parte de tu casa no te llega el internet?\n\n¿Cuando todos en casa se conectan al mismo tiempo, ¿Quién es el primero que empieza a renegar porque se le cortó el internet? \n\n\nPara internet, consulta por:\n● Plan contratado, beneficios y tarifa que mantiene con operador actual.\n● Cantidad de dispositivos a conectar.\n● Cantidad de ambientes en el domicilio.\n● Cantidad de personas que viven en el domicilio.\n● Actividades frecuentes del cliente y/o familia con consumo del Internet.\n\nPara gamer, consulta por:\n● Tipo y nombre de los juegos. (Dota 2, Fortnite, Free Fire, League of Legends, Valorant y Call of Duty).\n● Dispositivos en los que juega y tiempo del día destinado al juego.\n\nPara mesh, consulta por:\n● Cantidad de pisos y ambientes en el domicilio.\n● Espacios donde no cuenta con una señal wifi fluida.\n\nPara tv digital, consulta por:\n● Capacidad de descargar aplicativos desde Play Store en TV. En caso las características de la TV no apliquen con las condiciones de TV Digital, ofrecer WIN Box.\n● Apps de Streaming que consume la familia. Si el cliente consume varias Apps de Streaming, no necesariamente quiere decir que tiene un Smart TV.\n● Tipo de TV y marca. En caso las características de la TV no apliquen con las condiciones de TV.\n\nDigital, ofrecer WIN Box. Indagar si tiene puerto HDMI.\n● Cantidad de TVs en casa.\n● Canales de mayor consumo (nacionales o internacionales) y tipo de contenido favorito de la familia\n● Cantidad de usuarios que consumen Apps de Streaming.\n\nPara winbox, consulta por:\n● Tipo de tv y marca.\n● Punto de Acceso HDMI en algún tv. En caso el cliente diga que no, valida la posibilidad de adquirir un convertidor HDMI antes de cerrar la venta. HDMI libre para el winbox.\n● Cantidad de TVs en casa y uso de dispositivos similares.\n● Cantidad de usuarios que consumen Apps de Streaming.\n\nPara fonowin, consulta por:\n● Personas que se encuentran en casa siempre.\n● Personas que requieren cuidados en casa (adultos mayores y niños).\n● Personas con negocio o acostumbradas al uso de teléfono fijo en casa.\n● Personas con teléfono prepago. Así, podrás proponer un plan económico de llamadas.\n",
    "failures": "No sondea en absoluto\nSondea incompleto (realiza 1 pregunta)\nNo sondea uso de internet\nSondeo incompleto/nulo para portabilidad\nsondeo incompleto/nulo por compatibilidad tv\nIdentifica tipo de cliente\nNo iidentfica dolencia del cliente ",
    "exclusion": "No aplica para cliente reactivo que no permite continuar"
  },
  "win_2_2": {
    "expected": "Objetivos esperados:\n•El asesor debe prestar atención y comprender lo que menciona el cliente durante toda la gestión, evitando realizar re preguntas si cliente fue claro.\n•Evitar interrumpir al cliente de manera abrupta.   \n•Evitar distracción.\n",
    "failures": "Hace repreguntas\nNo esta atento en la llamda \nInterrumpe a cliente (abruptamente)",
    "exclusion": "No se especifica exclusión."
  },
  "win_2_3": {
    "expected": "1. Conoce bien a tu cliente\n2. Comprende como usara su servicio.\n3. Centrate en los beneficios que al cliente le interese (no le des un monologo del producto)\n4. Realiza un ejemplo sobre como sera  su experiencia con los productos Winner personalizando el ejemplo. (No des uno generico)\nIndependiente: vive solo, Estudiante, Trabaja en casa,viaja.\n\n\nImagina:\n\nLo peor que puede pasar es que se te caiga el internet justo en medio de un examen virtual. Con WIN aseguras una conexión blindada para que tus hijos solo se preocupen por estudiar y no por el router. Si hacemos el contrato ahora, te incluyo el beneficio de instalación gratis. ¿verdad?\n\nTener cámaras de seguridad no sirve de nada si, cuando quieres ver qué pasa en tu casa, la imagen se queda congelada. Con la estabilidad de WIN, el monitoreo es en tiempo real y en alta definición; vigilas tu hogar sin retrasos. Aseguremos tu tranquilidad hoy mismo. ¿Te registro con este número de celular verdad?\n\nDe nada sirve tener mil megas si tu equipo es antiguo. Nosotros instalamos equipos de última tecnología como el WIFI 6 que distribuyen la señal de forma eficiente por toda tu casa, eliminando esos 'puntos muertos' donde nunca hay señal. Te voy a enviar al técnico con el mejor equipo disponible. ¿Qué horario te queda mejor para recibirlo en la mañana o en la tarde?\n\n",
    "failures": "No hace vivir la experiencia\nDenota desinterés por dolencia del cliente / No aborda dolencia",
    "exclusion": "No aplica en los casos donde se identfico que es un cliente Decidido."
  },
  "win_2_4": {
    "expected": "Objetivos esperados:\n\n• Según lo sondeado con el cliente ofrecer el plan que mejor se le acomode; recordar empezar con un plan mayor para poder negociar.\n• Ofrecimiento de servicio paquetizado (persuadir a un plan mayor según necesidad del cliente).\n• Evitar el ofrecimiento en abanico/paralelo.\n\nEjemplo:\n- (Nombre del cliente) por lo que hemos conversado el mejor plan que tengo para ti es …. (resaltando la velocidad y el precio).\n- De acuerdo a tu necesidad el plan que puedo recomendarte es........\n",
    "failures": "Ofrece planes en abanico\nOfrece planes sin sondear\nOfrece plan más económico\nNo ofrece Kit Wi-Fi\nNo ofrece Cableado Mesh",
    "exclusion": "No aplica si no hay respuesta del cliente por el chat o corte de llamada."
  },
  "win_3_1": {
    "expected": "Objetivos esperados:\n\n\n•  Si el cliente no acepta a la primera, está bien, indaga y descubre la objeción del cliente y manéjala. Recuerda que, para tener un buen manejo de objeciones, debemos preguntar y escuchar lo que el cliente nos indica.\n\n• Utilizar argumentos precisos y verdaderos para revertir la objeción, aclarar dudas y/o consultas que el cliente pueda presentar, buscando convencer para concretar la Venta.\n\n• Se considera mínimo 2 rebates para cumplir con el atributo.   \n\n\nEjemplos:\n\nEstá muy caro /Es más caro que mi operador actual\nEntiendo que el precio sea un punto importante, pero comparemos el servicio: lo que tiene ahora es una conexión compartida que falla cuando todos se conectan. WIN le da fibra pura y simétrica. Si divide la diferencia de precio entre los días del mes, son céntimos a cambio de no volver a sufrir caídas en sus reuniones o clases. \n\nTengo que consultarlo con mi esposo/a\nMe parece excelente, las decisiones familiares son importantes. Sin embargo, ¿quién de los dos es el que más sufre con el internet lento en casa? Si es él/ella, le aseguro que le va a encantar la idea de que ya no se le cuelguen los videos o las llamadas. ¿Qué le parece si le damos la sorpresa de que el técnico viene mañana mismo?\n\nLlámame después\nSi te llamo después, lo más probable es que se llenen los cupos de instalación para esta semana y sigas renegando con tu internet actual. Cerremos esto en 2 minutos y mañana mismo tienes el problema resuelto. ¿Cuál es tu número de DNI?\n\nLo voy a pensar\nClaro,. Solo tenga en cuenta que mientras lo piensa, seguirá pagando por un servicio que no le satisface y perdiendo tiempo con cortes de señal. ¿Por qué esperar a que el internet se caiga otra vez para tomar la decisión? ¿Entonces me estaba diciendo que la instalación es en la tarde verdad?\n\n\n\n\n",
    "failures": "No maneja objecion\nSolo hace 1 rebate (Mínimo 2)",
    "exclusion": "No se especifica exclusión."
  },
  "win_3_2": {
    "expected": "Objetivos esperados:\n* Aplica para Venta/No venta.\n• Validar de manera proactiva que el cliente ha comprendido la información entregada.\n• Esta pregunta puede hacerlo en el transcurso de la llamada. Se considera como mínimo 1 sola vez.",
    "failures": "No realiza pregunta de aseguramiento\nNo realiza pregunta de aseguramiento - Cierre final\nNo realiza pregunta de aseguramiento - Después de brindar caract.",
    "exclusion": "No aplica si el cliente proactivamente indica que todo está claro."
  },
  "win_3_3": {
    "expected": "  Objetivos esperados:\n•\tLa información debe ser completa y correcta en una venta y en una no venta debe ser correcta. \n•\tComplementar los beneficios, características y condiciones comerciales de los planes/servicios que el cliente acepta.\n•\tSe penaliza si el asesor asegura fecha y rango horario de instalación.\n      \n Resumen obligatorio:\n•\tCosto de plan.\n•\tVelocidad del plan, carga y descarga.\n•\tCosto de instalación.\n•\tPlazo de instalación, etc.\n•\tObligatorio mínimo 2 características de SVA en no venta.\n•\tCaracterísticas de servicio de tv (Cantidad de tv a registrar, simultáneos, televisión por app y sin decos).\n",
    "failures": "No informa características de Internet \nInformacion incorrecta de características de internet\nInformacion incorrecta o incompleta de  SVA\nNo informa costo de instalación\nCiclo de facturación incompleto/incorrecto\nNo informa lugares y forma de pago\nNo informa app mi win \nNo realiza disclaimer (resumen del plan contratado antes de la grabacion).",
    "exclusion": "Caracteristicas completas solo en una venta Minimo 2 "
  },
  "win_4_1": {
    "expected": "Objetivos esperados:\n• Asumir la venta con preguntas cerradas, Si se realizan preguntas abiertas los clientes tienden a dar negativas.\nEvita las preguntas ¿Qué opina? ¿Está de acuerdo? \n\nEjemplo:\n\nPerfecto, ya vimos que el plan de … Mbps es ideal para lo que necesitas en casa. ¿Prefieres que el equipo técnico pase a instalarlo mañana por la mañana o mejor por la tarde?\n\nVamos a darle a tu hogar la cobertura que se merece para que todos naveguen a toda velocidad al mismo tiempo\n\nCada día que pasa sin fibra pura es un día de estrés por el internet lento. Si cerramos el registro ahora, para mañana a esta hora ya estarás navegando a máxima velocidad. ¿Me dictas tu DNI?",
    "failures": "No dirige al cierre\nAplica preguntas abiertas\nCondiciona venta",
    "exclusion": "No aplica si cliente corta la llamada"
  },
  "win_4_2": {
    "expected": "\nObjetivos esperados:\n\n• Validar los datos personales del cliente antes de realizar la lectura del contrato. \n\n•  Validar si el domicilio cuenta con placa o un recibo de servicios en físico (luz, agua ó gas) \n\n• DNI / CE vigente (solicitar fecha de caducidad o residencia) obligatorio\n",
    "failures": "No valida fecha de caducidad del DNI\nNo valida placa del domicilio\nNo indica tener los recibos de servicio en físico (Gas, Agua y Luz)\nValida titularidad del número móvil\nNo valida correo electronico ",
    "exclusion": "Sólo aplica para Ventas"
  },
  "win_4_3": {
    "expected": "Objetivos esperados:\n• El asesor debe registrar de manera correcta en sistema Inconcert, sea Venta o No Venta según el arbol de tipificaciones.",
    "failures": "Registro incorrecto\nNo registra en absoluto",
    "exclusion": "No se especifica exclusión."
  },
  "win_4_4": {
    "expected": "Objetivos esperados: Registrar los datos solicitados para realizar la portabilidad:\n\n•\tTipo de Documento:\n•\tN° de documento: \n•\tN° a portar: (incluir el código de la ciudad Piura 073, Lambayeque 074, La Libertad 044, Ancash 043, Lima 01)\n•\tOperador cedente: (Movistar / Claro / Entel)\n•\tTipo de línea: Prepago / Pospago\n•\tValidación de comentarios de CRM.\n",
    "failures": "Registro correcto de portabilidad (WinForce / CRM Experiencia)\nAsesor registra incorrectamente datos del cliente (Dirección; Correo, Teléfono etc.)",
    "exclusion": "Sólo aplica para Ventas, siempre y cuando se realice una portabilidad."
  },
  "win_4_5": {
    "expected": "Objetivos esperados:\n\n• Se despide del Cliente como un \"amigo cercano\".\n• Siempre que se despida o tenga un cierre la llamada, no será penalizado el ejecutivo.\n\nEjemplo:\nGracias, buenas tardes/feliz tarde.\n\n",
    "failures": "No se despide",
    "exclusion": "No aplica si el cliente corta la llamada antes que el ejecutivo logre invitarlo para calificar su atención."
  },
  "win_contract": {
    "expected": "Objetivos esperados:\n• Menciona script regulatorio de forma completa y literal, según documentación específica. Se tomará en cuenta lo solicitado por el área legal.",
    "failures": "",
    "exclusion": "Sólo aplica para Ventas.\nSe considera para las Ventas que son transferidas al área de Validaciones."
  }
} as const;
