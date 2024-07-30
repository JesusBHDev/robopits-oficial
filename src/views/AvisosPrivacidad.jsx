// AvisosPrivacidad.jsx

import React from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import '../css/AvisosPrivacidad.css'; // Asegúrate de tener tu archivo CSS correspondiente

const AvisosPrivacidad = () => {
    return (
        <div>
            <HeaderInicio/>
            <div className="avisos-privacidad-container">
                <h2 className="titulo-seccion">Políticas de Privacidad y Seguridad</h2>

                {/* Políticas de Privacidad y Seguridad completas */}
                <div className="seccion">
                    <h3 className="subtitulo-seccion">1. Recopilación de Datos</h3>
                    <p className="parrafo">
                        Recopilamos información personal solo cuando es estrictamente necesario para la funcionalidad de nuestros servicios. Esto incluye, pero no se limita a, nombre, dirección de correo electrónico y dirección física.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">2. Uso de la Información</h3>
                    <p className="parrafo">
                        La información recopilada se utiliza exclusivamente para procesar transacciones, mejorar la experiencia del usuario y comunicar novedades o cambios en nuestros servicios.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">3. Consentimiento del Usuario</h3>
                    <p className="parrafo">
                        Al crear una cuenta, los usuarios deben consentir expresamente el uso de su información personal de acuerdo con estas políticas.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">4. Protección de Datos</h3>
                    <p className="parrafo">
                        Implementamos medidas de seguridad estándar y avanzadas para proteger los datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">5. Autenticación con JWT</h3>
                    <p className="parrafo">
                        Utilizamos JSON Web Token para manejar la autenticación y la sesión de los usuarios. Los JWT son generados de manera segura y almacenados de forma segura en el lado del cliente.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">6. Encriptación</h3>
                    <p className="parrafo">
                        Toda la información sensible, incluidas las contraseñas y los datos de pago, se encripta utilizando tecnología de cifrado de última generación antes de su almacenamiento y transmisión.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">7. Control de Acceso</h3>
                    <p className="parrafo">
                        El acceso a información sensible está estrictamente limitado a empleados autorizados que necesitan conocer esa información para procesarla en nuestro nombre.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">8. Revisión de Seguridad</h3>
                    <p className="parrafo">
                        Realizamos revisiones periódicas de seguridad y actualizaciones de nuestro sistema para garantizar que todas las medidas de seguridad están actualizadas y son efectivas.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">9. Protección contra CSRF y XSS</h3>
                    <p className="parrafo">
                        Implementamos medidas para proteger contra ataques de Cross-Site Request Forgery (CSRF) y Cross-Site Scripting (XSS) para asegurar la integridad de las sesiones de nuestros usuarios y la seguridad de nuestros datos.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">10. Política de Cookies</h3>
                    <p className="parrafo">
                        Usamos cookies para mejorar la experiencia del usuario y analizar el tráfico del sitio. Nuestra política de cookies se explica detalladamente y es accesible para todos los usuarios.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">11. Transparencia en el Procesamiento</h3>
                    <p className="parrafo">
                        Informamos a los usuarios sobre cómo y por qué procesamos sus datos. Esta información está disponible de forma clara y accesible.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">12. Derechos de los Usuarios</h3>
                    <p className="parrafo">
                        Los usuarios pueden acceder, corregir o solicitar la eliminación de su información personal en cualquier momento.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">13. Notificación de Brechas de Seguridad</h3>
                    <p className="parrafo">
                        En caso de una brecha de seguridad, notificaremos a los usuarios afectados y a las autoridades pertinentes conforme a la ley aplicable dentro de las 72 horas.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">14. Retención de Datos</h3>
                    <p className="parrafo">
                        Retenemos información personal solo durante el tiempo necesario para cumplir con los propósitos para los cuales se recopiló.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">15. Terceros y Compartir Datos</h3>
                    <p className="parrafo">
                        No compartimos información personal con terceros, excepto cuando es necesario para proporcionar servicios a los usuarios o cumplir con la ley.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">16. Responsabilidad de Datos</h3>
                    <p className="parrafo">
                        Somos responsables de mantener la integridad y seguridad de los datos personales que recopilamos.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">17. Auditorías de Seguridad</h3>
                    <p className="parrafo">
                        Realizamos auditorías de seguridad regulares para evaluar y mejorar nuestras prácticas de seguridad.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">18. Formación en Seguridad</h3>
                    <p className="parrafo">
                        Ofrecemos formación periódica sobre seguridad de la información a todos los empleados para asegurar que estén informados sobre las mejores prácticas y procedimientos.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">19. Cumplimiento Legal</h3>
                    <p className="parrafo">
                        Nos aseguramos de que todas nuestras prácticas de recopilación y procesamiento de datos cumplan con las leyes y regulaciones de privacidad aplicables.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">20. Modificaciones a las Políticas de Privacidad</h3>
                    <p className="parrafo">
                        Nos reservamos el derecho de modificar estas políticas en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">Última actualización: [Fecha]</h3>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default AvisosPrivacidad;
