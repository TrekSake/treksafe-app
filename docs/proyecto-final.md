Universidad de Lima

Facultad de Ingeniería

Carrera de Ingeniería de Sistemas

![](media/image35.png){width="1.3694444444444445in"
height="1.3495002187226597in"}

**CURSO DE INGENIERÍA DE SOFTWARE 1**

**PROYECTO FINAL**

**TREK SAFE**

**Lopez Bernuy, Marko Antonio**

**Código: 20234683**

**Ariana Belen Blanco Quintana**

**20234118**

**Manuel Rodrigo Llaury Murga**

**20231636**

**Pedro Leonardo Ormeño Moquillaza**

**20234924**

**Yahel Jair Cordova Amez**

**20230836**

**Docente:**

Irey Nuñez, Jorge Luis

Lima -- Perú 2026

**ÍNDICE**

[**1. Capítulo 1: Visión General del Proyecto
7**](#capítulo-1-visión-general-del-proyecto)

> [a. Nombre del producto 7](#nombre-del-producto)
>
> [b. Propósito 7](#propósito)
>
> [c. Alcance 7](#alcance)
>
> [d. Supuestos y restricciones 8](#supuestos-y-restricciones)
>
> [e. Roles y Responsabilidades 9](#roles-y-responsabilidades)
>
> [f. Contribución a los Objetivos de Desarrollo Sostenible (ODS)
> 10](#contribución-a-los-objetivos-de-desarrollo-sostenible-ods)

[**2. Capítulo 2: Ideación del Producto
11**](#capítulo-2-ideación-del-producto)

> [a. Empathy Map 11](#empathy-map)
>
> [b. Product Vision Board 13](#product-vision-board)
>
> [c. Product Road Map 14](#product-road-map)
>
> [d. Definition of Ready para las historias de usuario
> 14](#definition-of-ready-para-las-historias-de-usuario)
>
> [e. Definition of Done para los incrementos
> 15](#definition-of-done-para-los-incrementos)

[**3. Capítulo 3: Release 01 (8 semanas)
17**](#capítulo-3-release-01-8-semanas)

> [a. Plan de Release 01 (duración: 08 semanas)
> 17](#plan-de-release-01-duración-08-semanas)
>
> [b. Para cada Sprint, se debe definir:
> 17](#para-cada-sprint-se-debe-definir)
>
> [i. ¿Por qué es importante el Sprint? Objetivo del Sprint
> 17](#_heading=h.mfai99uvh04d)
>
> [ii. ¿Qué se trabajará durante el Sprint? Historias de usuario con sus
> criterios de aceptación
> 17](#qué-se-trabajará-durante-el-sprint-historias-de-usuario-con-sus-criterios-de-aceptación)
>
> [iii. ¿Cómo se organizará el equipo para lograr el incremento? Tareas
> necesarias para implementar las historias de usuario
> 17](#cómo-se-organizará-el-equipo-para-lograr-el-incremento-tareas-necesarias-para-implementar-las-historias-de-usuario)
>
> [iv. Mockups de las pantallas 17](#mockups-de-las-pantallas)

[**4. Capítulo 4: Release 02 (8 semanas)
18**](#capítulo-4-release-02-8-semanas)

> [a. Plan de Release 02 (duración: 08 semanas)
> 18](#plan-de-release-02-duración-08-semanas)
>
> [b. Para cada Sprint, se debe definir: 18](#_heading=h.h1jtwm468fps)
>
> [i. ¿Por qué es importante el Sprint? Objetivo del Sprint
> 18](#_heading=h.jptcka2e9xyf)
>
> [ii. ¿Qué se trabajará durante el Sprint? Historias de usuario con sus
> criterios de aceptación 18](#_heading=h.fw798vveizzp)
>
> [iii. ¿Cómo se organizará el equipo para lograr el incremento? Tareas
> necesarias para implementar las historias de usuario
> 18](#_heading=h.957wk1mitpsa)
>
> [iv. Mockups de las pantallas 18](#_heading=h.rjzqz4rnmwl)

[**5. Capítulo 5: Modelos UML 19**](#capítulo-5-modelos-uml)

> [a. Diagrama de caso de uso de negocio del producto de software
> 19](#_heading=h.eomaw4nzcn4a)
>
> [b. Diagramas de flujo de los casos de uso de negocio del producto de
> software
> 19](#diagramas-de-flujo-de-los-casos-de-uso-de-negocio-del-producto-de-software)
>
> [c. Por cada caso de uso de negocio, se debe realizar:
> 19](#por-cada-caso-de-uso-de-negocio-se-debe-realizar)
>
> [i. Diagrama de caso de uso de negocio 19](#_heading=h.4a6q783acqah)
>
> [ii. Diagrama de caso de uso de sistema
> 19](#diagrama-de-caso-de-uso-de-sistema)
>
> [iii. Diagramas de secuencia 19](#diagramas-de-secuencia)
>
> [iv. Diagrama de Clases 19](#diagrama-de-clases)
>
> [d. Diagrama de base de datos del producto de software (relacional o
> no relacional)
> 19](#diagrama-de-base-de-datos-del-producto-de-software-relacional-o-no-relacional)
>
> [e. Diagrama de componentes del producto de software
> 19](#diagrama-de-componentes-del-producto-de-software)
>
> [f. Diagrama de despliegue del producto de software
> 19](#diagrama-de-despliegue-del-producto-de-software)

[**6. Referencias Bibliográficas 19**](#referencias-bibliográficas)

[**7. Coevaluación del Grupo 19**](#coevaluación-del-grupo)

[**8. Anexos 19**](#anexos)

> [a. Anexo A: Product Backlog e Historias de Usuario (Archivo Excel)
> 19](#anexo-a-product-backlog-e-historias-de-usuario-archivo-excel)
>
> [b. Anexo B: Archivos Fuente de Modelos UML
> 19](#anexo-b-archivos-fuente-de-modelos-uml)
>
> [c. Anexo C: Declaración sobre uso de IA
> 19](#anexo-c-declaración-sobre-uso-de-ia)
>
> [d. Anexo D: Evidencias Fotográficas del uso de IA
> 23](#anexo-d-evidencias-fotográficas-del-uso-de-ia)

**ÍNDICE DE FIGURAS**

[Figura 1 - Empathy Map del Senderista
12](#figura-1---empathy-map-del-senderista)

[Figura 2 - Empathy Map del Rescatista
13](#figura-2---empathy-map-del-rescatista)

[Figura 3 - Product Vision Board 14](#figura-3---product-vision-board)

[Figura 4 - Product Road Map 15](#figura-4---product-road-map)

[Figura 5. Pantalla de inicio de sesión
20](#figura-5.-pantalla-de-inicio-de-sesión)

[Figura 6. Pantalla de registro de senderista
21](#figura-6.-pantalla-de-registro-de-senderista)

[Figura 7. Pantalla de registro de rescatista
21](#figura-7.-pantalla-de-registro-de-rescatista)

[Figura 8. Validación de credenciales de rescatista
22](#figura-8.-validación-de-credenciales-de-rescatista)

[Figura 9. Vista inicial del panel del senderista
23](#figura-9.-vista-inicial-del-panel-del-senderista)

[Figura 10. Vista inicial del panel del rescatista
24](#figura-10.-vista-inicial-del-panel-del-rescatista)

[Figura 11. Perfil del senderista 27](#figura-11.-perfil-del-senderista)

[Figura 12. Sesión de información médica
28](#figura-12.-sesión-de-información-médica)

[Figura 13. Pantalla de contactos de emergencia
29](#figura-13.-pantalla-de-contactos-de-emergencia)

[Figura 14. Pantalla de expedición activa
31](#figura-14.-pantalla-de-expedición-activa)

[Figura 15. Pantalla o estado de retorno confirmado
32](#figura-15.-pantalla-o-estado-de-retorno-confirmado)

[Figura 16. Pantalla de alerta activa generada por vencimiento
33](#figura-16.-pantalla-de-alerta-activa-generada-por-vencimiento)

[Figura 17. Pantalla de alerta crítica activa
35](#figura-17.-pantalla-de-alerta-crítica-activa)

[Figura 18. Dashboard o panel del rescatista
36](#figura-18.-dashboard-o-panel-del-rescatista)

[Figura 19. Lista de expediciones monitoreadas
39](#figura-19.-lista-de-expediciones-monitoreadas)

[Figura 20. Consola visual de alertas por colores
40](#figura-20.-consola-visual-de-alertas-por-colores)

[Figura 21. Detalle de alerta de emergencia
43](#figura-21.-detalle-de-alerta-de-emergencia)

[Figura 22. Bitácora de rescate 43](#figura-22.-bitácora-de-rescate)

[Figura 23. Historial de expediciones del senderista
44](#figura-23.-historial-de-expediciones-del-senderista)

[Figura 24. Configuración de privacidad
47](#figura-24.-configuración-de-privacidad)

[Figura 25. Solicitud de eliminación o anonimización de datos
48](#figura-25.-solicitud-de-eliminación-o-anonimización-de-datos)

[Figura 26. Formulario offline de expedición
49](#figura-26.-formulario-offline-de-expedición)

[Figura 27. Validación de coordenadas manuales
50](#figura-27.-validación-de-coordenadas-manuales)

[Figura 28. Pantalla principal optimizada del senderista
52](#figura-28.-pantalla-principal-optimizada-del-senderista)

[Figura 29. Modo oscuro 53](#figura-29.-modo-oscuro)

[Figura 30. Notificación preventiva de retorno
53](#figura-30.-notificación-preventiva-de-retorno)

[Figura 31. Pantalla de expedición activa con recordatorio
54](#figura-31.-pantalla-de-expedición-activa-con-recordatorio)

**ÍNDICE DE TABLAS**

> [Tabla 1 - Supuestos 8](#tabla-1---supuestos)
>
> [Tabla 2 - Restricciones 9](#tabla-2---restricciones)
>
> [Tabla 3 - Roles del Equipo 10](#tabla-3---roles-del-equipo)
>
> [Tabla 4 - ODS 11](#tabla-4---ods)
>
> [Tabla 5 - DoR CheckList 15](#tabla-5---dor-checklist)
>
> [Tabla 6 - DoD CheckList 16](#tabla-6---dod-checklist)

# Capítulo 1: Visión General del Proyecto

## Nombre del producto

> **TrekSafe**
>
> Sistema Automatizado de Monitoreo y Gestión de Seguridad para Turismo
> de Aventura en Alta Montaña

## Propósito

> El propósito central de TrekSafe es mitigar la alta siniestralidad y
> el retraso crítico en las operaciones de rescate en alta montaña, una
> problemática global que en entornos de senderismo independiente llegó
> a acumular 470 rescates y 74 víctimas mortales en un solo semestre
> (Cadena SER, 2024). Este sistema busca responder con un enfoque
> preventivo ante la severa volatilidad geodinámica de los Andes
> peruanos, cuyos riesgos históricos de avalanchas y desprendimientos,
> documentados por el Socorro Andino Peruano (2025), se han manifestado
> en crisis recientes como las tragedias de los nevados Artesonraju y
> Huascarán. En dichos incidentes, la falta de información exacta sobre
> el paradero de las víctimas y la dependencia de reportes manuales
> tardíos prolongaron las búsquedas por más de una semana (Infobae,
> 2025).
>
> Para revertir esta situación, el proyecto se consolida con el fin de
> desplazar el eje reactivo tradicional hacia un protocolo automatizado
> de verificación positiva. Mediante el registro digital del plan de
> expedición y el cálculo de la hora estimada de retorno, TrekSafe
> activará alertas escalonadas e instantáneas hacia los cuerpos de
> rescate especializados si no se confirma el retorno seguro. Al proveer
> de manera inmediata la última ubicación georreferenciada y los datos
> médicos del usuario, se garantiza una respuesta eficiente durante las
> \"horas doradas\" posteriores al incidente.

## Alcance

> **Alcance Inicial (In-Scope)**
>
> El desarrollo del proyecto abarcará los siguientes tres ejes
> funcionales centrales para garantizar la seguridad de los senderistas
> :

I.  **Registro de planes de ruta**

> El senderista declara su itinerario antes de iniciar la expedición,
> incluyendo información como ruta seleccionada, fecha y hora de salida,
> hora estimada de retorno, participantes y contactos de emergencia.
>
> Esta funcionalidad busca estandarizar la planificación y asegurar que
> exista un registro digital confiable para activar protocolos en caso
> de emergencia.

II. **Check-in de retorno con ventana de tolerancia**

> El senderista confirma su regreso seguro dentro del plazo acordado. Si
> el check-in no se produce en el tiempo estipulado, el sistema escala
> automáticamente el nivel de alerta.
>
> Esta funcionalidad reduce la dependencia del aviso manual de terceros
> y mejora el tiempo de reacción ante posibles incidentes.

III. **Gestión de alertas y coordinación de rescate**

> El sistema permitirá el registro de miembros de cuerpos de rescate
> mediante la validación de credenciales institucionales. Para ello, el
> usuario ingresará su número de credencial, nombre completo y fecha de
> nacimiento. En el contexto académico del proyecto, la validación se
> realizará contra un registro simulado de credenciales, tomando como
> referencia entidades como MINCETUR o AGMP.
>
> **Fuera del alcance**
>
> Los siguientes elementos fueron identificados como requerimientos
> deseables, pero no serán implementados en los Releases 01 y 02 por las
> razones indicadas:

- **Rastreo GPS en tiempo real vía hardware dedicado:** Requiere
  integración con dispositivos IoT físicos fuera del alcance técnico del
  equipo (RC-03). La geolocalización será declarativa, no continua.

- **Notificaciones SMS en producción:** Los servicios de envío de SMS
  (ej. Twilio) tienen costo operativo sin capa gratuita suficiente para
  producción (RC-04). Se implementará simulación en desarrollo.

- **Integración con sistemas gubernamentales (INDECI / CORESEC):**
  Integración real con sistemas gubernamentales o institucionales
  externos: La conexión directa con plataformas como MINCETUR, AGMP,
  INDECI o CORESEC queda fuera del alcance de los Releases 01 y 02,
  debido a que requeriría acceso a APIs públicas, acuerdos
  institucionales y validaciones oficiales. Para fines del MVP, la
  validación de credenciales de rescatistas será simulada mediante un
  registro local o mock service.

## Supuestos y restricciones

> **Supuestos**

#### *Tabla 1 - Supuestos*

  ----------- -----------------------------------------------
  **ID**      **Supuesto**

  **SA-01**   Se asume que el entorno de desarrollo contará
              con una base de datos relacional disponible de
              forma continua durante las pruebas e
              integración.

  **SA-02**   Se asume que el servidor de correo SMTP
              utilizado para notificaciones no aplicará
              restricciones de rate limiting que impidan el
              envío de alertas en escenarios de prueba con
              múltiples expediciones simultáneas.

  **SA-03**   Se asume que los navegadores utilizados por los
              usuarios finales soportan los estándares
              mínimos requeridos por la PWA (Service Workers,
              Fetch API), sin necesidad de polyfills
              adicionales.

  **SA-04**   Se asume que el motor de alertas puede
              ejecutarse como un proceso programado (cron job
              o scheduler) dentro del mismo entorno de
              despliegue, sin necesidad de infraestructura de
              colas de mensajería externa.

  **SA-05**   Se asume que los senderistas registrarán
              información verídica y actualizada sobre su
              expedición y contactos de emergencia.

  **SA-06**   Se asume que, para efectos del MVP académico,
              existirá un registro simulado de credenciales
              de rescatistas que permitirá validar número de
              credencial, nombre completo y fecha de
              nacimiento.
  ----------- -----------------------------------------------

> *Fuente: Elaboración Propia.*
>
> **Restricciones**

#### *Tabla 2 - Restricciones*

  ----------- ------------------------ ----------------------
  **ID**      **Restricción**          **Impacto**

  **RC-01**   **Escalabilidad:** El    Algunas
              sistema será diseñado    funcionalidades
              inicialmente para operar avanzadas de monitoreo
              con un volumen limitado  masivo quedan fuera
              de expediciones          del MVP.
              simultáneas.             

  **RC-02**   **Temporal:** El         Obliga a priorizar
              proyecto debe            funcionalidades MVP en
              desarrollarse dentro de  el Release 01 y
              un plazo limitado,       diferir mejoras al
              organizado en releases   Release 02.
              incrementales            

  **RC-03**   **Equipo:** El equipo    Excluye el desarrollo
              cuenta con un perfil     de soluciones que
              orientado al desarrollo  requieran integración
              de software, sin         con dispositivos IoT,
              especialización en       sensores físicos o
              hardware, electrónica o  hardware dedicado.
              soluciones IoT.          

  **RC-04**   **Tecnológica:** No se   El stack tecnológico
              utilizarán servicios     debe limitarse a
              cloud de pago sin capa   herramientas con tier
              gratuita funcional       gratuito verificado
              durante todo el ciclo de (ej. Railway, Supabase
              vida del proyecto.       free tier, SMTP
                                       educativo).

  **RC-05**   **Normativa:** La        Los datos sensibles
              plataforma debe cumplir  (ubicación declarada,
              con los principios de la contactos de
              Ley N° 29733 --- Ley de  emergencia) deben
              Protección de Datos      almacenarse con
              Personales del Perú.     cifrado en reposo y
                                       requerir
                                       consentimiento
                                       explícito del usuario
                                       al registrarse.
  ----------- ------------------------ ----------------------

> *Fuente: Elaboración Propia.*

## Roles y Responsabilidades

> Roles del Equipo de Desarrollo

#### *Tabla 3 - Roles del Equipo*

+:---------------+:-------------------------------------+
| **Rol**        | **Responsabilidad principal**        |
+----------------+--------------------------------------+
| **Product      | Define y prioriza el Product         |
| Owner**        | Backlog; representa la visión del    |
|                | producto y valida los criterios de   |
| *- Lopez,      | aceptación.                          |
| Marko*         |                                      |
+----------------+--------------------------------------+
| **Scrum        | Facilita las ceremonias Scrum;       |
| Master**       | remueve impedimentos; vela por la    |
|                | correcta aplicación del framework.   |
| *- Blanco,     |                                      |
| Ariana*        |                                      |
+----------------+--------------------------------------+
| **Developers** | Diseño, implementación, pruebas y    |
|                | documentación técnica del incremento |
| *- Llaury,     | de cada Sprint.                      |
| Manuel*        |                                      |
|                |                                      |
| *- Ormeño,     |                                      |
| Leonardo*      |                                      |
|                |                                      |
| *- Cordova,    |                                      |
| Yahel*         |                                      |
+----------------+--------------------------------------+

> *Fuente: Elaboración Propia.*

## Contribución a los Objetivos de Desarrollo Sostenible (ODS)

#### *Tabla 4 - ODS*

  --------------- ----------------- -----------------------
  **ODS**         **Meta            **Impacto**
                  específica**      

  **ODS 3 ---     Meta 3.6: Reducir TrekSafe reduce el
  Salud y         lesiones y        tiempo de respuesta
  Bienestar**     muertes causadas  ante emergencias en
                  por accidentes.   alta montaña mediante
                                    alertas automáticas,
                                    contribuyendo
                                    directamente a la
                                    preservación de la vida
                                    humana en actividades
                                    de riesgo.

  **ODS 11 ---    Meta 11.5:        Al digitalizar y
  Ciudades y      Reducir el número estandarizar los
  Comunidades     de muertes        protocolos de registro
  Sostenibles**   causadas por      de expediciones, el
                  desastres.        sistema fortalece la
                                    resiliencia de las
                                    comunidades de turismo
                                    de aventura y optimiza
                                    el uso de recursos de
                                    rescate públicos.
  --------------- ----------------- -----------------------

> *Fuente: Elaboración Propia.*

# Capítulo 2: Ideación del Producto

## Empathy Map

> a.1. **Senderista**

##### Figura 1 - Empathy Map del Senderista

> ![](media/image42.png){width="7.041790244969379in"
> height="5.786085958005249in"}

*Fuente: Elaboración propia hecha en Canva*

> a.2. **Rescatista**

##### Figura 2 - Empathy Map del Rescatista

![](media/image41.png){width="7.052206911636046in"
height="5.155590551181103in"}

*Fuente: Elaboración propia hecha en Canva*

## Product Vision Board

##### Figura 3 - Product Vision Board

![](media/image46.png){width="7.062623578302712in"
height="4.700620078740157in"}

*Fuente: Elaboración hecha con Chat GPT*

## Product Road Map

##### Figura 4 - Product Road Map

![](media/image47.png){width="7.062623578302712in"
height="5.277685914260718in"}

*Fuente: Elaboración hecha con Chat GPT*

## Definition of Ready para las historias de usuario

> **Propósito:**
>
> La Definición de Listo (DoR) establece los criterios que una Historia
> de Usuario (HU) debe cumplir para ser considerada \"lista\" y poder
> ser planificada dentro de un Sprint. Su objetivo es garantizar que el
> equipo de desarrollo no inicie trabajo sobre requisitos ambiguos,
> incompletos o no testeables.
>
> **DoR CheckList**

#### *Tabla 5 - DoR CheckList*

  -------- -------------------- -----------------------------
  **ID**   **Criterio**         **Requisito**

  DOR-01   CONNEXTRA completo   Debe tener: Como, Necesito,
                                Para, Entidades,
                                Restricciones, Negocio,
                                Excepciones, Tamaño, Test

  DOR-02   INVEST validado      Independiente, Negociable,
                                Valiosa, Estimable, Pequeña,
                                Testeable

  DOR-03   SMART validado       Criterios de aceptación:
                                Específicos, Medibles,
                                Alcanzables, Relevantes,
                                Time-boxed

  DOR-04   Gherkin por criterio Cada criterio de aceptación
                                tiene al menos un
                                Dado-Cuando-Entonces-Y

  DOR-05   Sin dependencias     No requiere IoT, no requiere
           bloqueantes          SMS pago, no requiere APIs
                                gubernamentales

  DOR-06   Cumple restricciones Respeta las restricciones del
           del proyecto         proyecto (RC-01 a RC-05)

  DOR-07   Estimada por el      Talla (XS/S/M/L/XL) o story
           equipo               points, consensuada

  DOR-08   OK del PO            Aprobada en refinement con
                                verificación de criterios
  -------- -------------------- -----------------------------

> *Fuente: Elaboración propia*

## Definition of Done para los incrementos

> **Propósito:**
>
> La Definición de Terminado (DoD) establece los criterios que un
> incremento (historia de usuario o funcionalidad completa) debe cumplir
> para ser considerado \"terminado\" y potencialmente liberable. Su
> objetivo es garantizar que el equipo de desarrollo no entregue
> incrementos incompletos, no probados o que incumplan los estándares de
> calidad y las restricciones técnicas definidas en el proyecto.
>
> **DoD CheckList**

#### *Tabla 6 - DoD CheckList*

  -------- ---------------- ---------------------------------
  **ID**   **Criterio**     **Requisito**

  DOD-01   Código           El código de la HU está en el
           implementado     repositorio con mensaje de commit
                            claro

  DOD-02   Pruebas          Todas las pruebas unitarias
           unitarias        pasan. Cobertura mínima del 80%
                            en lógica crítica (alertas,
                            check-in, validaciones)

  DOD-03   Pruebas de       Las interacciones con base de
           integración      datos y SMTP (simulado en
                            desarrollo) funcionan
                            correctamente

  DOD-04   Criterios de     Validación y ejecución exitosa de
           aceptación       los escenarios Gherkin
           cumplidos        

  DOD-05   Revisión de      Al menos un developer diferente
           código           al autor revisó y aprobó el
                            código

  DOD-06   Sin bugs         No hay bugs que impidan el flujo
           críticos         principal: registro → crear
                            expedición → check-in → alerta

  DOD-07   Criterios        Sin dependencias IoT (RC-03). Sin
           técnicos         servicios de pago no aprobados
                            (RC-04).

  DOD-08   Documentación    La HU queda documentada en el
           actualizada      backlog como \"terminada\" con
                            fecha y responsable

  DOD-09   Consentimiento y Cifrado de datos sensibles
           privacidad       (RC-05)

  DOD-10   Aprobación del   Despliegue exitoso en Staging
           PO               listo para revisión
  -------- ---------------- ---------------------------------

> *Fuente: Elaboración propia*

##  

# Capítulo 3: Release 01 (8 semanas)

## Plan de Release 01 (duración: 08 semanas)

> El Release 01 tiene como objetivo construir un Producto Mínimo Viable
> funcional de TrekSfe, permitiendo registrar expediciones, monitorear
> retornos y generar alertas automáticas ante posibles situaciones de
> riesgo. Durante las ocho semanas de desarrollo se implementarán los
> módulos fundamentales para senderistas y equipos de rescate, junto con
> las funcionalidades base de registro, autenticación y generación de
> alerta. El Release 01 se organiza en cuatro sprints de dos semanas
> cada uno. Esta distribución permite avanzar de manera progresiva desde
> la creación de accesos básicos hasta la activación de alertas y
> notificaciones de emergencia. El total estimado para este release es
> de 57 story points.

## Para cada Sprint, se debe definir:

1.  Sprint 1: Cimientos de la Plataforma y Accesos Básicos

Duración: Semanas 1 y 2

Story Points: 13

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque establece la base de acceso y
> autenticación de TrekSafe. Antes de registrar expediciones o gestionar
> alertas, el sistema debe permitir que los senderistas y miembros de
> rescate puedan crear una cuenta e iniciar sesión de forma segura.
> Además, el registro diferenciado de cuerpos de rescate permite validar
> el rol de quienes posteriormente accederán a información crítica de
> emergencias.
>
> En el caso de los cuerpos de rescate, la validación se realizará
> únicamente durante el proceso de registro inicial. Para ello, el
> usuario ingresará datos institucionales como número de credencial,
> nombre completo y fecha de nacimiento. Esta información será
> contrastada contra un registro simulado de credenciales válidas. Si
> los datos coinciden, el sistema creará la cuenta y asignará el rol de
> rescatista. En accesos posteriores, el usuario solo deberá iniciar
> sesión con sus credenciales registradas.
>
> El objetivo del Sprint 1 es implementar los accesos básicos del
> sistema, asegurando la creación de cuentas, la autenticación segura y
> la diferenciación inicial de roles entre senderistas y rescatistas.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  --------------- ---------------------- ----------------------
  ID              Historias de Usuario   Criterios de
                                         aceptación

  HU-01           Registro de            Dado que el usuario no
                  Senderistas            autenticado está en el
                                         formulario de
                                         registro, cuando
                                         ingresa datos válidos,
                                         una contraseña segura
                                         y acepta la política
                                         de tratamiento de
                                         datos, entonces el
                                         sistema crea la cuenta
                                         del senderista y
                                         almacena sus datos de
                                         forma segura.

  HU-02           Inicio de Sesión       Dado que el usuario se
                  Seguro                 encuentra en la
                                         pantalla de inicio de
                                         sesión, cuando ingresa
                                         credenciales válidas,
                                         entonces el sistema
                                         valida su identidad y
                                         le permite acceder a
                                         su panel privado.

  HU-03           Registro de Cuerpos de Dado que un miembro de
                  Rescate                rescate se encuentra
                                         en el formulario de
                                         registro, cuando
                                         ingresa número de
                                         credencial, nombre
                                         completo y fecha de
                                         nacimiento, entonces
                                         el sistema valida la
                                         información contra un
                                         registro simulado; si
                                         los datos coinciden,
                                         crea la cuenta y
                                         asigna el rol de
                                         rescatista, y si no
                                         coinciden, muestra un
                                         mensaje de validación
                                         fallida sin habilitar
                                         el acceso.
  --------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará dividiendo el trabajo entre frontend, backend,
> base de datos, seguridad y pruebas. Primero se diseñarán las
> interfaces de registro e inicio de sesión. Luego se desarrollarán los
> endpoints de autenticación y registro de usuarios. Finalmente, se
> implementará la persistencia de datos, el cifrado de contraseñas y las
> pruebas de acceso.
>
> Las tareas principales son:

- Diseñar formulario responsive de registro de senderista.

- Implementar validaciones de campos obligatorios para el registro.

- Añadir aceptación obligatoria de política de privacidad y tratamiento
  de datos.

- Crear endpoint de registro de senderista.

- Diseñar pantalla de inicio de sesión.

- Crear endpoint de inicio de sesión.

- Implementar servicio de validación de credenciales únicamente para el
  registro inicial de rescatistas.

- Generar sesión segura según el rol del usuario.

- Crear cuentas demo predeterminadas para senderista y rescatista.

- Diseñar formulario especializado para registro de rescatistas.

- Solicitar número de credencial, nombre completo y fecha de nacimiento.

- Crear registro simulado de credenciales válidas.

- Implementar servicio de validación de credenciales.

- Validar coincidencia entre credencial, nombre completo y fecha de
  nacimiento.

- Asignar el rol de rescatista al momento de crear la cuenta, solo si la
  validación inicial es exitosa.

- Mostrar mensaje de error si las credenciales no coinciden.

- Ejecutar pruebas de registro, login y control de acceso por rol.

### Mockups de las pantallas

##### Figura 5. Pantalla de inicio de sesión

![](media/image6.png){width="2.7623928258967627in"
height="3.931748687664042in"}

##### Figura 6. Pantalla de registro de senderista

![](media/image10.png){width="2.3959569116360453in"
height="4.320913167104112in"}

##### Figura 7. Pantalla de registro de rescatista

![](media/image14.png){width="2.431872265966754in"
height="4.276042213473316in"}

##### Figura 8. Validación de credenciales de rescatista

![](media/image1.png){width="3.2497484689413825in"
height="2.5865343394575677in"}

> ![](media/image26.png){width="3.2397069116360453in"
> height="3.0924475065616797in"}

##### Figura 9. Vista inicial del panel del senderista 

![](media/image2.png){width="2.3438735783027123in"
height="5.109865485564304in"}

##### Figura 10. Vista inicial del panel del rescatista

![](media/image23.png){width="2.5105402449693788in"
height="5.552083333333333in"}

2.  Sprint 2: Configuración de Datos Críticos y Preparación de Ruta

Duración: Semanas 3 y 4

Story Points: 18

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque recopila la información crítica que
> será utilizada en caso de emergencia. TrekSafe no solo debe registrar
> usuarios, sino también permitir que el senderista declare datos
> relevantes como ubicación inicial, destino, información médica,
> contactos de emergencia y acompañantes. Esta información será la base
> para que una alerta generada posteriormente tenga valor operativo para
> contactos y rescatistas.
>
> El objetivo del Sprint 2 es permitir que el senderista configure su
> información de seguridad y registre los datos necesarios para preparar
> una expedición de forma responsable

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  --------------- ---------------------- ----------------------
  ID              Historias de Usuario   Criterios de
                                         aceptación

  HU-04           Información Inicial de Dado que el senderista
                  Expedición             ha iniciado sesión,
                                         cuando registra la
                                         ubicación de inicio y
                                         el punto de destino de
                                         su expedición,
                                         entonces el sistema
                                         almacena esta
                                         información como parte
                                         del plan de
                                         expedición.

  HU-05           Historial Médico y     Dado que el senderista
                  Consentimiento         está en la sección de
                                         ficha médica, cuando
                                         registra sus datos de
                                         salud y acepta el
                                         consentimiento de uso,
                                         entonces el sistema
                                         guarda la información
                                         de forma confidencial
                                         y cifrada.

  HU-06           Contactos de           Dado que el senderista
                  Emergencia Frecuentes  se encuentra en la
                                         sección de contactos,
                                         cuando registra
                                         nombre, parentesco,
                                         teléfono y correo
                                         válido de un contacto,
                                         entonces el sistema lo
                                         guarda en su perfil
                                         para usarlo en futuras
                                         expediciones.

  HU-07           Creación de Plan de    Dado que el senderista
                  Expedición             autenticado está en el
                                         formulario de
                                         expedición, cuando
                                         ingresa destino,
                                         fecha, hora de salida
                                         y hora estimada de
                                         retorno, entonces el
                                         sistema registra el
                                         plan con estado
                                         programado o en curso.

  HU-08           Asociación de          Dado que el senderista
                  Contactos y Grupo      está creando una
                                         expedición, cuando
                                         selecciona contactos
                                         de emergencia y
                                         registra acompañantes,
                                         entonces el sistema
                                         asocia esta
                                         información al plan de
                                         expedición actual.
  --------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará priorizando primero la estructura de datos
> necesaria para expediciones, contactos y ficha médica. Luego se
> desarrollarán las pantallas de perfil, información médica, contactos y
> creación de expedición. Finalmente, se integrará la asociación entre
> expedición, contactos y grupo de acompañantes.
>
> Las tareas principales son:

- Crear formulario para ubicación inicial y destino de expedición.

- Crear modelo de expedición con campos de origen, destino, fecha y
  hora.

- Diseñar sección de ficha médica.

- Implementar consentimiento explícito para uso de datos sensibles.

- Cifrar información médica antes de almacenarla.

- Diseñar un módulo CRUD de contactos de emergencia.

- Validar formato de correo y teléfono.

- Crear formulario de plan de expedición.

- Validar coherencia de fecha y hora de retorno.

- Asociar contactos y acompañantes a una expedición.

- Probar recuperación correcta de datos críticos.

### Mockups de las pantallas

##### Figura 11. Perfil del senderista 

![](media/image11.png){width="3.0001235783027123in"
height="6.910997375328084in"}

##### Figura 12. Sesión de información médica 

![](media/image40.png){width="2.660599300087489in"
height="5.855224190726159in"}

##### Figura 13. Pantalla de contactos de emergencia 

![](media/image24.png){width="2.3542902449693788in"
height="4.854166666666667in"}

3.  Sprint 3: Núcleo del Monitoreo Pasivo (Core MVP)

Duración: Semanas 5 y 6

Story Points: 14

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint representa el núcleo funcional del MVP, ya que implementa
> el monitoreo pasivo de expediciones. A partir de este punto, TrekSafe
> deja de ser solo una plataforma de registro y empieza a cumplir su
> propósito principal: verificar que el senderista retorne dentro del
> plazo declarado y permitir que confirme su regreso de forma segura.
>
> El objetivo del Sprint 3 es desarrollar la visualización de
> expediciones activas, el check-in manual de retorno seguro y el motor
> automático que detecta expediciones vencidas.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ------------------- ---------------------- ----------------------
  ID                  Historias de Usuario   Criterios de
                                             aceptación

  HU-09               Visualización de       Dado que el senderista
                      Expedición Activa      tiene una expedición
                                             en curso, cuando
                                             accede a TrekSafe,
                                             entonces el sistema
                                             muestra un resumen de
                                             la ruta y un contador
                                             de tiempo restante.

  HU-10               Check-in Manual de     Dado que el senderista
                      Retorno Seguro         regresa antes de
                                             vencer el plazo,
                                             cuando presiona
                                             "Registrar Retorno
                                             Seguro", entonces el
                                             sistema cambia el
                                             estado de la
                                             expedición a
                                             finalizada y detiene
                                             el temporizador.

  HU-11               Motor de Control de    Dado que existe una
                      Plazos (Cron Job)      expedición activa cuyo
                                             tiempo de tolerancia
                                             expiró, cuando el
                                             proceso programado
                                             ejecuta la validación,
                                             entonces el sistema
                                             cambia el estado de la
                                             expedición a alerta.
  ------------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará en tres frentes. El primer frente implementará
> la pantalla de expedición activa y el temporizador. El segundo
> desarrollará el endpoint de check-in y la actualización de estados. El
> tercer frente implementará el proceso automático de control de plazos.
> Al final del sprint se integrarán los tres componentes para validar el
> flujo completo: expedición activa, retorno confirmado o cambio
> automático a alerta.
>
> Las tareas principales son:

- Diseñar dashboard simplificado de expedición activa.

- Mostrar datos principales de la ruta en curso.

- Implementar contador dinámico de tiempo restante.

- Crear endpoint para consultar expedición activa.

- Añadir botón "Registrar Retorno Seguro".

- Crear endpoint de check-in.

- Cambiar estado de expedición a "Finalizada".

- Detener temporizador después del check-in.

- Configurar cron job de control de plazos.

- Detectar expediciones vencidas sin check-in.

- Cambiar estado de expedición a "En Alerta".

- Probar el flujo completo de monitoreo pasivo.

> .

### Mockups de las pantallas

##### Figura 14. Pantalla de expedición activa 

![](media/image32.png){width="2.2397069116360453in"
height="5.385416666666667in"}

##### Figura 15. Pantalla o estado de retorno confirmado 

![](media/image43.png){width="2.754455380577428in"
height="5.915609142607174in"}

##### Figura 16. Pantalla de alerta activa generada por vencimiento 

![](media/image44.png){width="2.8126235783027123in"
height="6.281524496937883in"}

4.  Sprint 4: Despacho e Integración de Notificaciones de Alerta

Duración: Semanas 7 y 8

Story Points: 12

### 

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque completa el flujo crítico del MVP: la
> activación de alertas y la comunicación con contactos de emergencia y
> equipos de rescate. Una vez detectada una expedición vencida, el
> sistema debe enviar notificaciones con la información necesaria para
> iniciar una respuesta oportuna.
>
> El objetivo del Sprint 4 es implementar el despacho automático de
> correos de alerta, tanto a contactos de emergencia como a cuerpos de
> rescate, y permitir que el equipo de rescate confirme la recepción de
> la alerta para iniciar el seguimiento del caso.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ---------------- ---------------------- ----------------------
  ID               Historias de Usuario   Criterios de
                                          aceptación

  HU-12            Alerta por Correo a    Dado que una
                   Contactos              expedición cambia a
                                          estado "En Alerta",
                                          cuando el sistema
                                          procesa la cola de
                                          notificaciones,
                                          entonces envía un
                                          correo automático a
                                          los contactos
                                          asociados con los
                                          detalles de la ruta
                                          declarada.

  HU-13            Alerta por Correo a    Dado que el sistema
                   Contactos              detecta una expedición
                                          desfasada, cuando
                                          ejecuta el aviso a
                                          equipos validados,
                                          entonces envía un
                                          correo de emergencia
                                          con la ubicación
                                          declarada y ficha
                                          médica del afectado.

  HU-14            Confirmación de        Dado que existe una
                   Recepción de Alerta    alerta enviada al
                                          equipo de rescate,
                                          cuando el rescatista
                                          confirma la recepción,
                                          entonces el sistema
                                          registra fecha, hora y
                                          usuario responsable, y
                                          actualiza el estado de
                                          la alerta.
  ---------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará integrando backend, notificaciones, datos
> sensibles y vista de rescatista. Primero se configurará el envío de
> correos mediante SMTP. Luego se diseñarán las plantillas de
> notificación para contactos y rescatistas. Finalmente, se implementará
> la vista de alertas pendientes y la confirmación de recepción por
> parte del equipo de rescate.
>
> Las tareas principales son:

- Configurar servicio de correo mediante SMTP.

- Diseñar plantilla de correo para contactos de emergencia.

- Extraer contactos asociados a una expedición en alerta.

- Enviar correo automático a contactos vinculados.

- Consolidar lista de rescatistas validados.

- Preparar ficha técnica de emergencia.

- Incluir ubicación declarada y datos médicos autorizados.

- Enviar correo institucional a equipos de rescate.

- Mostrar alertas pendientes en la vista del rescatista.

- Agregar botón de confirmación de recepción.

- Registrar fecha, hora y usuario responsable de la confirmación.

- Validar que solo usuarios con rol rescatista puedan confirmar alertas.

- Probar el flujo completo de emergencia.

### Mockups de las pantallas

##### Figura 17. Pantalla de alerta crítica activa

![](media/image39.png){width="2.3647069116360453in"
height="4.740260279965004in"}

### 

##### Figura 18. Dashboard o panel del rescatista

![](media/image18.png){width="2.6459569116360453in"
height="5.271791338582677in"}

# Capítulo 4: Release 02 (8 semanas)

## Plan de Release 02 (duración: 08 semanas)

> El Release 02 tiene como objetivo optimizar y ampliar las
> funcionalidades desarrolladas en el MVP de TrekSafe. Mientras que el
> Release 01 se enfoca en construir el flujo principal de registro,
> monitoreo y generación de alertas, el Release 02 busca fortalecer la
> experiencia de los rescatistas y senderistas mediante herramientas de
> visualización, gestión de incidentes, historial, privacidad,
> funcionamiento offline y prevención proactiva de alertas innecesarias.
>
> Durante estas ocho semanas se implementarán mejoras orientadas al
> monitoreo operativo, la trazabilidad de rescates, el cumplimiento
> normativo y la usabilidad de la plataforma. La Release 02 se organiza
> en cuatro sprints de dos semanas cada uno, manteniendo un enfoque
> incremental basado en Scrum. El total estimado para este release es de
> 39 story points.

## Para cada Sprint, se debe definir:

1.  Sprint 5: Consola de Monitoreo para Equipos de Salvamento

Duración: Semanas 9 y 10

Story Points: 11

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque permite que los equipos de rescate
> cuenten con una vista centralizada de las expediciones activas y en
> riesgo. Una vez que el sistema ya puede registrar expediciones y
> generar alertas, resulta necesario que los rescatistas puedan
> monitorear la información de manera clara, rápida y priorizada.
>
> El objetivo del Sprint 5 es implementar una consola de monitoreo para
> rescatistas, incorporando un dashboard central, filtros por zona y una
> visualización por colores que facilite identificar expediciones
> activas, retrasadas o en estado crítico.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ----------------- ---------------------- ----------------------
  ID                Historias de Usuario   Criterios de
                                           aceptación

  HU-15             Dashboard Central de   Dado que el rescatista
                    Expediciones           ha iniciado sesión,
                                           cuando accede al panel
                                           de monitoreo, entonces
                                           el sistema muestra las
                                           expediciones en curso
                                           de la región con sus
                                           datos principales y
                                           estado actual.

  HU-16             Filtro de Expediciones Dado que existen
                    por Zona               expediciones activas
                                           en distintas zonas,
                                           cuando el rescatista
                                           selecciona un sector o
                                           nevado específico,
                                           entonces el sistema
                                           filtra la lista
                                           mostrando solo las
                                           expediciones
                                           correspondientes a
                                           dicha zona.

  HU-17             Consola Visual de      Dado que existen
                    Alertas por Colores    expediciones con
                                           distintos niveles de
                                           riesgo, cuando el
                                           rescatista visualiza
                                           la consola, entonces
                                           el sistema muestra
                                           códigos de color
                                           verde, amarillo o rojo
                                           según el estado de
                                           cada expedición.
  ----------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará dividiendo el trabajo entre diseño del
> dashboard, desarrollo frontend, consultas backend y pruebas de
> visualización. Primero se definirá la estructura del panel de
> monitoreo. Luego se implementarán los filtros por zona y la lógica de
> clasificación visual por colores. Finalmente, se realizarán pruebas
> para validar que la información mostrada sea correcta según el estado
> de cada expedición.
>
> Las tareas principales son:

- Diseñar la interfaz del dashboard central para rescatistas.

- Crear tarjetas de indicadores para expediciones activas, retrasadas y
  en alerta.

- Crear endpoint para listar expediciones monitoreadas.

- Implementar tabla de expediciones con datos principales.

- Añadir filtros por zona, sector o nevado.

- Implementar lógica de clasificación por estados.

- Asignar colores según nivel de riesgo: verde, amarillo y rojo.

- Validar que los filtros actualicen correctamente los resultados.

- Realizar pruebas de visualización y consistencia de estados.

### Mockups de las pantallas

##### Figura 19. Lista de expediciones monitoreadas 

![](media/image37.png){width="2.7501235783027123in"
height="5.858957786526684in"}

##### Figura 20. Consola visual de alertas por colores 

###  ![](media/image5.png){width="2.6251235783027123in" height="5.570382764654418in"}

2.  Sprint 6: Gestión Operativa de Incidentes e Historial

Duración: Semanas 11 y 12

> Story Points: 10

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque permite que los rescatistas gestionen
> los casos de emergencia de manera ordenada y trazable. No basta con
> recibir una alerta; el equipo de rescate necesita consultar
> información crítica, registrar acciones realizadas y actualizar el
> estado del incidente. Además, para el senderista, el historial de
> expediciones permite revisar sus rutas pasadas y mantener un registro
> personal de sus actividades.
>
> El objetivo del Sprint 6 es implementar la consulta de ficha de
> emergencia, la bitácora de rescate y el historial de expediciones
> finalizadas.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ---------------------- ---------------------- ----------------------
  ID                     Historias de Usuario   Criterios de
                                                aceptación

  HU-18                  Consulta de Ficha de   Dado que existe una
                         Emergencia             alerta roja activa,
                                                cuando el rescatista
                                                abre el detalle del
                                                caso, entonces el
                                                sistema muestra la
                                                ruta declarada,
                                                participantes,
                                                contactos de
                                                emergencia e
                                                información médica
                                                autorizada del
                                                senderista.

  HU-19                  Bitácora y Estados de  Dado que el rescatista
                         Rescate                está gestionando una
                                                alerta, cuando
                                                registra una nota o
                                                cambia el estado del
                                                incidente, entonces el
                                                sistema guarda la
                                                actualización con
                                                fecha, hora y usuario
                                                responsable.

  HU-20                  Historial de           Dado que el senderista
                         Expediciones           tiene expediciones
                         Finalizadas            finalizadas, cuando
                                                accede a su historial,
                                                entonces el sistema
                                                muestra sus rutas
                                                pasadas, fechas,
                                                estados y estadísticas
                                                básicas de montaña.
  ---------------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará separando el trabajo en dos flujos: flujo de
> rescatista y flujo de senderista. Para el rescatista, se desarrollará
> la pantalla de detalle de alerta, la ficha de emergencia y la bitácora
> de seguimiento. Para el senderista, se implementará el historial de
> expediciones finalizadas. Finalmente, se realizarán pruebas de
> trazabilidad para asegurar que los cambios de estado y notas queden
> registrados correctamente.
>
> Las tareas principales son:

- Diseñar pantalla de detalle de alerta.

- Crear vista de ficha de emergencia del senderista.

- Mostrar ruta declarada, participantes y contactos asociados.

- Mostrar información médica autorizada sólo en contexto de alerta.

- Crear endpoint para consultar detalles de emergencia.

- Diseñar módulo de bitácora de rescate.

- Permitir registro de notas operativas.

- Implementar cambio de estados: En búsqueda, Localizado y Cerrado.

- Registrar fecha, hora y usuario responsable de cada actualización.

- Crear pantalla de historial de expediciones para senderistas.

- Mostrar expediciones finalizadas y estadísticas básicas.

- Realizar pruebas de trazabilidad y permisos por rol.

### Mockups de las pantallas

##### Figura 21. Detalle de alerta de emergencia 

![](media/image38.png){width="2.3867235345581803in"
height="5.180935039370079in"}

##### Figura 22. Bitácora de rescate 

![](media/image48.png){width="3.455353237095363in"
height="2.465657261592301in"}

##### Figura 23. Historial de expediciones del senderista 

> ![](media/image20.png){width="2.8839129483814525in"
> height="5.390625546806649in"}

3.  Sprint 7: Resiliencia Offline, Seguridad y Cumplimiento Normativo

Duración: Semanas 13 y 14

> Story Points: 12

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint\**

> Este sprint es importante porque fortalece la confiabilidad y
> seguridad de TrekSafe. Debido a que el turismo de aventura ocurre en
> zonas donde puede existir baja conectividad, la aplicación debe
> ofrecer soporte básico offline para formularios y rutas frecuentes.
> Asimismo, al manejar datos sensibles como información médica,
> contactos de emergencia y rutas declaradas, el sistema debe incorporar
> mecanismos de protección y derechos de eliminación o anonimización de
> datos.
>
> El objetivo del Sprint 7 es mejorar la resiliencia offline, validar
> información georreferenciada ingresada manualmente y permitir que el
> senderista ejerza la revocación o anonimización de sus datos
> personales.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ------------------- ---------------------- ----------------------
  ID                  Historias de Usuario   Criterios de
                                             aceptación

  HU-21               Revocación de Datos    Dado que el senderista
                      (Derechos ARCO)        accede a la
                                             configuración de
                                             privacidad, cuando
                                             solicita eliminar o
                                             anonimizar sus datos,
                                             entonces el sistema
                                             procesa la solicitud
                                             respetando la
                                             protección de datos
                                             personales.

  HU-22               Caché y Formularios    Dado que el senderista
                      Offline                abre la aplicación en
                                             una zona sin conexión,
                                             cuando accede a
                                             formularios
                                             previamente cargados,
                                             entonces el sistema
                                             muestra la estructura
                                             base y permite
                                             completar información
                                             para sincronizarla
                                             posteriormente.

  HU-23               Validación de          Dado que el senderista
                      Coordenadas            registra coordenadas
                                             manuales en una
                                             expedición, cuando
                                             ingresa un formato
                                             incorrecto, entonces
                                             el sistema bloquea el
                                             registro y muestra un
                                             mensaje de validación.
  ------------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará en tres frentes: privacidad, offline y
> validación de datos. Primero se implementará la configuración de
> privacidad y el flujo de revocación de datos. Luego se configurará el
> caché de pantallas y formularios esenciales mediante capacidades PWA.
> Finalmente, se desarrollarán validaciones para coordenadas manuales,
> reduciendo errores que podrían afectar un proceso de búsqueda.
>
> Las tareas principales son:

- Diseñar pantalla de configuración de privacidad.

- Implementar opción para solicitar eliminación de datos.

- Implementar opción para anonimizar historial de rutas.

- Crear endpoint para procesar solicitudes de revocación.

- Validar que los datos sensibles se eliminen o anonimicen
  correctamente.

- Configurar caché de formularios esenciales.

- Permitir carga de estructura base de la aplicación sin conexión.

- Guardar temporalmente información ingresada sin conexión.

- Sincronizar datos cuando se recupere conexión.

- Implementar validación de formatos de coordenadas.

- Mostrar mensajes de error ante coordenadas inválidas.

- Probar escenarios con y sin conexión.

### Mockups de las pantallas

##### Figura 24. Configuración de privacidad 

![](media/image34.png){width="2.5209569116360453in"
height="5.760416666666667in"}

##### Figura 25. Solicitud de eliminación o anonimización de datos 

![](media/image33.png){width="2.3022069116360453in" height="4.65625in"}

##### Figura 26. Formulario offline de expedición 

![](media/image27.png){width="2.4688735783027123in"
height="5.5468077427821525in"}

### 

### 

### 

### 

### 

### 

### 

### 

### 

##### Figura 27. Validación de coordenadas manuales 

> ![](media/image30.png){width="2.3647069116360453in"
> height="4.673377077865267in"}

4.  Sprint 8: Pulido UX y Prevención Proactiva

Duración: Semanas 15 y 16

> Story Points: 6

I.  **¿Por qué es importante el Sprint? Objetivo del Sprint**

> Este sprint es importante porque mejora la experiencia final del
> usuario y reduce la posibilidad de falsas alarmas. En situaciones de
> montaña, el senderista puede operar la aplicación en condiciones
> adversas, con poca luz, cansancio, frío o conectividad limitada. Por
> ello, la interfaz debe ser clara, accesible y fácil de usar. Además,
> las notificaciones preventivas antes del vencimiento ayudan a recordar
> el check-in de retorno y evitan activar alertas innecesarias.
>
> El objetivo del Sprint 8 es optimizar la experiencia visual de
> TrekSafe, incorporar modo oscuro y añadir notificaciones preventivas
> antes de que expire el tiempo de tolerancia de una expedición.

### ¿Qué se trabajará durante el Sprint? Historias de usuario con sus criterios de aceptación

> Durante este sprint se trabajarán las siguientes historias de usuario:

  ----------------- ---------------------- ----------------------
  ID                Historias de Usuario   Criterios de
                                           aceptación

  HU-24             Optimización de UX y   Dado que el senderista
                    Modo Oscuro            usa TrekSafe en
                                           condiciones de baja
                                           iluminación, cuando
                                           activa el modo oscuro,
                                           entonces el sistema
                                           adapta la interfaz
                                           manteniendo
                                           legibilidad, contraste
                                           y botones accesibles.

  HU-25             Notificación de        Dado que una
                    Proximidad de          expedición activa está
                    Expiración             próxima a vencer,
                                           cuando faltan 30
                                           minutos para el límite
                                           de tolerancia,
                                           entonces el sistema
                                           muestra una alerta
                                           visual recordando al
                                           senderista realizar el
                                           check-in.
  ----------------- ---------------------- ----------------------

### ¿Cómo se organizará el equipo para lograr el incremento? Tareas necesarias para implementar las historias de usuario

> El equipo se organizará priorizando primero las mejoras visuales y de
> accesibilidad. Luego se implementará el modo oscuro y se ajustarán
> componentes como botones, tarjetas, estados y alertas. Finalmente, se
> desarrollará la notificación preventiva de proximidad de expiración,
> integrándola con el temporizador de expediciones activas.
>
> Las tareas principales son:

- Revisar consistencia visual de las pantallas principales.

- Mejorar tamaño y jerarquía de botones principales.

- Optimizar tarjetas, estados e indicadores visuales.

- Implementar modo oscuro en la interfaz.

- Validar contraste y legibilidad.

- Ajustar pantallas responsive para celular y computadora.

- Implementar alerta visual preventiva.

- Detectar cuando falten 30 minutos para la expiración.

- Mostrar recordatorio de check-in al senderista.

- Probar notificaciones preventivas en expediciones activas.

- Realizar pruebas finales de usabilidad.

### Mockups de las pantallas

##### Figura 28. Pantalla principal optimizada del senderista 

![](media/image45.png){width="2.3438735783027123in"
height="5.729166666666667in"}

##### Figura 29. Modo oscuro 

![](media/image17.png){width="2.1355402449693788in"
height="4.982926509186352in"}

##### Figura 30. Notificación preventiva de retorno 

![](media/image29.png){width="2.6147069116360453in"
height="3.6132360017497813in"}

##### Figura 31. Pantalla de expedición activa con recordatorio 

### ![](media/image28.png){width="2.466707130358705in" height="6.359375546806649in"} 

# Capítulo 5: Modelos UML

## Diagramas de flujo de los casos de uso de negocio del producto de software

> Los Casos de Uso de Negocio tratan al sistema y la organización como
> una caja negra, enfocándose en cómo los actores del entorno obtienen
> un valor directo alineado con los objetivos de seguridad y mitigación
> de siniestralidad en montaña.

1.  **CUN-01: Planificar y Registrar Expedición Segura**

    - **Actor(es) de negocio:** Senderista.

    - **Descripción breve:** El senderista declara formalmente su
      itinerario y datos de seguridad antes de ascender a la montaña
      para contar con un respaldo pasivo automatizado ante emergencias.

    - **Precondiciones:** El senderista debe haberse registrado en la
      plataforma y otorgado el consentimiento explícito para el
      tratamiento de sus datos sensibles de localización y salud.

    - **Flujo básico:**

      i.  El senderista ingresa la ubicación de inicio y el punto de
          destino de su ruta.

      ii. El senderista registra o actualiza su información médica
          crítica (grupo sanguíneo, alergias).

      iii. El senderista da de alta o selecciona sus contactos de
           emergencia obligatorios y detalla la lista de acompañantes de
           su grupo.

      iv. El senderista especifica la fecha, hora de salida y la hora
          estimada de retorno de la expedición.

      v.  El sistema procesa la información y almacena el plan con el
          estado programado o en curso.

    - Flujos alternativos:

      i.  **Registro en Modo Offline:** Si el senderista se encuentra en
          una zona de montaña sin cobertura móvil, completa el
          formulario base localmente; el sistema retiene los datos
          temporalmente en el dispositivo y los sincroniza
          automáticamente en cuanto se recupera la señal de internet.

      ii. **Validación de Coordenadas:** Si el senderista ingresa
          coordenadas geográficas manuales en un formato decimal
          erróneo, el sistema interrumpe el registro, muestra una alerta
          y le solicita corregir los campos obligatorios de latitud y
          longitud.

    - Reglas de negocio relevantes:

      i.  **RC-05 (Cumplimiento Normativo):** Los datos médicos y de
          ubicación deben almacenarse de forma confidencial mediante
          cifrado en reposo.

      ii. **SA-05 (Veracidad de la información):** Se asume bajo
          responsabilidad del usuario que la información de itinerarios
          y contactos ingresada es verídica y actual.

    - **Postcondiciones:** El plan de expedición queda registrado
      digitalmente de manera confiable, activando el temporizador de
      monitoreo pasivo del sistema.

2.  **CUN-02: Verificar Retorno Seguro de Montaña**

    - **Actor(es) de negocio:** Senderista.

    - **Descripción breve:** El senderista confirma su regreso a salvo
      de la expedición antes de que expire la ventana de tolerancia para
      desactivar los protocolos automatizados de búsqueda.

    - **Precondiciones:** El senderista cuenta con una expedición en
      curso registrada activamente en la plataforma.

    - **Flujo básico:**

      i.  El senderista accede a la aplicación mientras se visualiza el
          contador de tiempo restante.

      ii. El senderista presiona el botón \"Confirmar Retorno Seguro\".

      iii. El sistema da por finalizada la expedición y detiene los
           temporizadores de control.

    - **Flujos alternativos:**

      i.  **Prevención de Falsas Alarmas:** Faltando 30 minutos para
          alcanzar el límite del tiempo de tolerancia, el sistema emite
          una notificación de proximidad de expiración para recordarle
          al usuario realizar el check-in y evitar el despliegue
          innecesario de equipos.

    - **Reglas de negocio relevantes:**

      i.  El check-in de retorno seguro debe registrarse estrictamente
          antes del cumplimiento de la hora estimada más la ventana de
          tolerancia fijada para evitar el escalamiento automático de
          incidentes.

    - **Postcondiciones:** La expedición se archiva exitosamente en el
      historial de rutas finalizadas del senderista.

3.  **3. CUN-03: Coordinar y Ejecutar Operaciones de Rescate**

    - **Actor(es) de negocio:** Rescatista, Contacto de Emergencia.

    - Descripción breve: Al expirar los plazos de una expedición sin
      recibir confirmación del senderista, el negocio activa alertas
      automatizadas e inmediatas y centraliza la información crítica
      para orientar el despliegue del personal especializado de
      salvamento en las \"horas doradas\".

    - **Precondiciones:** El motor de control de plazos detecta una
      expedición activa cuyo tiempo de tolerancia expiró sin recibir un
      check-in de confirmación.

    - **Flujo básico:**

      i.  El sistema cambia el estado de la expedición a \"En Alerta\"
          de manera automática.

      ii. El sistema despacha notificaciones por correo electrónico a
          los contactos de emergencia vinculados con los detalles del
          itinerario declarado.

      iii. El sistema envía una ficha técnica de emergencia por correo
           electrónico a los cuerpos de rescate validados.

      iv. El rescatista visualiza la alerta en una consola visual
          clasificada por códigos de color según el riesgo.

      v.  El rescatista confirma la recepción de la alerta en la
          plataforma, registrando su usuario, fecha y hora.

      vi. El rescatista consulta la ficha detallada de la emergencia
          (itinerario, acompañantes y datos médicos autorizados).

      vii. El rescatista añade notas operativas en la bitácora del caso
           mientras se ejecutan las labores de búsqueda (Estados: En
           búsqueda, Localizado, Cerrado).

    - **Flujos alternativos:**

      i.  Filtrado Operativo por Zona: El rescatista interactúa con el
          panel de monitoreo y aplica filtros por sector, región o
          nevado específico para gestionar prioritariamente las alertas
          de su jurisdicción.

    - **Reglas de negocio relevantes:**

      i.  Acceso Condicional a Datos Sensibles: La ficha médica y los
          datos sensibles del senderista solo se revelarán y serán
          visibles para el rescatista si y solo si la expedición se
          encuentra en un estado de alerta crítica activa.

      ii. La validación de la identidad de los rescatistas se realiza
          mediante el contraste estricto contra un registro simulado de
          credenciales institucionales (ej. AGMP o MINCETUR) durante su
          registro inicial.

    - **Postcondiciones:** El caso de emergencia se cierra de forma
      trazable una vez que el rescatista ingresa la resolución final del
      incidente en la bitácora.

![](media/image16.png){width="5.979290244969379in"
height="3.2214468503937006in"}

## Por cada caso de uso de negocio, se debe realizar:

### Diagrama de caso de uso de sistema

> A diferencia del nivel de negocio, los Casos de Uso de Sistema (CUS)
> definen los requerimientos funcionales del software PWA/Web que
> implementará el equipo de desarrollo.
>
> **Actores del Sistema**

- **Senderista:** Usuario que opera la aplicación interactuando con los
  módulos de rutas, perfil de salud, contactos y check-in.

- **Rescatista:** Miembro validado de un cuerpo de salvamento que
  interactúa con la consola web para vigilar expediciones y coordinar
  casos de riesgo.

- **Sistema Cron / Scheduler:** Actor de soporte automatizado que evalúa
  continuamente el cumplimiento del tiempo en el servidor backend.

**Casos de Uso de Sistema (CUS)**

- **CUS-01:** Registrar Cuenta de Senderista.

- **CUS-02:** Registrar Cuenta de Rescatista (incluye la validación
  contra el servicio simulado de credenciales).

- **CUS-03:** Iniciar Sesión Seguro.

- **CUS-04:** Registrar Ubicación y Destino de Expedición.

- **CUS-05:** Registrar Ficha Médica y Consentimiento.

- **CUS-06:** Gestionar Contactos de Emergencia Frecuentes.

- **CUS-07:** Crear Plan de Expedición.

- **CUS-08:** Visualizar Temporizador de Expedición Activa.

- **CUS-09:** Registrar Check-in Manual de Retorno.

- **CUS-10:** Sincronizar Datos Completados Offline \<\<extend\>\> (se
  extiende de CUS-07 al recuperar señal).

- **CUS-11:** Validar Formato de Coordenadas Manuales \<\<include\>\>
  (incluido obligatoriamente en CUS-04 y CUS-07).

- **CUS-12:** Ejecutar Motor de Control de Plazos (cron job activado por
  el Scheduler del sistema).

- **CUS-13:** Despachar Alerta por Correo a Contactos de Emergencia
  \<\<include\>\> (incluido en la detección de retrasos de CUS-12).

- **CUS-14:** Despachar Alerta por Correo a Cuerpos de Rescate
  \<\<include\>\> (incluido en la detección de retrasos de CUS-12).

- **CUS-15:** Visualizar Panel Central de Monitoreo (Código de colores).

- **CUS-16:** Filtrar Expediciones por Zona.

- **CUS-17:** Confirmar Recepción de Alerta Crítica.

- **CUS-18:** Consultar Ficha de Emergencia Bloqueada (desbloqueo
  dinámico de datos de salud en alerta).

- **CUS-19:** Actualizar Bitácora y Cambiar Estado de Rescate.

- **CUS-20:** Consultar Historial de Expediciones Finalizadas.

- **CUS-21:** Solicitar Revocación o Anonimización de Datos (Derechos
  ARCO).

- **CUS-22:** Visualizar Notificación Preventiva de Retorno (30 minutos
  antes de expirar).

> **Mapeo de Casos de Uso de Sistema a Negocio**
>
> **CUN-01 (Planificar y Registrar Expedición Segura)** es soportado
> por: CUS-01, CUS-03, CUS-04, CUS-05, CUS-06, CUS-07, CUS-10, CUS-11,
> CUS-21.

![](media/image13.png){width="5.979290244969379in"
height="5.071192038495188in"}

> **CUN-02 (Verificar Retorno Seguro de Montaña)** es soportado por:
> CUS-08, CUS-09, CUS-20, CUS-22.

![](media/image22.png){width="6.010416666666667in"
height="2.6741940069991252in"}

> **CUN-03 (Coordinar y Ejecutar Operaciones de Rescate)** es soportado
> por: CUS-02, CUS-03, CUS-12, CUS-13, CUS-14, CUS-15, CUS-16, CUS-17,
> CUS-18, CUS-19.

![](media/image31.png){width="5.979290244969379in"
height="6.485130139982502in"}

### Diagramas de secuencia

![](media/image49.jpg){width="6.906373578302712in"
height="5.888711723534558in"}

### Diagrama de Clases

## Diagrama de base de datos del producto de software (relacional o no relacional)

## Diagrama de componentes del producto de software

## Diagrama de despliegue del producto de software

# Referencias Bibliográficas

Cadena SER. (2024, 17 de agosto). Los accidentes en la montaña se
disparan: Los equipos de rescate piden \"sentido común\". Radio Huesca.
[[https://cadenaser.com/aragon/2024/08/17/los-accidentes-en-la-montana-se-disparan-los-equipos-de-rescate-piden-sentido-comun-radio-huesca/]{.underline}](https://cadenaser.com/aragon/2024/08/17/los-accidentes-en-la-montana-se-disparan-los-equipos-de-rescate-piden-sentido-comun-radio-huesca/)

Infobae. (2025, 28 de junio). Muerte en el Huascarán y Artesonraju:
Cuatro montañistas perdieron la vida y otra quedó grave en una aventura
que terminó en tragedia.
[[https://www.infobae.com/peru/2025/06/28/muerte-en-el-huascaran-y-artesonraju-cuatro-montanistas-perdieron-la-vida-y-otra-quedo-grave-en-una-aventura-que-termino-en-tragedia/]{.underline}](https://www.infobae.com/peru/2025/06/28/muerte-en-el-huascaran-y-artesonraju-cuatro-montanistas-perdieron-la-vida-y-otra-quedo-grave-en-una-aventura-que-termino-en-tragedia/)

Socorro Andino Peruano. (2025). Lista de estadísticas de accidentes 2025
\[Informe en PDF\].
[[https://socorroandinoperuano.com/wp-content/uploads/2025/12/Lista-estadisticas-accidente_2025.pdf]{.underline}](https://socorroandinoperuano.com/wp-content/uploads/2025/12/Lista-estadisticas-accidente_2025.pdf)

# Coevaluación del Grupo

# Anexos

## Anexo A: Product Backlog e Historias de Usuario (Archivo Excel)

## Anexo B: Archivos Fuente de Modelos UML

## Anexo C: Declaración sobre uso de IA 

+:--------------+:------------+:----------------+:----------------+:-----------------+:---------+
| Sección del   | Herramienta | Propósito del   | Prompts         | Aporte personal  | Alumno   |
| Informe       | de IA       | Uso             | principales     | y validación     |          |
|               |             |                 | utilizados      | crítica          |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 1:   | Gemini 3    | Revisión        | \"Actúa como un | La IA propuso    | Marko    |
| Visión        |             | general del     | asesor de       | separar en dos   | Lopez    |
| General del   |             | capítulo para   | proyecto de     | párrafos el      |          |
| Proyecto      |             | correcciones de | desarrollo de   | propósito, esto  |          |
|               |             | escritura,      | software en un  | se validó porque |          |
|               |             | coherencia y    | ámbito          | segmenta bien el |          |
|               |             | generación de   | académico,      | problema y       |          |
|               |             | sugerencias en  | quiero que      | solución;        |          |
|               |             | base al         | realices una    | también cambiar  |          |
|               |             | contexto dado   | revisión        | el término       |          |
|               |             |                 | general de mi   | inteligente por  |          |
|               |             |                 | capítulo 1      | automatizado,    |          |
|               |             |                 | (sobre todo en  | esto se validó   |          |
|               |             |                 | escritura,      | porque el        |          |
|               |             |                 | coherencia) y   | término          |          |
|               |             |                 | haz sugerencias | inteligente      |          |
|               |             |                 | en base al      | sugiere uso de   |          |
|               |             |                 | contexto.\"     | ML predictivo y  |          |
|               |             |                 |                 | no es requisito  |          |
|               |             |                 |                 | del sistema,     |          |
|               |             |                 |                 | podría ser un    |          |
|               |             |                 |                 | agregado pero no |          |
|               |             |                 |                 | es crítico.      |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capitulo 2:   | Gemini 3    | Brainstorming   | \"Actúa como un | La validación    | Yahel    |
|               |             | para            | senderista      | consiste en      | Córdova  |
| Empathy map - |             | generar/actuar  | experto en      | contrastar estos |          |
| Senderista    |             | como senderista | rutas de Cusco  | resultados con   |          |
|               |             | experimentado   | y Huaraz,       | la realidad      |          |
|               |             | para tener una  | analiza la      | operativa y      |          |
|               |             | idea de cómo    | propuesta       | técnica,         |          |
|               |             | abordar los     | técnica y       | evaluando si el  |          |
|               |             | puntos del      | funcional de    | software es      |          |
|               |             | empathy map     | TrekSafe y      | viable ante      |          |
|               |             |                 | genera las      | factores como el |          |
|               |             |                 | dimensiones de  | impacto del frío |          |
|               |             |                 | un Mapa de      | en las baterías, |          |
|               |             |                 | Empatía ---qué  | la falta de      |          |
|               |             |                 | piensa, siente, | conectividad y   |          |
|               |             |                 | ve, dice, hace  | la capacidad de  |          |
|               |             |                 | y escucha,      | respuesta real   |          |
|               |             |                 | junto con       | de las           |          |
|               |             |                 | dolores y       | autoridades      |          |
|               |             |                 | ganancias---    | locales para     |          |
|               |             |                 | para validar la | evitar una falsa |          |
|               |             |                 | experiencia del | sensación de     |          |
|               |             |                 | usuario en      | seguridad.       |          |
|               |             |                 | entornos de     |                  |          |
|               |             |                 | alta montaña.\" |                  |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capitulo 2:   | Chat GPT    | Brainstorming   | "Actúa como un  | Se revisaron y   | Ariana   |
|               | 5.5         | para            | rescatista      | ajustaron los    | Blanco   |
| Empathy map - |             | generar/actuar  | especializado   | resultados para  |          |
| Rescatista    |             | como rescatista | en montaña y    | alienarlos con   |          |
|               |             | experimentado   | genera un       | el contexto real |          |
|               |             | para tener una  | empathy map     | del proyecto     |          |
|               |             | idea de cómo    | considerando    | TrekSafe. Se     |          |
|               |             | abordar los     | qué piensa,     | eliminaron       |          |
|               |             | pains,          | siente,         | elementos        |          |
|               |             | necesidades,    | escucha, ve y   | irreales o fuera |          |
|               |             | comportamientos | cuáles son sus  | del alcance      |          |
|               |             | y expectativas  | frustraciones   | académico.       |          |
|               |             | del empathy map | en situaciones  |                  |          |
|               |             |                 | de emergencia." |                  |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 2:   | Chat GPT    | Organización    | "Usa la         | La estructura,   | Ariana   |
|               |             | visual y        | plantilla de    | contenido y      | Blanco   |
| Product       | 5.5         | adaptación del  | Product Vision  | priorización de  |          |
| Vision Board  |             | contenido en la | Board de Roman  | necesidades,     |          |
|               |             | plantilla de    | Pichler y       | funcionalidades  |          |
|               |             | Product Vision  | organiza        | y objetivos      |          |
|               |             | Board de Roman  | visualmente la  | fueron definidos |          |
|               |             | Pichler.        | información     | por el equipo.   |          |
|               |             |                 | presentada en   | La IA únicamente |          |
|               |             |                 | las secciones   | se utilizó como  |          |
|               |             |                 | Vision, Target, | apoyo para       |          |
|               |             |                 | Needs, Product  | distribuir y     |          |
|               |             |                 | y Business      | presentar la     |          |
|               |             |                 | Goals."         | información      |          |
|               |             |                 |                 | dentro de la     |          |
|               |             |                 |                 | plantilla        |          |
|               |             |                 |                 | seleccionada.    |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 2:   | Chat GPT    | Organización    | "Organiza el    | La priorización  | Manuel   |
|               | 5.5         | visual del      | product roadmap | de               | Llaury   |
| Product       |             | roadmap en la   | de TrekSafe en  | funcionalidades, |          |
| Roadmap       |             | plantilla y     | una plantilla   | distribución por |          |
|               |             | apoyo para      | visual dividida | releases y       |          |
|               |             | evaluar qué     | por release y   | definición del   |          |
|               |             | funcionalidades | ayúdame a       | alcance fueron   |          |
|               |             | eran viables    | identificar qué | realizadas por   |          |
|               |             | dentro del      | funcionalidades | el equipo en     |          |
|               |             | tiempo          | son realizables | base a las       |          |
|               |             | disponible del  | dentro del      | restricciones    |          |
|               |             | proyecto        | tiempo          | académicas y     |          |
|               |             |                 | estimado"       | técnicas del     |          |
|               |             |                 |                 | proyecto. La IA  |          |
|               |             |                 |                 | se utilizó       |          |
|               |             |                 |                 | únicamente como  |          |
|               |             |                 |                 | apoyo visual y   |          |
|               |             |                 |                 | para validar la  |          |
|               |             |                 |                 | viabilidad       |          |
|               |             |                 |                 | general de las   |          |
|               |             |                 |                 | funcionalidades  |          |
|               |             |                 |                 | propuestas.      |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 2 y  | Chat GPT    | Revisión del    | "Actúa como un  | La IA halló      | Leonardo |
| Alcance del   | 5.5         | contenido en    | asesor de       | pequeñas         | Ormeño   |
| proyecto      |             | general y en    | proyecto de     | redundancias en  |          |
|               |             | específico los  | desarrollo de   | el texto junto   |          |
|               |             | alcances, para  | software en un  | con              |          |
|               |             | correcciones de | ámbito          | Oportunidades de |          |
|               |             | escritura,      | académico,      | mejora en el     |          |
|               |             | coherencia y    | quiero que      | apartado del     |          |
|               |             | generación de   | realices una    | alcance, se      |          |
|               |             | sugerencias en  | revisión        | validó y se      |          |
|               |             | base al         | general de mi   | reforzó la       |          |
|               |             | contexto dado   | capítulo 2 en   | conexión con el  |          |
|               |             |                 | el apartado de  | problema de      |          |
|               |             |                 | alcance sobre   | usuario          |          |
|               |             |                 | todo en         | mencionando su   |          |
|               |             |                 | escritura y     | impacto.         |          |
|               |             |                 | coherencia y    |                  |          |
|               |             |                 | haz sugerencias |                  |          |
|               |             |                 | en base al      |                  |          |
|               |             |                 | trabajo y su    |                  |          |
|               |             |                 | rúbrica ."      |                  |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 2:   | Gemini 3    | Revisión del    | "Actúa como un  | La ia encontró   | Marko    |
|               |             | contenido del   | asesor de       | errores          | Lopez    |
| DoR y DoD     |             | Definition of   | proyecto de     | ortográficos,    |          |
|               |             | Ready y         | desarrollo de   | fueron           |          |
|               |             | Definition of   | software en un  | corregidos en    |          |
|               |             | Done y          | ámbito          | base a su        |          |
|               |             | sugerencia de   | académico,      | sugerencia;      |          |
|               |             | formato para    | quiero que      | encontró         |          |
|               |             | mejorar la      | realices una    | ausencia de RCs  |          |
|               |             | escritura y     | revisión        | y redundancia en |          |
|               |             | coherencia      | específica de   | las DODs, las    |          |
|               |             |                 | mi DoR y DoD    | cuales se        |          |
|               |             |                 | (sobre todo en  | revisaron        |          |
|               |             |                 | escritura,      | nuevamente para  |          |
|               |             |                 | coherencia y    | ser corregidas   |          |
|               |             |                 | contenido) y    | con ayuda de la  |          |
|               |             |                 | haz sugerencias | sugerencia de la |          |
|               |             |                 | en base al      | IA.              |          |
|               |             |                 | contexto dado   |                  |          |
|               |             |                 | anteriormente"  |                  |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+
| Capítulo 1:   | Chat GPT    | Revisión del    | "Actúa como un  | La IA sugirió    | Yahel    |
| Supuestos y   | 5.5         | contenido de    | asesor de       | mejorar la       | Córdova  |
| restricciones |             | supuestos y     | proyecto de     | redacción y      |          |
|               |             | restricciones   | desarrollo de   | precisión        |          |
|               |             | para            | software en un  | técnica de la    |          |
|               |             | sugerencias de  | ámbito          | sección          |          |
|               |             | formato para    | académico,      | "Supuestos y     |          |
|               |             | mejorar         | quiero que      | Restricciones",  |          |
|               |             | escritura y     | realices una    | utilizando un    |          |
|               |             | coherencia      | revisión        | lenguaje más     |          |
|               |             |                 | general de mi   | formal y         |          |
|               |             |                 | capítulo 1      | consistente con  |          |
|               |             |                 | (sobre todo en  | el contexto      |          |
|               |             |                 | escritura,      | académico del    |          |
|               |             |                 | coherencia) y   | proyecto.        |          |
|               |             |                 | haz sugerencias | También          |          |
|               |             |                 | en base al      | recomendó        |          |
|               |             |                 | trabajo y su    | detallar mejor   |          |
|               |             |                 | rúbrica."       | el impacto de    |          |
|               |             |                 |                 | algunas          |          |
|               |             |                 |                 | restricciones,   |          |
|               |             |                 |                 | agregar          |          |
|               |             |                 |                 | consideraciones  |          |
|               |             |                 |                 | relacionadas con |          |
|               |             |                 |                 | la conectividad  |          |
|               |             |                 |                 | en zonas de      |          |
|               |             |                 |                 | montaña y        |          |
|               |             |                 |                 | reforzar la      |          |
|               |             |                 |                 | claridad entre   |          |
|               |             |                 |                 | el alcance del   |          |
|               |             |                 |                 | MVP y las        |          |
|               |             |                 |                 | limitaciones     |          |
|               |             |                 |                 | técnicas         |          |
|               |             |                 |                 | definidas. Estas |          |
|               |             |                 |                 | sugerencias      |          |
|               |             |                 |                 | fueron revisadas |          |
|               |             |                 |                 | y adaptadas por  |          |
|               |             |                 |                 | el equipo según  |          |
|               |             |                 |                 | el contexto real |          |
|               |             |                 |                 | del proyecto     |          |
|               |             |                 |                 | TrekSafe.        |          |
+---------------+-------------+-----------------+-----------------+------------------+----------+

## Anexo D: Evidencias Fotográficas del uso de IA

## ![](media/image4.png){width="6.291010498687664in" height="4.486111111111111in"}![](media/image36.png){width="6.291010498687664in" height="4.625in"}

![](media/image8.png){width="6.291010498687664in"
height="5.930555555555555in"}

![](media/image19.png){width="6.291010498687664in"
height="2.7916666666666665in"}

![](media/image7.png){width="6.291010498687664in"
height="2.5277777777777777in"}

![](media/image3.png){width="6.291010498687664in"
height="2.1666666666666665in"}

![](media/image12.png){width="6.291010498687664in"
height="2.986111111111111in"}

![](media/image9.png){width="6.291010498687664in"
height="3.0694444444444446in"}

![](media/image15.png){width="6.291010498687664in"
height="4.347222222222222in"}

![](media/image25.png){width="6.291010498687664in"
height="5.166666666666667in"}

[[https://docs.google.com/document/d/1NnxFHGuZH6xdqhdpLjwVIY0x620bE3cl3igj5gSLAvE/edit?usp=sharing]{.underline}](https://docs.google.com/document/d/1NnxFHGuZH6xdqhdpLjwVIY0x620bE3cl3igj5gSLAvE/edit?usp=sharing)
