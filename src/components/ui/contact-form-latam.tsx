"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Sistema self-hosted - No necesita emailjs
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { trackLeadFormStart, trackLeadFormSubmit, trackWhatsAppClick } from '@/lib/analytics';
import { validateWhatsAppNumber, formatWhatsAppNumber, generateWhatsAppMessage } from '@/lib/whatsapp-utils';

interface ContactFormData {
  name: string;
  whatsapp: string;
  businessType: string;
  projectDetails: string;
  budget: string;
  timeline: string;
  company: string;
}

const businessTypes = [
  { value: 'restaurante', label: '🍕 Restaurante/Gastronomía' },
  { value: 'ecommerce', label: '🛒 Tienda Online/E-commerce' },
  { value: 'servicios', label: '💼 Servicios Profesionales' },
  { value: 'retail', label: '🏪 Retail/Comercio' },
  { value: 'inmobiliaria', label: '🏢 Inmobiliaria' },
  { value: 'salud', label: '⚕️ Salud/Medicina' },
  { value: 'educacion', label: '📚 Educación' },
  { value: 'startup', label: '🚀 Startup/Emprendimiento' },
  { value: 'corporativo', label: '🏛️ Empresa Corporativa' },
  { value: 'otro', label: '📋 Otro' }
];

const budgetRanges = [
  { value: '99-500', label: '$99 - $500 USD' },
  { value: '500-1500', label: '$500 - $1,500 USD' },
  { value: '1500-5000', label: '$1,500 - $5,000 USD' },
  { value: '5000-plus', label: '$5,000+ USD' },
  { value: 'consultar', label: 'Prefiero consultar' }
];

const timelines = [
  { value: '1-semana', label: 'Urgente (1 semana)' },
  { value: '2-4-semanas', label: 'Rápido (2-4 semanas)' },
  { value: '1-3-meses', label: 'Normal (1-3 meses)' },
  { value: 'flexible', label: 'Flexible' }
];

export default function ContactFormLatam() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    whatsapp: '',
    businessType: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    company: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // Delay external fetch to avoid hydration issues
    const timer = setTimeout(() => {
      // Detect user country for WhatsApp validation (non-blocking)
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => setUserCountry(data.country_code?.toLowerCase() || ''))
        .catch(() => setUserCountry(''));

      // Track form start
      trackLeadFormStart({
        form_type: 'contact_latam',
        form_location: 'contact_section',
        source: 'organic'
      });
    }, 100); // Small delay to ensure hydration is complete

    return () => clearTimeout(timer);
  }, []);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'El WhatsApp es obligatorio';
    } else if (!validateWhatsAppNumber(formData.whatsapp, userCountry)) {
      newErrors.whatsapp = 'Formato de WhatsApp inválido. Incluye código de país (+52, +54, etc.)';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Selecciona el tipo de negocio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para enviar emails usando sistema self-hosted
  const sendEmails = async (isStep1: boolean = true) => {
    try {
      setEmailError('');
      
      const mensaje = isStep1 ? 
        `Contacto rápido desde formulario paso 1.
Tipo de negocio: ${businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType}` :
        `Solicitud de presupuesto detallado:
Empresa: ${formData.company || 'No especificado'}
Proyecto: ${formData.projectDetails || 'No especificado'}
Presupuesto: ${formData.budget ? (budgetRanges.find(b => b.value === formData.budget)?.label || formData.budget) : 'No especificado'}
Timeline: ${formData.timeline ? (timelines.find(t => t.value === formData.timeline)?.label || formData.timeline) : 'No especificado'}
Tipo de negocio: ${businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType}`;

      // Crear un email placeholder válido basado en el WhatsApp
      const whatsappClean = formData.whatsapp.replace(/[^\d]/g, '');
      const placeholderEmail = `${whatsappClean}@whatsapp.codigofacil.com`;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: placeholderEmail, // Email placeholder válido
          telefono: formData.whatsapp,
          empresa: formData.company || undefined,
          mensaje: mensaje,
          tipo: 'contact_form'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailSent(true);
        console.log('✅ Email enviado correctamente:', result.message);
      } else {
        console.warn('⚠️ Error en API de email:', result.message);
        setEmailError('Email no enviado, pero continuaremos por WhatsApp.');
      }
      
    } catch (error) {
      console.error('❌ Error enviando emails:', error);
      setEmailError('Error al enviar email. Continuaremos por WhatsApp.');
      // No bloquear el flujo de WhatsApp si falla el email
    }
  };

  const handleWhatsAppDirect = async () => {
    if (!validateStep1()) return;

    setIsSubmitting(true);

    // Enviar emails en paralelo con WhatsApp
    await sendEmails(true);

    const message = generateWhatsAppMessage({
      name: formData.name,
      businessType: businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType,
      source: 'contact_form_step1'
    });

    trackWhatsAppClick({
      phone_number: '+56950225491',
      click_location: 'contact_form_step1',
      message_type: 'quick_contact',
      conversion_value: 15
    });

    window.open(`https://wa.me/56950225491?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitting(false);
  };

  const handleStep2Continue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleDetailedQuote = async () => {
    setIsSubmitting(true);

    try {
      // Enviar emails con información completa
      await sendEmails(false);

      const detailedMessage = generateWhatsAppMessage({
        name: formData.name,
        businessType: businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType,
        projectDetails: formData.projectDetails,
        budget: budgetRanges.find(b => b.value === formData.budget)?.label,
        timeline: timelines.find(t => t.value === formData.timeline)?.label,
        company: formData.company,
        source: 'contact_form_step2'
      });

      trackLeadFormSubmit({
        form_type: 'contact_latam_detailed',
        form_location: 'contact_section',
        source: 'detailed_quote'
      });

      trackWhatsAppClick({
        phone_number: '+56950225491',
        click_location: 'contact_form_step2',
        message_type: 'detailed_quote',
        conversion_value: 25
      });

      window.open(`https://wa.me/56950225491?text=${encodeURIComponent(detailedMessage)}`, '_blank');
    } catch (error) {
      console.error('Error sending detailed quote:', error);
      setEmailError('Error al procesar. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-lg p-6 shadow-lg"
      >
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Paso {step} de 2</span>
            <span>{step === 1 ? 'Información básica' : 'Presupuesto detallado'}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '50%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">¡Hablemos de tu proyecto! 🚀</h3>
                <p className="text-muted-foreground">
                  Solo necesitamos 3 datos para comenzar
                </p>
              </div>

              {/* Step 1: Basic Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Tu nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Ej: María García"
                    className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-medium">
                    WhatsApp (con código de país) *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateFormData('whatsapp', formatWhatsAppNumber(e.target.value, userCountry))}
                    placeholder={
                      userCountry === 'mx' ? '+52 55 1234 5678' : 
                      userCountry === 'ar' ? '+54 11 1234 5678' : 
                      userCountry === 'co' ? '+57 300 1234 567' : 
                      userCountry === 'pe' ? '+51 987 654 321' : 
                      userCountry === 'cl' ? '+56 9 1234 5678' : 
                      userCountry === 'br' ? '+55 11 91234 5678' : 
                      userCountry === 've' ? '+58 412 1234567' : 
                      userCountry === 'cu' ? '+53 5123 4567' : 
                      userCountry === 'ec' ? '+593 99 123 4567' : 
                      userCountry === 'uy' ? '+598 99 123 456' : 
                      userCountry === 'py' ? '+595 981 123 456' : 
                      userCountry === 'bo' ? '+591 7 123 4567' : 
                      userCountry === 'gt' ? '+502 5555 1234' : 
                      userCountry === 'cr' ? '+506 8123 4567' : 
                      userCountry === 'pa' ? '+507 6123 4567' : 
                      userCountry === 'do' ? '+1809 123 4567' : 
                      '+56 9 1234 5678'
                    }
                    className={`mt-1 ${errors.whatsapp ? 'border-red-500' : ''}`}
                    aria-describedby={errors.whatsapp ? "whatsapp-error" : "whatsapp-help"}
                  />
                  <p id="whatsapp-help" className="text-xs text-muted-foreground mt-1">
                    Incluye el código de país (+52 México, +54 Argentina, +57 Colombia, +51 Perú, +55 Brasil, +53 Cuba, etc.)
                  </p>
                  {errors.whatsapp && (
                    <p id="whatsapp-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-sm font-medium">
                    Tipo de negocio *
                  </Label>
                  <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
                    <SelectTrigger className={`mt-1 ${errors.businessType ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Selecciona tu tipo de negocio" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.businessType}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Status Messages */}
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800"
                >
                  ✅ <strong>Email enviado correctamente</strong> - Te contactaremos pronto!
                </motion.div>
              )}

              {emailError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800"
                >
                  ⚠️ {emailError}
                </motion.div>
              )}

              {/* CTAs Step 1 */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleWhatsAppDirect}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    '📱 Hablar por WhatsApp ahora'
                  )}
                </Button>
                
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">o si prefieres</span>
                </div>
                
                <Button 
                  onClick={handleStep2Continue}
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full py-3 disabled:opacity-50"
                  size="lg"
                >
                  💰 Quiero presupuesto detallado
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Perfecto, {formData.name}! 💼</h3>
                <p className="text-muted-foreground">
                  Cuéntanos más detalles para un presupuesto exacto
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="company" className="text-sm font-medium">
                    Nombre de la empresa (opcional)
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    placeholder="Ej: Mi Empresa S.A."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="projectDetails" className="text-sm font-medium">
                    Describe tu proyecto
                  </Label>
                  <Textarea
                    id="projectDetails"
                    value={formData.projectDetails}
                    onChange={(e) => updateFormData('projectDetails', e.target.value)}
                    placeholder="Ej: Necesito una página web para mi restaurante con menú online y sistema de pedidos..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-sm font-medium">
                    Presupuesto aproximado
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un rango de presupuesto" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium">
                    ¿Cuándo necesitas el proyecto?
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Email Status Messages Step 2 */}
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800"
                >
                  ✅ <strong>Presupuesto enviado por email</strong> - Te contactaremos en las próximas 2 horas!
                </motion.div>
              )}

              {emailError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800"
                >
                  ⚠️ {emailError}
                </motion.div>
              )}

              {/* CTAs Step 2 */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleDetailedQuote}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    '🎯 Solicitar presupuesto exacto'
                  )}
                </Button>
                
                <Button 
                  onClick={() => setStep(1)}
                  variant="ghost"
                  className="w-full"
                >
                  ← Volver atrás
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Signals */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              ✅ Respuesta en menos de 2 horas
            </span>
            <span className="flex items-center gap-1">
              ✅ Presupuesto sin compromiso
            </span>
            <span className="flex items-center gap-1">
              ✅ +500 proyectos exitosos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}