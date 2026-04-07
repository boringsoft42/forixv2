/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from 'motion/react';
import articleOneMarkdown from '../articulo_1.md?raw';
import articleTwoMarkdown from '../articulo_2.md?raw';
import articleThreeMarkdown from '../articulo_3.1.md?raw';
import {
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  Users,
  Brain,
  ShieldCheck,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Pencil,
  Plus,
  ScanEye,
  AudioLines,
  BookOpen,
  Fingerprint,
  Compass,
  PenTool,
  Activity,
  BarChart3,
  GraduationCap,
  Briefcase,
  ChevronUp
} from 'lucide-react';

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'hr' };

type ArticleData = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  readingTime: string;
  lede?: string;
  quote?: string;
  sections?: ArticleSection[];
  closingQuestion?: string;
  blocks?: ArticleBlock[];
};

const getArticleView = (slug: string) => `articulo:${slug}`;

const ARTICLES: ArticleData[] = [
  {
    slug: 'hemorragia-silenciosa',
    category: 'CXM',
    title: 'La hemorragia silenciosa',
    subtitle: 'Por que su estrategia de crecimiento esta muriendo en el balance financiero',
    summary: 'La desercion de clientes no siempre aparece en la contabilidad, pero destruye caja, margen y valor futuro con una velocidad brutal.',
    readingTime: '9 min lectura',
    lede: 'Muchos lideres creen que su negocio esta sano mientras la caja registradora siga sonando. El problema es que gran parte de ese ingreso nuevo solo compensa a los clientes que ya se fueron. Sin una lectura seria de la desercion, la empresa no crece: apenas tapa fugas.',
    quote: 'Reducir las deserciones en apenas un cinco a diez por ciento puede, literalmente, duplicar la rentabilidad de su compania.',
    sections: [
      {
        heading: 'El agujero en la base de la copa',
        paragraphs: [
          'El crecimiento comercial puede parecer vigoroso y aun asi esconder una falla estructural. Cuando la organizacion invierte fuerte en marketing y ventas, pero el nivel de resultados no sube, el problema suele estar en la fuga de clientes que abandonan la relacion en silencio.',
          'La desercion funciona como una hemorragia financiera: erosiona utilidad, obliga a gastar mas para reponer volumen y distorsiona la lectura real del negocio. La contabilidad registra el ingreso, pero no suele mostrar con claridad cuanto valor se evapora cuando un cliente deja de volver.'
        ]
      },
      {
        heading: 'La trampa del crecimiento lineal',
        paragraphs: [
          'Cuando una empresa se propone crecer 20% y solo logra 11%, el error tipico es culpar a ventas o al mercado. En realidad, esa brecha suele reflejar la perdida neta provocada por clientes que abandonaron el camino.',
          'Mientras existan deserciones importantes, cada cliente nuevo financia mantenimiento, no expansion. Crecer sobre una base que pierde clientes de forma recurrente es como llenar un colador: hay esfuerzo, pero no acumulacion.'
        ]
      },
      {
        heading: 'El silencio del cliente no es satisfaccion',
        paragraphs: [
          'Una de las falsas seguridades mas peligrosas es asumir que la ausencia de reclamos significa que todo va bien. En experiencia de cliente, muchas veces ocurre lo contrario: quien no se queja ya perdio la esperanza de ser escuchado.',
          'El problema es que la mayor parte de los clientes insatisfechos no protesta. Simplemente se va, no vuelve, no recomienda y deja de invertir energia emocional en la marca.'
        ],
        bullets: [
          'Solo una minoria de clientes insatisfechos expresa formalmente su molestia.',
          'La gran masa silenciosa representa la zona ciega donde nace la perdida futura.',
          'En sectores de recompra es abandono directo; en sectores de compra esporadica se refleja en falta de testimonio y referidos.'
        ]
      },
      {
        heading: 'VMN: el valor real que se destruye',
        paragraphs: [
          'Pensar en la perdida como una venta fallida del dia es una mirada demasiado pobre. La lectura correcta no se limita a la transaccion; debe medir la utilidad potencial que ese cliente habria generado durante toda su vida de relacion con la marca.',
          'Por eso el Valor Marginal Neto cambia la conversacion. Un cliente que parecia representar una compra de Bs. 100 en realidad puede concentrar miles de bolivianos en utilidad futura. Cuando se va, no cae solo una venta: desaparece una linea completa de rentabilidad esperada.'
        ],
        bullets: [
          'Transaccion promedio del caso: Bs. 100.',
          'Utilidad bruta estimada: Bs. 60.',
          'Frecuencia anual: 6 compras.',
          'Vida potencial de relacion: 20 anos.',
          'Perdida proyectada: Bs. 7,200 en ganancias futuras.'
        ]
      },
      {
        heading: 'El mito del precio',
        paragraphs: [
          'Muchos equipos justifican la salida de clientes diciendo que el mercado se volvio mas barato. Sin embargo, la evidencia usada en el documento apunta a otra conclusion: los clientes se van mucho mas por mal servicio, indolencia, burocracia y falta de seguimiento que por precio puro.',
          'El precio domina la conversacion cuando la empresa no logra construir valor percibido. Si el equipo no comprende el costo total de una falla de servicio, tampoco sentira urgencia para corregir fricciones que parecen pequenas pero expulsan valor.'
        ]
      },
      {
        heading: 'Sin datos compartidos no hay correccion',
        paragraphs: [
          'La desercion suele quedar encerrada en Finanzas o en reportes a los que casi nadie accede. Esa opacidad mata la accion. Si los equipos no ven el costo economico de perder clientes, la experiencia queda reducida a discurso bonito sin tension operativa real.',
          'La colaboracion entre CX y Finanzas permite convertir un problema abstracto en una prioridad de supervivencia. Medir el costo anual por deserciones y el valor marginal neto vuelve visible el dolor y, por fin, activa decisiones serias.'
        ]
      }
    ],
    closingQuestion: 'Sabe exactamente cuanto dinero se esta escurriendo hoy entre sus dedos por los clientes que decidieron no volver?'
  },
  {
    slug: 'empresa-wow',
    category: 'Estrategia',
    title: 'Empresa WOW',
    subtitle: 'Por que tus clientes no son fans todavia y como cambiarlo',
    summary: 'Las empresas memorables no operan como un sistema transaccional. Disenan vinculo, eliminan friccion y convierten cada punto de contacto en una fabrica de confianza.',
    readingTime: '10 min lectura',
    lede: 'En un mercado hipercompetitivo, el punto medio casi no existe. O su empresa se vuelve intercambiable, o construye una experiencia tan intencional que la relacion deja de depender del precio. Ese es el salto entre vender y fabricar fanatismo.',
    quote: 'La diferencia no es el producto, es el vinculo. Mientras las marcas promedio acumulan registros en una base de datos, las Empresas WOW cultivan capital emocional.',
    sections: [
      {
        heading: 'De clientes a fanaticos',
        paragraphs: [
          'El documento plantea una diferencia clave: el cliente ejecuta una transaccion; el fan invierte emocion, identidad y defensa activa. Esa capa emocional es la que vuelve resiliente a la marca frente a errores, crisis y comparaciones de precio.',
          'Una empresa WOW no persigue solo compra repetida. Busca que el cliente sienta pertenencia. Cuando eso ocurre, la recomendacion fluye, la tolerancia al error aumenta y la competencia deja de competir solo por descuento.'
        ]
      },
      {
        heading: 'Los Momentos WOW no ocurren por accidente',
        paragraphs: [
          'Un Momento WOW es una interaccion en la que el cliente sale mas feliz de lo que entro. La clave no esta en la improvisacion heroica de una persona amable, sino en una estrategia deliberada que disena esos puntos de contacto de forma repetible.',
          'Si la alta gerencia no toma responsabilidad por ese diseno, la experiencia cae en la mediocridad operativa. La empresa termina reaccionando caso por caso, en lugar de construir una maquinaria consistente de satisfaccion.'
        ]
      },
      {
        heading: 'La caceria de reglas estupidas',
        paragraphs: [
          'La experiencia extraordinaria exige limpiar la estructura interna. Las llamadas reglas estupidas y vacas sagradas son politicas que sobreviven por inercia, miedo o exceso de control, pero que le hacen la vida mas dificil al cliente.',
          'El liderazgo tiene que preguntarse con brutal honestidad que tramites, autorizaciones y respuestas automaticas existen solo para proteger procesos internos. Toda friccion innecesaria es una invitacion a que el cliente se vaya.'
        ],
        bullets: [
          'Que genera enojo o frustracion de forma repetida?',
          'Que politica existe por exceso de cautela y no por sentido comun?',
          'Que cinco reglas no agregan valor y le caen mal a todo el mundo?',
          'Donde vive la burrocracia que impide una experiencia deliciosa?'
        ]
      },
      {
        heading: 'La cultura no vive en la pared',
        paragraphs: [
          'La cultura de servicio no es la frase impresa en recepcion. Es lo que el equipo comenta en el cafe, la forma en que se toman decisiones cuando no hay supervision y el comportamiento que se normaliza todos los dias.',
          'Por eso el servicio extraordinario no se instala con un taller aislado. Requiere una construccion deliberada desde la direccion, acompanada de repeticion, ejemplo y refuerzo sostenido.'
        ]
      },
      {
        heading: 'Hardware y software de la experiencia',
        paragraphs: [
          'El texto divide la experiencia en dos planos inseparables. El hardware son las estructuras: sistemas, procesos, politicas y recorridos que deben reducir friccion. El software son las personas: criterio, empatia, escucha, capacidad tecnica y poder de resolver.',
          'Si el hardware esta roto, hasta el mejor colaborador se estrella contra la burocracia. Si el software es debil, ningun proceso logra emocionar ni resolver en serio. Una Empresa WOW necesita ambas capas funcionando a la vez.'
        ]
      },
      {
        heading: 'La regla de los 4 a 6 meses',
        paragraphs: [
          'La cultura no se congela. Se oxida. El articulo insiste en que la obsesion por el cliente debe pulirse de manera periodica, con entrenamientos recurrentes cada cuatro a seis meses para evitar que la organizacion vuelva al piloto automatico.',
          'La excelencia no es un evento; es un habito colectivo. Cuando la empresa deja de reforzar la vision, la operacion cae de nuevo en lo comodo, lo administrativo y lo indiferente.'
        ]
      }
    ],
    closingQuestion: 'Su organizacion esta realmente diseniada para hacer felices a las personas o fue construida para proteger procesos internos?'
  },
  {
    slug: 'clientes-o-fanaticos',
    category: 'Liderazgo',
    title: 'Tu empresa tiene clientes o fanaticos?',
    subtitle: '5 claves para construir una Empresa WOW',
    summary: 'Una guia ejecutiva para convertir estructura, cultura y talento en una experiencia capaz de crear comunidad, recomendacion y dominio de mercado.',
    readingTime: '8 min lectura',
    lede: 'La indiferencia es el enemigo silencioso de la rentabilidad sostenible. Cuando la empresa solo diseña procesos para su propia comodidad, se vuelve un commodity. Cuando diseña conexion emocional, se vuelve dificil de reemplazar.',
    quote: 'Estrategia + Estructuras + Personas = Empresa WOW.',
    sections: [
      {
        heading: '1. Clientes vs. fans',
        paragraphs: [
          'La primera clave consiste en entender que no todos los ingresos tienen la misma calidad estrategica. El cliente transaccional responde al precio, la ubicacion o la conveniencia. El fan, en cambio, desarrolla una lealtad que resiste errores y volatilidad.',
          'Ese capital emocional reduce la dependencia de descuentos y mejora la resiliencia del negocio. En la economia digital, donde casi todo puede copiarse, el sentimiento de pertenencia es una ventaja que la competencia no puede clonar.'
        ]
      },
      {
        heading: '2. Diseno intencional de momentos memorables',
        paragraphs: [
          'La segunda clave es operativa: la felicidad del cliente no puede depender del azar ni del humor del colaborador de turno. Los momentos memorables deben ser concebidos como sistema, no como anecdotas.',
          'Para que la experiencia escale, cada punto de contacto debe responder a tres criterios: conveniencia, reduccion de friccion y memorabilidad. Si falta uno de esos tres, la experiencia pierde fuerza.'
        ],
        bullets: [
          'Conveniencia: hacer la vida del cliente radicalmente mas facil.',
          'Reduccion de friccion: eliminar baches burocraticos.',
          'Memorabilidad: dejar una impresion positiva que eleve el valor de vida del cliente.'
        ]
      },
      {
        heading: '3. Eliminar vacas sagradas',
        paragraphs: [
          'La tercera clave es una auditoria sin romanticismo sobre procesos y politicas. Las reglas heredadas, los requisitos absurdos y el exceso de cautela destruyen velocidad, agilidad y percepcion de valor.',
          'El articulo propone una lista de preguntas concretas para detectar donde la organizacion dice no por reflejo, donde genera retraso y que proceso podria desaparecer hoy para producir un salto en la experiencia.'
        ]
      },
      {
        heading: '4. Tratar al cliente como a la abuelita',
        paragraphs: [
          'La cuarta clave se centra en personas. La idea no es superficial ni sentimental: se trata de crear un estandar de calidez, escucha y resolucion genuina que haga sentir al cliente protegido, comprendido y respetado.',
          'Pero esa calidez solo funciona si va acompanada de dominio tecnico. La pasion sin conocimiento genera frustracion; el conocimiento sin humanidad genera indiferencia.'
        ]
      },
      {
        heading: '5. La cultura es un habito',
        paragraphs: [
          'La quinta clave insiste en que la cultura real se construye todos los dias. No cambia con discursos ocasionales, sino con repeticion, ejemplo, entrenamiento y consistencia de liderazgo.',
          'Cuando toda la organizacion respira el mismo proposito de facilitar la vida del cliente, la experiencia deja de ser una iniciativa aislada y se convierte en una forma de operar.'
        ]
      }
    ],
    closingQuestion: 'Cual es la primera regla estupida que va a eliminar hoy mismo para empezar a fabricar fanaticos?'
  }
];

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

const formatReadingTime = (value: string) => `${Math.max(1, Math.ceil(countWords(value) / 180))} min lectura`;

const renderInlineMarkdown = (value: string) =>
  value.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });

const parseArticleMarkdown = (markdown: string, options?: { subtitleOnNextLine?: boolean }): ArticleData => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: ArticleBlock[] = [];
  const paragraphLines: string[] = [];
  const listItems: string[] = [];
  let title = '';
  let subtitle = '';

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
    paragraphLines.length = 0;
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: 'list', items: [...listItems] });
    listItems.length = 0;
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed === '---') {
      flushParagraph();
      flushList();
      blocks.push({ type: 'hr' });
      continue;
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      flushParagraph();
      listItems.push(trimmed.slice(2).trim());
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: 3, text: trimmed.slice(4).trim() });
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      const headingText = trimmed.slice(3).trim();

      if (!subtitle) {
        subtitle = headingText;
      } else {
        blocks.push({ type: 'heading', level: 2, text: headingText });
      }
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph();
      flushList();
      title = trimmed.slice(2).trim();
      continue;
    }

    if (options?.subtitleOnNextLine && title && !subtitle && !blocks.length && !paragraphLines.length) {
      subtitle = trimmed;
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();

  const firstParagraph = blocks.find((block) => block.type === 'paragraph');
  const textForTiming = [
    title,
    subtitle,
    ...blocks.flatMap((block) => {
      if (block.type === 'paragraph' || block.type === 'heading') return [block.text];
      if (block.type === 'list') return block.items;
      return [];
    })
  ].join(' ');

  return {
    slug: slugify(title || 'articulo'),
    category: 'Articulo',
    title,
    subtitle,
    summary: firstParagraph?.type === 'paragraph' ? firstParagraph.text : subtitle,
    readingTime: formatReadingTime(textForTiming),
    blocks
  };
};

const MARKDOWN_ARTICLES: ArticleData[] = [
  parseArticleMarkdown(articleOneMarkdown, { subtitleOnNextLine: true }),
  parseArticleMarkdown(articleTwoMarkdown),
  parseArticleMarkdown(articleThreeMarkdown, { subtitleOnNextLine: true })
];

// --- Reusable Components [C-01 to C-08] ---

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

// [C-01] BOTON PRIMARIO
const PrimaryButton = ({ children, onClick, href, className = "" }: ButtonProps) => {
  const baseStyles = "inline-block bg-forix-green text-forix-white px-8 py-4 font-medium tracking-wider uppercase text-sm transition-all duration-200 ease-in-out hover:brightness-110 rounded-none text-center";
  if (href) return <a href={href} className={`${baseStyles} ${className}`}>{children}</a>;
  return <button onClick={onClick} className={`${baseStyles} ${className}`}>{children}</button>;
};

// [C-02] BOTON SECUNDARIO
const SecondaryButton = ({ children, onClick, href, className = "" }: ButtonProps) => {
  const baseStyles = "inline-block bg-transparent border border-forix-green text-forix-green px-8 py-4 font-medium tracking-wider uppercase text-sm transition-all duration-200 ease-in-out hover:bg-forix-mint hover:text-forix-blue rounded-none text-center";
  if (href) return <a href={href} className={`${baseStyles} ${className}`}>{children}</a>;
  return <button onClick={onClick} className={`${baseStyles} ${className}`}>{children}</button>;
};

// [C-05] ETIQUETA METODOLOGICA
const MethodTag = ({ children }: { children: React.ReactNode, key?: React.Key }) => (
  <span className="inline-block bg-forix-mint text-forix-blue px-3 py-1 text-[13px] font-medium uppercase tracking-wider">
    {children}
  </span>
);

// [C-03] TARJETA DE SERVICIO
const ServiceCard = ({ icon, title, desc, result, href }: { icon: React.ReactNode, title: string, desc: string, result: string, href: string, key?: React.Key }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white p-10 border border-forix-gray/15 hover:border-forix-blue transition-all duration-300 shadow-none flex flex-col h-full"
  >
    <div className="mb-6 text-forix-gray">{icon}</div>
    <h4 className="text-[18px] font-medium text-forix-blue mb-4 uppercase tracking-tight">{title}</h4>
    <p className="text-[16px] font-light text-forix-gray leading-relaxed mb-6 flex-grow">{desc}</p>
    <p className="text-[14px] font-signature mb-8 italic text-2xl">Resultado: {result}</p>
    <SecondaryButton href={href} className="w-full">Conocer el Método</SecondaryButton>
  </motion.div>
);

// [C-04] TARJETA DE CASO
const CaseCard = ({ logo, name, sector, methods }: { logo: string, name: string, sector: string, methods: string[], key?: React.Key }) => (
  <div className="grid md:grid-cols-2 gap-6 p-8 bg-white border-b border-forix-mint items-center">
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 bg-forix-ghost flex items-center justify-center font-bold text-forix-blue text-xl">
        {logo}
      </div>
      <div>
        <h4 className="text-xl font-bold text-forix-blue">{name}</h4>
        <p className="text-sm text-forix-gray font-light uppercase tracking-widest">{sector}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 md:justify-end">
      {methods.map((m, i) => <MethodTag key={i}>{m}</MethodTag>)}
    </div>
  </div>
);

// [C-06] BLOQUE DE CIFRAS
const FiguresBlock = ({ figures }: { figures: { num: string, label: string, desc: string }[] }) => (
  <div className="grid md:grid-cols-3 gap-0">
    {figures.map((f, i) => (
      <div key={i} className="p-16 text-center md:text-left">
        <p className="text-forix-white text-6xl md:text-8xl font-bold mb-4 tracking-tighter">{f.num}</p>
        <p className="text-forix-green text-[18px] font-medium uppercase tracking-[0.2em] mb-2">{f.label}</p>
        <p className="text-forix-mint/60 text-[14px] font-light">{f.desc}</p>
      </div>
    ))}
  </div>
);

// [C-07] TARJETA DE ARTICULO
const ArticleCard = ({ category, title, subtitle: _subtitle, summary, readingTime, index = 0, onClick, icon: Icon }: { category: string, title: string, subtitle: string, summary: string, readingTime: string, index?: number, onClick?: () => void, key?: React.Key, icon?: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }> }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={onClick}
    className="bg-white border border-forix-mint/40 shadow-[0_0_0_1px_rgba(20,56,92,0.05)] group transition-all duration-500 hover:bg-forix-blue hover:text-forix-white cursor-pointer overflow-hidden relative p-6 sm:p-10 md:p-12 flex flex-col justify-between h-full"
  >
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-forix-green">{category}</span>
        {Icon ? <Icon size={20} strokeWidth={1.5} className="text-forix-green group-hover:text-forix-mint transition-colors duration-500" /> : <span className="text-[10px] uppercase font-medium tracking-[0.1em] text-forix-gray/40 group-hover:text-forix-white/50 transition-colors duration-500 hidden sm:block">{readingTime}</span>}
      </div>
      <h4 className="text-xl sm:text-[26px] md:text-[30px] font-bold text-forix-blue group-hover:text-forix-white mb-4 leading-tight tracking-tight transition-colors duration-500">{title}</h4>
      <p className="text-sm sm:text-[17px] md:text-[18px] text-forix-gray/60 group-hover:text-forix-white/70 font-light mb-6 sm:mb-8 leading-relaxed transition-colors duration-500 line-clamp-2 sm:line-clamp-3">{summary}</p>
    </div>
    <div className="mt-auto relative z-10 flex items-center gap-2 text-forix-green text-xs font-bold uppercase tracking-widest group-hover:text-forix-mint transition-colors duration-500">
      Leer Artículo <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
    </div>
    <div className="pointer-events-none absolute inset-[14px] border border-forix-blue/8 transition-colors duration-500 group-hover:border-white/15" />
    <div className="absolute top-0 right-0 w-1 h-0 bg-forix-green group-hover:h-full transition-all duration-700 z-0" />
  </motion.div>
);

// [C-08] MODULO DE DESCARGA PDF
const DownloadModule = ({ title, desc, pages, mockup }: { title: string, desc: string, pages: string, mockup: string }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Recurso enviado a ${email}. Iniciando descarga...`);
  };

  return (
    <div className="bg-forix-ghost/30 border border-forix-mint/50 grid lg:grid-cols-12 gap-0">
      <div className="lg:col-span-5 bg-forix-blue p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={mockup} alt="PDF Mockup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <Download size={48} className="text-forix-mint mb-6 relative z-10" />
        <p className="text-forix-white font-bold uppercase tracking-[0.3em] text-[10px] mb-2 relative z-10">Whitepaper Exclusivo</p>
        <p className="text-forix-mint text-sm font-light relative z-10">{pages} Páginas de Análisis Estratégico</p>
      </div>
      <div className="lg:col-span-7 p-12 md:p-20">
        <h4 className="text-3xl md:text-4xl font-bold text-forix-blue mb-6 leading-tight">{title}</h4>
        <p className="text-lg text-forix-gray font-light mb-10 leading-relaxed">{desc}</p>
        <form onSubmit={handleDownload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre"
              required
              className="w-full bg-white border border-forix-mint/50 px-6 py-4 focus:border-forix-blue outline-none transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Corporativo"
              required
              className="w-full bg-white border border-forix-mint/50 px-6 py-4 focus:border-forix-blue outline-none transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <PrimaryButton className="w-full py-5">DESCARGAR RECURSO ESTRATÉGICO</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = ({ currentView, setCurrentView }: { currentView: string, setCurrentView: (view: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Soluciones", id: "servicios" },
    { name: "Método FORIX", id: "nosotros" },
    { name: "CX TOOLS", id: "articulos" },
    { name: "Sesión Estratégica", id: "contacto" }
  ];

  const directLinks = [
    { name: "Soluciones", id: "servicios" },
    { name: "Método FORIX", id: "nosotros" },
    { name: "CX TOOLS", id: "articulos" },
    { name: "Sesión Estratégica", id: "contacto" }
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'contacto') {
      const el = document.getElementById('contacto');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Top Bar with Logo */}
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${isScrolled ? 'py-2 bg-forix-white/90 backdrop-blur-md border-b border-forix-mint/20' : 'py-3 sm:py-5 bg-transparent'}`}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo Left - hidden on home page when not scrolled */}
          <div
            className={`flex items-center cursor-pointer shrink-0 transition-all duration-500 ${!isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setCurrentView('home')}
          >
            <img src="/logo_navbar.png" className="h-4 md:h-6 w-auto drop-shadow-[0_2px_10px_rgba(20,56,92,0.15)]" alt="FORIX GROUP" />
          </div>

          {/* Floating Menu Widget (Right) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-[70] ${isScrolled ? 'bg-forix-blue/95 backdrop-blur-md shadow-2xl border border-white/10' : 'bg-transparent border border-white/15'} rounded-none cursor-pointer group transition-all duration-500 flex flex-col overflow-hidden ${isScrolled ? 'p-1.5 px-3 py-2' : 'p-3 sm:p-4 md:p-6 min-w-[160px] sm:min-w-[180px] md:min-w-[250px]'}`}
                  onClick={() => setIsExpanded(true)}
                >
                  <div className={`flex items-center w-full ${isScrolled ? 'justify-end gap-3' : 'justify-between gap-4 mb-5 pb-4 border-b border-white/10'}`}>
                    {isScrolled ? (
                      <>
                        <span
                          className="text-forix-white font-sans uppercase tracking-[0.2em] font-medium text-[10px] cursor-pointer hover:text-forix-mint transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                          }}
                        >
                          Menu
                        </span>
                        <div
                          className="w-8 h-8 border border-forix-white/40 flex items-center justify-center group-hover:border-forix-white transition-colors duration-300 cursor-pointer"
                        >
                          <Pencil size={14} className="text-forix-white/90 group-hover:text-forix-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className="text-forix-white/90 font-sans uppercase tracking-[0.25em] font-semibold whitespace-nowrap text-[10px] md:text-xs group-hover:text-forix-green transition-colors duration-300"
                          onClick={() => setIsExpanded(true)}
                        >
                          Menú
                        </span>
                        <div
                          className="text-forix-white/80 group-hover:text-forix-green transition-transform duration-500 group-hover:rotate-90 flex items-center justify-center"
                          onClick={() => setIsExpanded(true)}
                        >
                          <Plus size={16} strokeWidth={2} />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Direct Access Links (Visible ONLY in hero state) */}
                  {!isScrolled && (
                    <div className="flex flex-col gap-3">
                      {directLinks.map((link) => (
                        <button
                          key={link.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkClick(link.id);
                          }}
                          className="text-forix-white/60 hover:text-forix-white text-left text-sm md:text-base font-normal tracking-wide transition-all duration-300 flex items-center gap-2 group/link"
                        >
                          <span className="w-1 h-1 rounded-full bg-forix-green opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                          <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-6 sm:p-8 md:p-10 rounded-none shadow-2xl min-w-[260px] sm:min-w-[300px] md:min-w-[360px] max-w-[calc(100vw-24px)] border border-white/10 z-[70]"
                  style={{ backgroundColor: 'rgba(61, 112, 114, 0.95)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex gap-1">
                        {[4, 12, 8].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [h, h === 12 ? 4 : 12, h] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                            className={`w-[1.5px] ${i === 0 ? 'bg-forix-green' : i === 1 ? 'bg-forix-green/60' : 'bg-forix-green/30'}`}
                          />
                        ))}
                      </div>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                      className="w-7 h-7 flex items-center justify-center rounded-none bg-white/5 hover:bg-white/10 text-forix-white/60 hover:text-forix-white transition-all duration-300 border border-white/5 ml-4"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-5">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, ease: "easeOut" }}
                        onClick={() => handleLinkClick(link.id)}
                        className={`text-left text-xl sm:text-2xl md:text-3xl font-sans font-light tracking-tighter transition-all duration-500 hover:translate-x-2 group flex items-center gap-2.5 ${currentView === link.id ? 'text-white font-normal' : 'text-white/70 hover:text-white'}`}
                      >
                        <span className={`w-1 h-1 rounded-none bg-forix-green transition-all duration-500 scale-0 group-hover:scale-100 ${currentView === link.id ? 'scale-100' : ''}`} />
                        {link.name}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/5 flex flex-col gap-4">
                    <button
                      onClick={() => handleLinkClick('contacto')}
                      className="w-full py-3 text-sm md:text-base font-sans font-light tracking-wide text-forix-white border border-white/10 hover:border-forix-green hover:text-forix-green transition-all duration-500 flex justify-between items-center px-5 group relative overflow-hidden bg-white/5 backdrop-blur-sm whitespace-nowrap"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-forix-green rounded-full animate-pulse shadow-[0_0_8px_rgba(46,204,113,0.6)] flex-shrink-0" />
                        INICIA TU DIAGNÓSTICO
                      </span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-forix-green flex-shrink-0 ml-4" />
                      <div className="absolute inset-0 bg-gradient-to-r from-forix-green/0 via-forix-green/5 to-forix-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>

                    <div className="flex justify-end items-center px-1">
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">© 2026</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
};

const HeroLogo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 18 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1.25, ease: [0.21, 0.47, 0.32, 0.98] }}
    className="relative flex items-center justify-center select-none"
  >
    <motion.img
      src="/logo_hero.png"
      className="w-[100vw] max-w-4xl h-auto px-6 md:px-0"
      alt="FORIX GROUP"
      animate={{
        y: [0, -8, 0],
        filter: [
          'drop-shadow(0 0 0px rgba(216,225,224,0.0))',
          'drop-shadow(0 0 24px rgba(216,225,224,0.18))',
          'drop-shadow(0 0 0px rgba(216,225,224,0.0))'
        ]
      }}
      transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      aria-hidden="true"
      className="absolute bottom-2 left-1/2 h-px w-[38%] -translate-x-1/2 bg-gradient-to-r from-transparent via-forix-mint/80 to-transparent"
      animate={{ opacity: [0.2, 0.75, 0.2], scaleX: [0.88, 1.04, 0.88] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
    />
  </motion.div>
);

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-50 mix-blend-luminosity"
        style={{
          backgroundImage: 'url("/hero_main.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay oscuro minimalista */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-[#050505]/90 pointer-events-none z-0" />

      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo centered */}
        <HeroLogo />

        {/* Subtitle centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-forix-mint text-sm sm:text-lg md:text-[1.45rem] font-light leading-relaxed tracking-[0.12em] sm:tracking-[0.2em] uppercase text-center max-w-3xl">
            Consultora boutique especializada en<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>hospitalidad & customer experience
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={() => {
            const el = document.getElementById('contacto');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-forix-white hover:text-forix-green transition-colors duration-300 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.25em] uppercase flex items-center gap-2 sm:gap-3 cursor-pointer border border-white/20 hover:border-forix-green/40 px-4 sm:px-6 py-3"
        >
          Inicia Tu Diagnóstico <ArrowRight size={18} />
        </motion.button>
      </div>
    </section>
  );
};

const AnimatedHero = ({
  title,
  subtitle,
  description,
  bgClass,
  rectClass,
  backgroundImage,
  titleClassName = "text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
  textEndColor = "#D8E1E0",
  subtitleEndColor = "#D8E1E0"
}: {
  title: string,
  subtitle: string,
  description: string,
  bgClass: string,
  rectClass: string,
  backgroundImage?: string,
  titleClassName?: string,
  textEndColor?: string,
  subtitleEndColor?: string
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Staggered animation for 3 rectangles of equal size to rise and cover the background
  const y1 = useTransform(scrollYProgress, [0, 0.7], ["100%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.85], ["100%", "0%"]);
  const y3 = useTransform(scrollYProgress, [0.3, 1], ["100%", "0%"]);

  // Transform text color to maintain contrast
  const textColor = useTransform(scrollYProgress, [0.3, 0.7], ["#F4F2F1", textEndColor]);
  const subtitleColor = useTransform(scrollYProgress, [0.3, 0.7], ["#D8E1E0", subtitleEndColor]);

  return (
    <section
      ref={containerRef}
      className={`relative h-[150vh] ${bgClass}`}
    >
      <div className="sticky top-0 h-[85vh] w-full flex flex-col justify-end pb-12 sm:pb-24 overflow-hidden">
        {/* Background Image if provided */}
        {backgroundImage && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Animated Rectangles Background - Equal Sized Columns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex">
          {/* Rectangle 1 */}
          <motion.div
            style={{ y: y1 }}
            className={`w-1/3 h-[120%] ${rectClass} border-r border-white/5`}
          />
          {/* Rectangle 2 */}
          <motion.div
            style={{ y: y2 }}
            className={`w-1/3 h-[120%] ${rectClass} border-r border-white/5`}
          />
          {/* Rectangle 3 */}
          <motion.div
            style={{ y: y3 }}
            className={`w-1/3 h-[120%] ${rectClass}`}
          />
        </div>

        <div className="container-custom relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`${titleClassName} font-bold leading-[0.85] tracking-tighter uppercase`}
              >
                {title}
              </motion.h1>
            </div>

            <div className="lg:col-span-4 flex flex-col pb-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center gap-3 mb-4 sm:mb-6"
              >
                <motion.div style={{ backgroundColor: subtitleColor }} className="w-2 h-2 rounded-full" />
                <motion.span style={{ color: subtitleColor }} className="text-[10px] font-bold tracking-[0.4em] uppercase">
                  {subtitle}
                </motion.span>
              </motion.div>

              <motion.p
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-md"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 w-24 h-[1px] bg-white/10" />
        <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-16 h-16 border-r border-b border-white/5" />
      </div>
    </section>
  );
};

const SectionHero = ({ title, subtitle, description }: { title: string, subtitle: string, description: string }) => {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center bg-forix-gray pt-24 sm:pt-32 pb-12 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Bauhaus Geometric Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-forix-blue/10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-forix-green/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-forix-green text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">
            {subtitle}
          </span>
          <h1 className="text-forix-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mb-6 sm:mb-8 max-w-4xl">
            {title}
          </h1>
          <div className="max-w-2xl">
            <p className="text-forix-mint/70 text-base md:text-lg font-light leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-white/5 m-12 md:m-24" />
    </section>
  );
};

const ServicesHero = ({ title, subtitle, description }: { title: string, subtitle: string, description: string }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Staggered animation for 3 white rectangles of equal size to rise and cover the background
  const y1 = useTransform(scrollYProgress, [0, 0.7], ["100%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.85], ["100%", "0%"]);
  const y3 = useTransform(scrollYProgress, [0.3, 1], ["100%", "0%"]);

  // Text color transitions from white to blue as white rects come up
  const titleColor = useTransform(scrollYProgress, [0.3, 0.7], ["#F4F2F1", "#14385C"]);
  const subtitleColor = useTransform(scrollYProgress, [0.3, 0.7], ["#D8E1E0", "#3D7072"]);
  const descColor = useTransform(scrollYProgress, [0.3, 0.7], ["rgba(216,225,224,0.7)", "#14385C"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-[#14385C]"
    >
      <div className="sticky top-0 h-[85vh] w-full flex flex-col justify-end pb-12 sm:pb-24 overflow-hidden">
        {/* New Hero Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero_servicios.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 z-0 bg-black/50" />

        {/* Animated White Rectangles Background - Equal Sized Columns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex">
          {/* Rectangle 1 */}
          <motion.div
            style={{ y: y1 }}
            className="w-1/3 h-[120%] bg-forix-white border-r border-forix-blue/5"
          />
          {/* Rectangle 2 */}
          <motion.div
            style={{ y: y2 }}
            className="w-1/3 h-[120%] bg-forix-white border-r border-forix-blue/5"
          />
          {/* Rectangle 3 */}
          <motion.div
            style={{ y: y3 }}
            className="w-1/3 h-[120%] bg-forix-white"
          />
        </div>

        <div className="container-custom relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                style={{ color: titleColor }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter uppercase"
              >
                {title}
              </motion.h1>
            </div>

            <div className="lg:col-span-4 flex flex-col pb-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center gap-3 mb-4 sm:mb-6"
              >
                <motion.div style={{ backgroundColor: subtitleColor }} className="w-2 h-2 rounded-full" />
                <motion.span style={{ color: subtitleColor }} className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase">
                  {subtitle}
                </motion.span>
              </motion.div>

              <motion.p
                style={{ color: descColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-md"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 w-24 h-[1px] bg-white/10" />
        <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-16 h-16 border-r border-b border-white/5" />
      </div>
    </section>
  );
};

const StackedServiceItem = ({ title, desc, index: _index, icon: Icon }: { title: string, desc: string, index: number, key?: React.Key, icon?: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }> }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="bg-forix-white border-t border-forix-blue/10 py-12 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
      style={{ zIndex: 10 + _index }}
    >
      <div className="container-custom grid md:grid-cols-12 gap-8 sm:gap-12 items-start">
        <div className="md:col-span-5 md:self-stretch">
          <div className="md:sticky md:top-40 lg:top-44 self-start">
            {Icon && (
              <div className="mb-4 sm:mb-6">
                <Icon size={28} strokeWidth={1} className="text-forix-blue" />
              </div>
            )}
            <h4 className="max-w-md text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[0.9] uppercase tracking-tighter text-forix-blue">
              {title}
            </h4>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="max-w-2xl space-y-6">
            {desc.split('\n\n').map((block, bIdx, blocks) => {
              const isClosing = blocks.length > 1 && bIdx === blocks.length - 1;
              return block.split('. ').map((sentence, i, arr) => (
                <p
                  key={`${bIdx}-${i}`}
                  className={`text-base sm:text-xl md:text-[1.65rem] font-light leading-relaxed text-forix-gray ${isClosing ? 'italic font-normal' : ''}`}
                >
                  {sentence}{i < arr.length - 1 ? '.' : ''}
                </p>
              ));
            })}
          </div>
          <div className="mt-10">
            <SecondaryButton
              onClick={() => {
                const el = document.getElementById('contacto');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm md:text-base"
            >
              Solicitar sesión estratégica
            </SecondaryButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const servicesTopRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    servicesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      name: "FORIX BUSINESS",
      logo: "/forix_business_nobg.png",
      subtitle: "The Masterplan",
      lema: "Arquitectura de la distinción",
      items: [
        {
          title: "Mystery Shopping",
          icon: ScanEye,
          desc: "La mayoría de las organizaciones operan con una brecha invisible: la distancia entre la experiencia que creen entregar y la que su cliente realmente vive. Sin datos de campo precisos, las decisiones de mejora se toman sobre percepciones internas, no sobre realidad. A través de un protocolo de inmersión encubierta de alta precisión, evaluamos cada punto de contacto de su operación desde la perspectiva del cliente real. Analizamos la coherencia entre su promesa de marca y su ejecución en el piso, la respuesta emocional generada en cada micro-momento y el nivel de cumplimiento de sus estándares de servicio. El resultado es un informe ejecutivo con hallazgos accionables, clasificados por nivel de impacto en la experiencia y en la rentabilidad.\n\nPara organizaciones que no se conforman con suponer que todo va bien."
        },
        {
          title: "Ingeniería de atmósfera comercial",
          icon: AudioLines,
          desc: "El entorno físico de un negocio no es decoración: es un sistema de influencia. La música, el aroma, la iluminación y la temperatura generan respuestas neurológicas que determinan el tiempo de permanencia, el nivel de gasto y la disposición a regresar. Cuando este sistema no está diseñado con intención, opera en contra. Diseñamos y auditamos cada variable sensorial de su espacio comercial con base en principios de neuromarketing aplicado, asegurándonos de que cada elemento refuerce su posicionamiento de marca y active los estados emocionales que favorecen la decisión de compra. El proceso incluye diagnóstico sensorial del espacio actual, diseño de la atmósfera objetivo y protocolo de implementación y control.\n\nPorque el ambiente que el cliente no puede describir es el que más determina su comportamiento."
        },
        {
          title: "Arquitectura de protocolos de servicio",
          icon: BookOpen,
          desc: "La excelencia en el servicio no puede depender del talento individual de cada colaborador ni de la interpretación libre de lo que \"buen servicio\" significa. Sin protocolos precisos, cada cliente recibe una experiencia distinta, y la marca pierde coherencia en su promesa más esencial. Diseñamos el sistema completo de protocolos de servicio y hospitalidad de su organización: desde los rituales de bienvenida y los flujos de atención hasta la gestión de momentos de fricción y los estándares de comunicación verbal y no verbal. Cada protocolo es co-construido con su equipo para garantizar adopción real, y documentado en un formato operativo que permite replicación y escalabilidad sin perder identidad de marca.\n\nPorque la distinción sostenida es siempre resultado de un sistema, nunca de una casualidad."
        }
      ]
    },
    {
      name: "FORIX LEARNING",
      logo: "/forix_learning_nobg.png",
      subtitle: "The Academy",
      lema: "Maestría en el arte de servir",
      items: [
        {
          title: "Certificación en cultura de anfitrión",
          icon: Fingerprint,
          desc: "El mayor obstáculo para una cultura de servicio excepcional no es la falta de conocimiento: es la mentalidad operativa. Un colaborador que se percibe a sí mismo como ejecutor de tareas entrega transacciones. Un anfitrión que comprende su rol en la experiencia del cliente entrega momentos memorables. Este programa de certificación intensiva trabaja en la reconfiguración de esa mentalidad, desarrollando en el personal de contacto las competencias de lectura del cliente, gestión emocional en el servicio, lenguaje corporal de excelencia y construcción de micro-momentos de alto impacto. Al concluir el programa, cada participante cuenta con un marco propio de actuación que le permite tomar decisiones de servicio con criterio, autonomía y consistencia.\n\nPara empresas que entienden que el servicio de excelencia es la ventaja competitiva más difícil de copiar."
        },
        {
          title: "Programa de liderazgo en gestión de experiencia",
          icon: Compass,
          desc: "Los estándares de servicio se diseñan en la sala de directivos, pero se sostienen o se erosionan en la primera línea de liderazgo. Un gerente o supervisor sin las competencias para gestionar cultura termina administrando cumplimiento, no inspirando excelencia. Este programa de acompañamiento estratégico está diseñado para líderes operativos y directivos que necesitan desarrollar su capacidad de gestionar equipos de alto desempeño en entornos de servicio: cómo construir Marca Empleadora desde adentro, cómo supervisar calidad sin microgestión y cómo sostener los estándares de experiencia bajo presión operativa. El proceso combina sesiones de mentoría individual, análisis de casos reales de su operación y herramientas de liderazgo aplicadas a la gestión de CX.\n\nPara líderes que comprenden que el primer cliente al que deben conquistar es su propio equipo."
        },
        {
          title: "Workshop de codificación de identidad de servicio",
          icon: PenTool,
          desc: "Una marca de servicio distintiva no se declara: se codifica. Sin un manual que traduzca la identidad de la organización en comportamientos concretos y replicables, la cultura queda en la intención y el estándar depende de quien esté presente ese día. A través de sesiones colaborativas de diseño, co-construimos con su equipo el Manual de Servicio de Autor de su organización: los rituales propios de su marca, el lenguaje que la representa, los gestos que la diferencian y los criterios que guían cada decisión de servicio. Al ser construido de manera participativa, el manual no se percibe como una imposición externa, sino como la formalización de lo mejor que su equipo ya sabe hacer, elevado a estándar.\n\nUn documento que no termina archivado: se convierte en la guía viva de su operación diaria."
        }
      ]
    },
    {
      name: "FORIX LAB",
      logo: "/logo_lab.png",
      subtitle: "The Intelligence Hub",
      lema: "La ciencia de la excelencia",
      items: [
        {
          title: "Sistema de inteligencia de experiencia de cliente",
          icon: Activity,
          desc: "El 96% de los clientes insatisfechos no presenta quejas: simplemente no vuelve. Esta pérdida silenciosa no aparece en ningún estado financiero, pero erosiona el crecimiento real de manera sistemática. Las organizaciones que miden solo satisfacción inmediata están viendo únicamente la superficie del problema. Diseñamos e implementamos un sistema integrado de medición de la experiencia que combina métricas cuantitativas de lealtad y comportamiento; NPS, CSAT, tasa de retención, valor de vida del cliente, con indicadores cualitativos y emocionales que capturan lo que los números solos no explican. El sistema incluye el diseño del ecosistema de medición, la definición de los indicadores clave por etapa del customer journey y el protocolo de análisis e interpretación para la toma de decisiones ejecutivas.\n\nPorque no es posible gestionar con precisión lo que no se mide con inteligencia."
        },
        {
          title: "Diagnóstico de rentabilidad experiencial",
          icon: BarChart3,
          desc: "La mayoría de las organizaciones miden la experiencia de cliente con indicadores de satisfacción. Muy pocas la miden con indicadores de crecimiento. Esta brecha representa uno de los mayores errores estratégicos del management moderno: tratar el CX como una función de soporte cuando en realidad es el principal motor de expansión de ingresos que existe en cualquier negocio. Las empresas con programas maduros de experiencia de cliente crecen sus ingresos 5.1 veces más rápido que aquellas con CX deficiente, y el 84% de las compañías que mejoran activamente su CX reportan un incremento directo en sus ingresos. En FORIX Lab traducimos esa evidencia en un análisis aplicado a la realidad financiera y operativa de su organización. Evaluamos el impacto económico de cada etapa del customer journey sobre variables críticas de negocio: tasa de retención, valor de vida del cliente (CLV), velocidad de recompra, sensibilidad al precio y potencial de referido. El resultado es un mapa de rentabilidad experiencial que identifica con precisión qué intervenciones en la experiencia generan el mayor retorno sobre la inversión comercial.\n\nPara directivos que ya no quieren saber si su CX es bueno, sino cuánto dinero les está costando que no lo sea."
        }
      ]
    }
  ];
  const collageImageClass = "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700";

  return (
    <div className="bg-forix-white relative">
      <div ref={servicesTopRef} />
      <ServicesHero
        title="Soluciones"
        subtitle="Excelencia Estratégica"
        description="Arquitectura de experiencias boutique."
      />

      <section className="pb-32">
        {pillars.map((pillar, pIdx) => (
          <div key={pIdx} className="relative">
            {/* Pillar Header */}
            <div className="sticky top-0 z-20 bg-forix-white/90 backdrop-blur-md py-8 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-24">
              <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                  <div>
                    <h2 className="text-forix-green text-[10px] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">{pillar.subtitle}</h2>
                    <img src={pillar.logo} className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto mb-2" alt={pillar.name} />
                  </div>
                  <p className="font-signature text-2xl sm:text-3xl md:text-4xl italic text-forix-green">"{pillar.lema}"</p>
                </div>
              </div>
            </div>

            {/* Stacked Items */}
            <div className="relative">
              {pillar.items.map((item, iIdx) => (
                <StackedServiceItem
                  key={iIdx}
                  title={item.title}
                  desc={item.desc}
                  icon={item.icon}
                  index={iIdx + 1}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forix-blue/80 backdrop-blur-sm border border-forix-blue/20 text-white flex items-center justify-center shadow-lg hover:bg-forix-blue transition-colors duration-300"
            aria-label="Volver al inicio"
          >
            <ChevronUp size={18} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedNumber = ({ end, prefix = "", suffix = "" }: { end: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const duration = 2000; // 2 seconds

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const Results = () => {
  const companies = [
    "Hotel Qhawarina",
    "El Camino Spanish School",
    "Coffee Bike",
    "Verbalia Spanish School",
    "Visu Club",
    "Villa",
    "La Casa del Silpancho",
    "Mercamax",
    "Encinas Legis Group",
    "Trendy Marketing Digital"
  ];

  return (
    <section id="resultados" className="py-24 bg-forix-blue overflow-hidden">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-forix-mint text-base md:text-lg font-bold tracking-[0.4em] uppercase mb-6 text-center">Empresas que elevaron su estándar</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-forix-white mb-16 text-center max-w-4xl mx-auto">
            Impacto medible en la <span className="font-signature font-light text-5xl md:text-6xl">rentabilidad</span> de su organización.
          </h3>

          {/* Compact Figures Block - 2 top, 1 bottom */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-forix-white/10 p-8 text-center bg-forix-white/5 backdrop-blur-sm">
                <div className="text-5xl md:text-6xl font-bold text-forix-mint mb-2">
                  <AnimatedNumber end={20} prefix="+" />
                </div>
                <div className="text-xs uppercase tracking-widest text-forix-white font-bold mb-1">Empresas</div>
                <div className="text-xs text-forix-white/60 font-light">Ecosistemas transformados.</div>
              </div>
              <div className="border border-forix-white/10 p-8 text-center bg-forix-white/5 backdrop-blur-sm">
                <div className="text-5xl md:text-6xl font-bold text-forix-mint mb-2">
                  <AnimatedNumber end={300} prefix="+" />
                </div>
                <div className="text-xs uppercase tracking-widest text-forix-white font-bold mb-1">Proyectos</div>
                <div className="text-xs text-forix-white/60 font-light">Estrategias implementadas.</div>
              </div>
            </div>
            <div className="border border-forix-white/10 p-8 text-center bg-forix-white/5 backdrop-blur-sm">
              <div className="text-5xl md:text-6xl font-bold text-forix-mint mb-2">
                <AnimatedNumber end={45} prefix="+" suffix="%" />
              </div>
              <div className="text-xs uppercase tracking-widest text-forix-white font-bold mb-1">Crecimiento</div>
              <div className="text-xs text-forix-white/60 font-light">Incremento promedio en valor percibido.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative w-full flex overflow-x-hidden border-y border-forix-white/10 bg-forix-white/5 py-6">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...companies, ...companies, ...companies].map((company, idx) => (
            <span key={idx} className="mx-8 text-xl md:text-2xl font-light text-forix-white/80 uppercase tracking-wider">
              {company}
              <span className="mx-8 text-forix-mint/50">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedText = ({ segments }: { segments: { text: string, bold?: boolean, italic?: boolean, className?: string }[] }) => {
  const words: { word: string, bold?: boolean, italic?: boolean, className?: string }[] = [];

  segments.forEach(segment => {
    const parts = segment.text.split(/(\s+)/);
    parts.forEach(part => {
      if (part.length > 0) {
        words.push({ word: part, bold: segment.bold, italic: segment.italic, className: segment.className });
      }
    });
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="inline"
    >
      {words.map((item, wordIndex) => {
        const isSpace = item.word.trim() === '';
        return isSpace ? (
          <span key={wordIndex} className="inline whitespace-pre-wrap">
            {item.word}
          </span>
        ) : (
          <motion.span
            key={wordIndex}
            variants={child}
            className={`inline-block ${item.bold ? 'font-bold' : ''} ${item.italic === false ? 'not-italic' : ''} ${item.className ?? ''}`}
          >
            {item.word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

const About = () => {
  return (
    <>
      <AnimatedHero
        title="Método Forix"
        subtitle="Liderazgo & Propósito"
        description="Redefinimos los estándares de hospitalidad para convertirlos en la mayor ventaja competitiva del mercado."
        bgClass="bg-forix-gray"
        rectClass="bg-forix-white"
        backgroundImage="/hero_about.jpg"
        textEndColor="#14385C"
        subtitleEndColor="#3D7072"
      />
      <section id="about" className="pt-16 sm:pt-24 pb-0 bg-forix-white overflow-hidden">
        <div className="container-custom">
          {/* Liderazgo Section */}
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center mb-16 sm:mb-24">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-forix-blue mb-6 sm:mb-8 tracking-tighter">La filosofía del estándar</h2>

              <div className="space-y-6 sm:space-y-8 max-w-2xl">
                <p className="text-base sm:text-xl md:text-[1.7rem] text-forix-gray font-light leading-relaxed">
                  La <span className="font-semibold text-forix-blue">excelencia</span> no es un objetivo aspiracional, sino el requisito mínimo de operación. FORIX GROUP se basa en la <span className="font-semibold text-forix-blue">convicción</span> de que la diferencia entre una empresa común y una marca líder reside en la intencionalidad del <span className="font-semibold text-forix-blue">detalle</span>. No cree en soluciones genéricas, sino en el rigor técnico que protege el <span className="font-semibold text-forix-blue">prestigio</span> de cada organización.
                </p>
                <p className="text-base sm:text-xl md:text-[1.7rem] text-forix-gray font-light leading-relaxed">
                  Nuestra labor es transformar la <span className="font-semibold text-forix-blue">hospitalidad</span> de un concepto abstracto a una herramienta de <span className="font-semibold text-forix-blue">ingeniería financiera</span>.
                </p>
                <p className="text-base sm:text-xl md:text-[1.7rem] text-forix-gray font-light leading-relaxed">
                  Somos el <span className="font-semibold text-forix-blue">aliado</span> que detiene la erosión del <span className="font-semibold text-forix-blue">negocio</span> y asegura que el <span className="font-semibold text-forix-blue">éxito</span> sea un sistema replicable, no un golpe de suerte.
                </p>
              </div>
            </div>

            {/* Right Placeholder Box with Design Elements */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] w-full max-w-sm sm:max-w-md mx-auto">
                {/* Geometric Pattern - Top Right */}
                <div className="absolute -top-6 -right-4 sm:-top-10 sm:-right-10 w-14 sm:w-20 h-14 sm:h-20 z-20 opacity-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-forix-blue">
                    <path d="M 0 0 L 12 0 L 6 50 L 12 100 L 0 100 L 6 50 Z" fill="currentColor" />
                    <path d="M 28 0 L 40 0 L 34 50 L 40 100 L 28 100 L 34 50 Z" fill="currentColor" />
                    <path d="M 56 0 L 68 0 L 62 50 L 68 100 L 56 100 L 62 50 Z" fill="currentColor" />
                    <path d="M 84 0 L 96 0 L 90 50 L 96 100 L 84 100 L 90 50 Z" fill="currentColor" />
                  </svg>
                </div>

                <div className="absolute inset-0 border border-forix-blue/10 bg-forix-ghost/30 shadow-[0_0_0_18px_rgba(244,242,241,0.92)]" />
                <img src="/about_mauricio.jpg" alt="Mauricio Vacaflores" className="relative z-10 w-full h-full object-cover grayscale" />

                {/* Signature Box - Bottom, diagonal like reference */}
                <div className="absolute bottom-4 left-[30%] sm:left-[25%] z-30 w-[65%] sm:-bottom-10 md:-bottom-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                    className="flex flex-col items-start"
                  >
                    <img src="/Mauricio Vacaflores.png" alt="Firma Mauricio Vacaflores" className="w-full h-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)] -rotate-[25deg]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information (From PDF) */}
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 pt-16 sm:pt-28 border-t border-forix-blue/5">
            <div className="lg:col-span-4">
              <h2 className="text-forix-blue text-xs font-bold tracking-[0.4em] uppercase mb-8">Propósito & Esencia</h2>
              <div className="w-12 h-[1px] bg-forix-green mb-12" />

              {/* New Photo Container - Adapted to theme */}
              <div className="relative group">
                <div className="w-full bg-forix-ghost/50 border border-forix-blue/10 relative overflow-hidden">
                  <img
                    src="/about_essence.jpg"
                    alt="Propósito"
                    className="w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-forix-blue/30" />
                </div>
                {/* Accent line */}
                <div className="absolute -bottom-4 -left-4 w-24 h-[1px] bg-forix-mint/50" />
              </div>
            </div>
            <div className="lg:col-span-8 flex items-center">
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-forix-blue leading-tight italic">
                  <AnimatedText segments={[
                    { text: '"' },
                    { text: 'Satisface', bold: true, className: 'text-forix-green' },
                    { text: ' con lo esperado, ' },
                    { text: 'sorprende', bold: true, className: 'text-forix-blue' },
                    { text: ' con lo ' },
                    { text: 'inesperado', bold: true, className: 'text-forix-green' },
                    { text: '."' }
                  ]} />
                </p>

                <p className="max-w-4xl text-base sm:text-xl md:text-2xl text-forix-gray font-light leading-relaxed italic">
                  “Las marcas centradas en el cliente obtienen <span className="font-semibold text-forix-blue">ganancias un 60% más altas</span> que aquellas que no se centran en la experiencia de sus clientes”.
                </p>
              </div>
            </div>
          </div>

          {/* Método FORIX - Full width centered */}
          <div className="py-16 sm:py-24 flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[70vh]">
            <div className="text-center mb-10 sm:mb-16">
              <h4 className="text-black text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">Método FORIX</h4>
              <p className="text-black font-bold text-xl sm:text-3xl md:text-4xl tracking-widest">4i * X</p>
            </div>

            <div className="relative max-w-4xl mx-auto w-full px-2 sm:px-4 md:px-6">
              <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 relative">
                {[
                  { name: "Investigación" },
                  { name: "Innovación" },
                  { name: "Inmersión" },
                  { name: "Iteración" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 group cursor-default">
                    <div className="w-6 h-20 sm:w-8 sm:h-28 md:w-12 md:h-52">
                      <motion.div
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 55% 50%, 100% 100%, 0% 100%, 45% 50%)' }}
                        animate={{
                          backgroundColor: ['#000000', '#14385C', '#3D7072', '#000000'],
                          boxShadow: [
                            '0 0 0px rgba(0,0,0,0)',
                            '0 0 30px rgba(20,56,92,0.4)',
                            '0 0 30px rgba(61,112,114,0.4)',
                            '0 0 0px rgba(0,0,0,0)'
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.6,
                        }}
                      />
                    </div>
                    <span className="text-[8px] sm:text-[10px] md:text-lg font-light text-forix-gray transition-colors duration-300 group-hover:text-black mt-1 sm:mt-2 text-center">{step.name}</span>
                  </div>
                ))}
              </div>

              {/* Dotted Line */}
              <div className="w-full h-[1px] border-t border-dotted border-black/50 mt-4" />

              {/* Bottom Labels */}
              <div className="flex justify-center gap-6 sm:gap-10 md:gap-20 mt-4 sm:mt-6">
                <span className="text-[10px] sm:text-xs md:text-lg uppercase tracking-[0.1em] sm:tracking-[0.2em] text-black font-medium">EXPERIENCIA</span>
                <span className="text-[10px] sm:text-xs md:text-lg uppercase tracking-[0.1em] sm:tracking-[0.2em] text-black font-medium">EXCELENCIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Resources = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  const _legacyArticles = [
    {
      category: "CXM",
      title: "El Costo de la Indiferencia",
      subtitle: "Fugas invisibles de rentabilidad",
      summary: "Cómo la falta de estándares está drenando el 15% de su rentabilidad anual mediante la erosión silenciosa de la lealtad.",
      readingTime: "8 min lectura"
    },
    {
      category: "Neurociencia",
      title: "Neuro-Hospitalidad 2026",
      subtitle: "El nuevo cerebro del cliente premium",
      summary: "Tendencias de consumo premium y cómo la neurociencia redefine el concepto de lujo en la era post-digital.",
      readingTime: "12 min lectura"
    },
    {
      category: "Estrategia",
      title: "Protocolos de Alto Impacto",
      subtitle: "Diseño de experiencias memorables",
      summary: "Cómo estructurar protocolos que no solo funcionen, sino que emocionen y fidelicen al cliente de alto valor.",
      readingTime: "10 min lectura"
    }
  ];
  const articles = MARKDOWN_ARTICLES;
  const templates = [
    {
      title: "Mapa de empatía",
      desc: "Herramienta de perfilamiento psicográfico para decodificar el entorno, aspiraciones y miedos reales de su cliente ideal. Va más allá de la demografía para entender qué ve, oye, piensa y siente su mercado objetivo.",
      href: "/CX TOOLS 1 - Mapa de empatía.pdf"
    },
    {
      title: "Value Proposition Canvas",
      desc: "Modelo estratégico para encajar sus productos y servicios con las necesidades y deseos específicos del cliente. Conecta el perfil del cliente con su propuesta de valor para crear una oferta donde el precio deja de ser el factor decisivo.",
      href: "/CX TOOLS 2 - Value Proposition Canvas.pdf"
    },
    {
      title: "Customer Journey Map",
      desc: "Mapa de ruta integral que visualiza cada punto de contacto entre el cliente y su empresa. Mide los picos emocionales y las caídas de servicio en cada etapa para maximizar retención y valor de vida del cliente.",
      href: "/CX TOOLS 3 - Customer Journey Map.pdf"
    }
  ];

  return (
    <>
      <AnimatedHero
        title="CX TOOLS"
        subtitle="Liderazgo de Autor"
        description="Análisis crítico y perspectivas estratégicas sobre el futuro de la hospitalidad y la neurociencia aplicada."
        bgClass="bg-forix-blue"
        rectClass="bg-forix-gray"
        backgroundImage="/hero_articulos.jpg"
      />
      <section id="articulos" className="section-spacing bg-forix-gray relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] forix-symbol-pattern pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-forix-mint text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">Perspectivas para Directivos</h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-forix-mint">
                Que No se Conforman <br /> <span className="font-signature font-light text-white">con el Promedio.</span>
              </h3>
              <p className="text-lg text-forix-gray font-light mt-6">
                Análisis de alto nivel sobre CXM, neurociencia aplicada y cultura organizacional.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((a, i) => {
              const icons = [Activity, Compass, Users];
              return <ArticleCard key={a.slug} index={i} {...a} icon={icons[i]} onClick={() => setCurrentView(getArticleView(a.slug))} />;
            })}
          </div>

          <div className="mt-24 border-t border-forix-mint/15 pt-20">
            <div className="max-w-2xl mb-12">
              <h3 className="text-forix-mint text-xs font-bold tracking-[0.3em] uppercase mb-4">Plantillas Descargables</h3>
              <p className="text-xl md:text-2xl text-forix-white font-light leading-relaxed">
                Herramientas diseñadas para quienes han dejado de vender productos y han comenzado a diseñar experiencias. No es gestión; es la ingeniería detrás de una Experiencia Boutique
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <a
                  key={template.href}
                  href={template.href}
                  download
                  className="group relative border border-forix-mint/30 bg-white/[0.03] p-6 sm:p-8 md:p-10 transition-all duration-500 hover:bg-forix-mint hover:text-forix-blue"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-forix-green group-hover:text-forix-blue">CX TOOLKIT</span>
                    <Download size={18} className="text-forix-green group-hover:text-forix-blue transition-colors" />
                  </div>
                  <h4 className="text-2xl font-bold text-forix-white group-hover:text-forix-blue leading-tight mb-4 transition-colors duration-500">
                    {template.title}
                  </h4>
                  <p className="text-[17px] text-forix-mint/75 group-hover:text-forix-blue/75 leading-relaxed transition-colors duration-500">
                    {template.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-forix-green group-hover:text-forix-blue transition-colors duration-500">
                    Descargar plantilla <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="pointer-events-none absolute inset-[14px] border border-white/6 group-hover:border-forix-blue/10 transition-colors duration-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ArticleDetailView = ({ article, setCurrentView }: { article: ArticleData, setCurrentView: (view: string) => void }) => {
  return (
    <>
      <AnimatedHero
        title={article.title}
        subtitle={article.category}
        description={article.subtitle}
        bgClass="bg-forix-blue"
        rectClass="bg-forix-gray"
        titleClassName="text-4xl md:text-6xl lg:text-7xl"
      />

      <section className="bg-forix-white py-24">
        <div className="container-custom">
          <button
            onClick={() => setCurrentView('articulos')}
            className="mb-12 text-forix-green text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2"
          >
            <ChevronRight size={14} className="rotate-180" />
            Volver a Articulos
          </button>

          <div className="grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-8 sm:gap-16">
            <aside className="space-y-8">
              <div className="border border-forix-mint/30 p-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-forix-green mb-3">{article.category}</p>
                <p className="text-2xl font-bold text-forix-blue leading-tight mb-4">{article.title}</p>
                <p className="text-sm text-forix-gray/70 font-light leading-relaxed">{article.readingTime}</p>
              </div>
            </aside>

            <article className="max-w-4xl">
              <header className="border-b border-forix-mint/30 pb-12 mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-forix-green mb-5">{article.readingTime}</p>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-forix-blue tracking-tight leading-[0.95] mb-6">{article.title}</h1>
                <p className="text-xl md:text-2xl text-forix-gray/70 font-light leading-relaxed mb-8">{article.subtitle}</p>
              </header>

              <div className="space-y-14">
                {article.blocks?.map((block, index) => {
                  if (block.type === 'hr') {
                    return <div key={index} className="h-px bg-forix-mint/30" />;
                  }

                  if (block.type === 'heading') {
                    if (block.level === 3) {
                      return (
                        <h3 key={index} className="text-xl md:text-2xl font-bold text-forix-green tracking-[0.08em] uppercase">
                          {block.text}
                        </h3>
                      );
                    }

                    return (
                      <h2 key={index} className="text-3xl md:text-4xl font-bold text-forix-blue tracking-tight">
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === 'list') {
                    return (
                      <div key={index} className="grid gap-4">
                        {block.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-4 border border-forix-mint/20 bg-forix-ghost/20 p-5">
                            <span className="mt-2 h-2 w-2 bg-forix-green shrink-0" />
                            <p className="text-base text-forix-blue/85 leading-relaxed">{renderInlineMarkdown(item)}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="text-lg text-forix-gray leading-relaxed font-light">
                      {renderInlineMarkdown(block.text)}
                    </p>
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

const DiagnosticModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [contactName, setContactName] = useState('');
  const [contactCargo, setContactCargo] = useState('');
  const [contactEmpresa, setContactEmpresa] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactIndustria, setContactIndustria] = useState('');
  const [contactEmpleados, setContactEmpleados] = useState('');
  const [contactPreferencia, setContactPreferencia] = useState('');
  const [contactSubStep, setContactSubStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL?.trim();
  const [particles] = useState(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 2,
    size: 4 + Math.random() * 8,
    color: ['#14385C', '#3D7072', '#D8E1E0', '#2ecc71', '#14385C'][Math.floor(Math.random() * 5)],
  })));

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      modalScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, [isOpen, step]);

  const questions = [
    {
      id: 1,
      title: "¿Del 1 al 10, qué tan consistente es la experiencia que recibe un cliente en su empresa, independientemente de quién lo atienda o en qué sucursal esté?",
      type: "scale",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      id: 2,
      title: "¿Cuenta con un manual de estándares de hospitalidad y lenguaje de marca que sea de lectura obligatoria para todo el personal?",
      type: "choice",
      options: [
        "Sí",
        "No",
        "Solo para algunos puestos"
      ]
    },
    {
      id: 3,
      title: "¿Cuándo fue la última vez que se realizó una auditoría o 'Mystery Shopper' para verificar que esos estándares se cumplen realmente en el punto de contacto?",
      type: "choice",
      options: [
        "Último mes",
        "Últimos 6 meses",
        "Hace más de un año",
        "Nunca"
      ]
    },
    {
      id: 4,
      title: "¿Qué porcentaje de sus clientes actuales dejan una retroalimentación (NPS o encuesta) después de su compra?",
      type: "choice",
      options: [
        "Menos del 5% (Nivel Crítico)",
        "Entre el 5% y el 20% (Nivel Estándar)",
        "Más del 20% (Nivel Avanzado)",
        "No lo medimos"
      ]
    },
    {
      id: 5,
      title: "De los comentarios negativos recibidos en el último mes, ¿en qué porcentaje de los casos se cambió un proceso interno para que ese error no vuelva a suceder?",
      type: "choice",
      options: [
        "En todos los casos",
        "En algunos casos",
        "Solo se resolvió la queja individual",
        "No hacemos ese seguimiento"
      ]
    },
    {
      id: 6,
      title: "¿Tienen identificados cuáles son los 3 \"Momentos de la Verdad\" (picos emocionales) donde su cliente decide si volverá a comprar o no?",
      type: "choice",
      options: [
        "Sí",
        "No"
      ]
    },
    {
      id: 7,
      title: "¿Sabe cuántos clientes está perdiendo hoy mismo debido a una mala experiencia que nunca llegó a reportarse?",
      type: "choice",
      options: [
        "Lo sé con exactitud",
        "Tengo un estimado preocupante",
        "No tengo forma de saberlo actualmente"
      ]
    }
  ];

  // Total steps: questions + 3 contact sub-steps
  const totalContactSteps = 3;
  const totalSteps = questions.length + totalContactSteps;
  const isContactStep = step >= questions.length && step < questions.length + totalContactSteps;
  const isCompleted = step >= questions.length + totalContactSteps;

  const handleAnswer = (answer: string | number) => {
    setAnswers({ ...answers, [step]: answer });
    setTimeout(() => setStep(step + 1), 300);
  };

  const saveDiagnostic = async () => {
    if (isSubmitting) return;

    const answersText = questions.map((q, i) =>
      `P${i + 1}: ${q.title}\nR: ${answers[i] ?? 'Sin respuesta'}`
    ).join('\n\n');

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: contactName,
      cargo: contactCargo,
      empresa: contactEmpresa,
      phone: contactPhone,
      email: contactEmail,
      industria: contactIndustria,
      empleados: contactEmpleados,
      preferencia_contacto: contactPreferencia,
      answers: questions.map((q, i) => ({
        question: q.title,
        answer: answers[i] ?? ''
      }))
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('forix_diagnostics') || '[]');
    existing.push(entry);
    localStorage.setItem('forix_diagnostics', JSON.stringify(existing));

    setIsSubmitting(true);

    try {
      if (googleSheetsUrl) {
        await fetch(googleSheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            id: entry.id,
            name: contactName,
            cargo: contactCargo,
            empresa: contactEmpresa,
            phone: contactPhone,
            email: contactEmail,
            industria: contactIndustria,
            empleados: contactEmpleados,
            preferencia_contacto: contactPreferencia,
            date: entry.date,
            answers: entry.answers,
            answersText,
            p1: String(answers[0] ?? ''),
            p2: String(answers[1] ?? ''),
            p3: String(answers[2] ?? ''),
            p4: String(answers[3] ?? ''),
            p5: String(answers[4] ?? ''),
            p6: String(answers[5] ?? ''),
            p7: String(answers[6] ?? ''),
          }),
        });
      }
    } catch {
      // Keep local fallback even if Google Sheets delivery is unavailable.
    } finally {
      setIsSubmitting(false);
    }

    setStep(step + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalScrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#F4F4F4] flex items-start justify-center overflow-y-auto px-4 sm:px-6 md:px-16 lg:px-24 py-8 sm:py-10 md:py-12 lg:py-14"
      >
        {/* Confetti particles */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
                animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 720 }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                style={{ position: 'absolute', width: p.size, height: p.size, borderRadius: p.size > 8 ? '50%' : '2px', backgroundColor: p.color }}
              />
            ))}
          </div>
        )}

        {/* Brand Logo watermark */}
        <div className="absolute bottom-8 right-8 w-20 md:w-32 opacity-[0.04] pointer-events-none z-0">
          <svg viewBox="0 0 220 360" className="w-full h-auto" fill="#3D7072" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L40,0 L25,180 L40,360 L0,360 L15,180 Z" />
            <path d="M60,0 L100,0 L85,180 L100,360 L60,360 L75,180 Z" />
            <path d="M120,0 L160,0 L145,180 L160,360 L120,360 L135,180 Z" />
            <path d="M180,0 L220,0 L205,180 L220,360 L180,360 L195,180 Z" />
          </svg>
        </div>

        <button onClick={() => { onClose(); setStep(0); setAnswers({}); setContactName(''); setContactCargo(''); setContactEmpresa(''); setContactPhone(''); setContactEmail(''); setContactIndustria(''); setContactEmpleados(''); setContactPreferencia(''); setContactSubStep(0); }} className="absolute top-5 right-5 md:top-8 md:right-8 text-forix-blue hover:text-forix-green transition-colors z-10">
          <X size={32} strokeWidth={1.5} />
        </button>

        {/* Progress bar */}
        {!isCompleted && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-black/5">
            <motion.div
              className="h-full bg-forix-green"
              animate={{ width: `${((step) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        )}

        <div className="max-w-6xl w-full relative z-10">
          <AnimatePresence mode="wait">
            {/* Questions */}
            {step < questions.length && (
              <motion.div
                key={`question-${step}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5">
                  PREGUNTA {step + 1} DE {questions.length}
                </p>
                <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#14385C] leading-[1.18] mb-6 sm:mb-8 lg:mb-10 max-w-5xl">
                  {questions[step].title}
                </h3>

                {questions[step].type === 'scale' && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center border border-black/10 bg-transparent text-base sm:text-lg md:text-xl font-light text-[#14385C] hover:bg-white hover:border-transparent hover:shadow-lg transition-all duration-300"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {questions[step].type === 'choice' && (
                  <div className="space-y-3 sm:space-y-4">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left p-4 sm:p-5 md:p-6 border border-black/10 bg-transparent text-sm sm:text-lg md:text-xl font-light text-[#14385C] hover:bg-white hover:border-transparent hover:shadow-lg transition-all duration-300 group flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ArrowRight size={20} className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#3D7072]" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact info sub-steps */}
            {isContactStep && !isCompleted && (
              <AnimatePresence mode="wait">
                {/* Sub-step 1: Datos personales */}
                {step === questions.length && (
                  <motion.div
                    key="contact-step-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5">
                      PASO 1 DE 3
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#14385C] leading-[1.18] mb-4 sm:mb-5 max-w-4xl">
                      Para enviarle los resultados, necesitamos algunos datos.
                    </h3>
                    <p className="text-base md:text-lg text-forix-gray/70 font-light mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                      Su información se mantendrá estrictamente confidencial.
                    </p>

                    <div className="space-y-4 max-w-lg">
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Nombre completo</label>
                        <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Ej: Mauricio Vacaflores" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Cargo</label>
                        <input type="text" value={contactCargo} onChange={(e) => setContactCargo(e.target.value)} placeholder="Ej: Director General" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Empresa</label>
                        <input type="text" value={contactEmpresa} onChange={(e) => setContactEmpresa(e.target.value)} placeholder="Ej: Hotel Boutique Santa Cruz" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Celular</label>
                        <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Ej: +591 79570160" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Correo electrónico</label>
                        <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Ej: nombre@empresa.com" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <PrimaryButton
                        onClick={() => setStep(step + 1)}
                        className={`text-base md:text-lg py-4 px-12 w-full mt-3 ${!contactName || !contactPhone || !contactEmail ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        SIGUIENTE
                      </PrimaryButton>
                    </div>
                  </motion.div>
                )}

                {/* Sub-step 2: Empresa */}
                {step === questions.length + 1 && (
                  <motion.div
                    key="contact-step-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5">
                      PASO 2 DE 3
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#14385C] leading-[1.18] mb-4 sm:mb-5 max-w-4xl">
                      Cuéntenos sobre su organización.
                    </h3>
                    <p className="text-base md:text-lg text-forix-gray/70 font-light mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                      Esto nos permite personalizar sus resultados.
                    </p>

                    <div className="space-y-4 max-w-lg">
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Industria o sector</label>
                        <input type="text" value={contactIndustria} onChange={(e) => setContactIndustria(e.target.value)} placeholder="Ej: Hotelería, Restauración, Retail..." className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Número de empleados</label>
                        <input type="text" value={contactEmpleados} onChange={(e) => setContactEmpleados(e.target.value)} placeholder="Ej: 50" className="w-full p-4 border border-black/10 bg-transparent text-base md:text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300" />
                      </div>
                      <PrimaryButton
                        onClick={() => setStep(step + 1)}
                        className={`text-base md:text-lg py-4 px-12 w-full mt-3 ${!contactIndustria || !contactEmpleados ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        SIGUIENTE
                      </PrimaryButton>
                    </div>
                  </motion.div>
                )}

                {/* Sub-step 3: Preferencia de contacto */}
                {step === questions.length + 2 && (
                  <motion.div
                    key="contact-step-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5">
                      ÚLTIMO PASO
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#14385C] leading-[1.18] mb-6 sm:mb-8 max-w-4xl">
                      ¿Cómo prefieres que te contactemos?
                    </h3>

                    <div className="space-y-4 max-w-lg">
                      {["WhatsApp", "Llamada"].map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setContactPreferencia(option)}
                          className={`w-full text-left p-4 border transition-all duration-300 text-base md:text-lg font-light ${
                            contactPreferencia === option
                              ? 'border-[#3D7072] bg-[#3D7072]/5 text-[#14385C]'
                              : 'border-black/10 text-[#14385C]/70 hover:border-[#3D7072]/50'
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                      <PrimaryButton
                        onClick={saveDiagnostic}
                        className={`text-base md:text-lg py-4 px-12 w-full mt-5 ${!contactPreferencia || isSubmitting ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        {isSubmitting ? 'ENVIANDO...' : 'ENVIAR DIAGNÓSTICO'}
                      </PrimaryButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Completion screen with animation */}
            {isCompleted && (
              <motion.div
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Animated check circle */}
                <div className="relative mx-auto w-24 h-24 mb-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full border-2 border-forix-green flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <CheckCircle2 size={48} className="text-forix-green" />
                    </motion.div>
                  </motion.div>

                  {/* Pulse rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-forix-green/30"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 2, delay: 0.8 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ))}
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-bold text-forix-blue mb-6"
                >
                  Diagnóstico Completado.
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-xl text-forix-gray font-light mb-4 max-w-2xl mx-auto leading-relaxed"
                >
                  Gracias, <span className="font-medium text-forix-blue">{contactName}</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-lg text-forix-gray font-light mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  Hemos registrado sus respuestas. El siguiente paso es agendar una sesión estratégica directa con Mauricio Vacaflores para revisar sus resultados y trazar un roadmap de maximización.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <PrimaryButton
                    onClick={() => {
                      window.open('https://wa.me/59179570160?text=Hola, completé el diagnóstico FORIX y me gustaría agendar una sesión estratégica.', '_blank');
                      onClose();
                      setStep(0);
                      setAnswers({});
                      setContactName(''); setContactCargo(''); setContactEmpresa('');
                      setContactPhone(''); setContactEmail('');
                      setContactIndustria(''); setContactEmpleados('');
                      setContactPreferencia(''); setContactSubStep(0);
                    }}
                    className="text-lg py-6 px-12"
                  >
                    AGENDAR SESIÓN ESTRATÉGICA
                  </PrimaryButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contacto" className="py-16 sm:py-24 md:py-32 bg-[#F4F4F4] overflow-hidden relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center">
      {/* Brand Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: 'url("/image (1).png")',
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center'
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <h2 className="text-forix-blue text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-8">Sesión Estratégica</h2>

        <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold text-forix-blue mb-6 leading-tight tracking-tight max-w-4xl">
          ¿Cuánto le cuesta el silencio de los clientes que no regresan?
        </h3>

        <p className="text-base sm:text-lg md:text-xl text-forix-gray/70 font-light mb-10 sm:mb-16 max-w-2xl leading-relaxed">
          Transforme la lealtad en su activo más rentable, no en un costo de marketing.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-forix-green text-white px-6 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6 font-medium tracking-[0.1em] sm:tracking-[0.15em] uppercase text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-forix-blue flex items-center gap-3 sm:gap-4 group shadow-lg hover:shadow-xl"
          >
            Solicitar diagnóstico gratuito
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </motion.div>
      </div>

      <DiagnosticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-forix-white py-10 sm:py-16 border-t border-forix-mint">
      <div className="container-custom flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-10">
          <div className="flex items-center">
            <img src="/logo_navbar.png" className="h-8 w-auto" alt="FORIX GROUP" />
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-10 items-center">
            <a href="https://www.facebook.com/profile.php?id=61587846722543" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-xs uppercase font-bold tracking-wider md:tracking-widest text-forix-gray hover:text-forix-blue flex items-center gap-1.5 md:gap-2 transition-colors duration-300"><Facebook size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Facebook</span></a>
            <a href="https://www.instagram.com/forixgroup.bo" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-xs uppercase font-bold tracking-wider md:tracking-widest text-forix-gray hover:text-forix-blue flex items-center gap-1.5 md:gap-2 transition-colors duration-300"><Instagram size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Instagram</span></a>
            <a href="https://www.linkedin.com/company/forix-group" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-xs uppercase font-bold tracking-wider md:tracking-widest text-forix-gray hover:text-forix-blue flex items-center gap-1.5 md:gap-2 transition-colors duration-300"><Linkedin size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">LinkedIn</span></a>
            <a href="mailto:mauricioniafab@gmail.com" className="text-[9px] md:text-xs uppercase font-bold tracking-wider md:tracking-widest text-forix-gray hover:text-forix-blue flex items-center gap-1.5 md:gap-2 transition-colors duration-300"><Mail size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Email</span></a>
          </div>
        </div>

        <div className="border-t border-forix-mint/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase font-bold tracking-widest text-forix-gray/40">
            © {new Date().getFullYear()} FORIX GROUP. Todos los derechos reservados.
          </p>
          <p className="text-[10px] tracking-widest text-forix-gray/40">
            mauricioniafab@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progressRatio = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progressRatio, 4);

      setProgress(Math.floor(easeProgress * 100));

      if (progressRatio < 1) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(onComplete, 600);
      }
    };

    window.requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center"
    >
      {/* Línea de progreso central - rayo de luz azul */}
      <div className="w-full relative h-[1px] bg-black/10">
        {/* Estela de luz que deja la bolita */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px]"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, transparent 0%, rgba(20,56,92,0.1) 30%, rgba(61,112,114,0.4) 70%, #3D7072 100%)',
          }}
        />

        {/* Bolita principal con glow fosforescente */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${progress}%` }}
          animate={{
            boxShadow: [
              '0 0 8px 2px rgba(61,112,114,0.6), 0 0 20px 6px rgba(61,112,114,0.3), 0 0 40px 12px rgba(61,112,114,0.15)',
              '0 0 12px 4px rgba(61,112,114,0.9), 0 0 30px 10px rgba(61,112,114,0.5), 0 0 60px 20px rgba(61,112,114,0.25)',
              '0 0 8px 2px rgba(61,112,114,0.6), 0 0 20px 6px rgba(61,112,114,0.3), 0 0 40px 12px rgba(61,112,114,0.15)',
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Core brillante */}
          <div className="w-[6px] h-[6px] rounded-full bg-white -translate-x-1/2 relative z-10" />
          {/* Halo azul interno */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-[#3D7072]/50 blur-[3px]" />
          {/* Halo azul externo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-[#3D7072]/20 blur-[8px]" />
        </motion.div>

        {/* Rayo de luz trailing - efecto de cola luminosa */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-[1px]"
          style={{
            left: `${Math.max(0, progress - 15)}%`,
            width: `${Math.min(progress, 15)}%`,
            background: 'linear-gradient(to right, transparent, rgba(61,112,114,0.8))',
          }}
        />
      </div>

      {/* Número en la parte inferior izquierda - Posicionado más hacia la esquina */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12">
        <div className="text-forix-blue text-7xl md:text-[10rem] leading-none font-sans font-light tracking-tighter opacity-85">
          {progress}
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Metodología Propietaria",
      desc: "Frameworks exclusivos que fusionan neurociencia aplicada con gestión operativa de alto nivel."
    },
    {
      title: "Enfoque en Resultados",
      desc: "No entregamos informes, entregamos transformaciones medibles en rentabilidad y valor percibido."
    },
    {
      title: "Experiencia Multisectorial",
      desc: "Desde hospitalidad de lujo hasta servicios profesionales, adaptamos la excelencia a su industria."
    },
    {
      title: "Liderazgo de Autor",
      desc: "Acompañamiento directo de especialistas senior en cada etapa del proceso estratégico."
    }
  ];

  return (
    <section className="py-24 bg-forix-ghost/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="border-l border-forix-green pl-6">
              <h4 className="text-forix-blue font-bold uppercase tracking-widest text-sm mb-4">{f.title}</h4>
              <p className="text-forix-gray/70 font-light text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GeometricSphere = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Guide Lines */}
    <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />

    {/* Outer Cube */}
    <path d="M100 40 L152 70 L152 130 L100 160 L48 130 L48 70 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <line x1="100" y1="40" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
    <line x1="100" y1="100" x2="152" y2="70" stroke="currentColor" strokeWidth="0.5" />
    <line x1="100" y1="100" x2="48" y2="70" stroke="currentColor" strokeWidth="0.5" />

    {/* Inner Cube */}
    <path d="M100 70 L126 85 L126 115 L100 130 L74 115 L74 85 Z" fill="none" stroke="currentColor" strokeWidth="0.3" />
    <line x1="100" y1="70" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" />
    <line x1="100" y1="100" x2="126" y2="85" stroke="currentColor" strokeWidth="0.3" />
    <line x1="100" y1="100" x2="74" y2="85" stroke="currentColor" strokeWidth="0.3" />
  </svg>
);

const GeometricDots = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Vertical Guide */}
    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.2" opacity="0.15" />

    {/* Chevrons - Technological Tree Structure */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const yOffset = 40 + i * 16;
      const width = 12 + i * 10;
      const height = 22;
      return (
        <path
          key={i}
          d={`M${100 - width} ${yOffset + height} L100 ${yOffset} L${100 + width} ${yOffset + height}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          opacity={1 - i * 0.12}
        />
      );
    })}
  </svg>
);

const GeometricRadial = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Central Point */}
    <circle cx="100" cy="100" r="1" fill="currentColor" />

    {/* Radial Lines */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      return (
        <React.Fragment key={i}>
          <line
            x1="100" y1="100"
            x2={100 + 75 * Math.cos(angle)}
            y2={100 + 75 * Math.sin(angle)}
            stroke="currentColor" strokeWidth="0.2" opacity="0.3"
          />
          {/* Outer Nodes */}
          <circle
            cx={100 + 75 * Math.cos(angle)}
            cy={100 + 75 * Math.sin(angle)}
            r="1.5" fill="currentColor"
          />
          {/* Inner Nodes */}
          <circle
            cx={100 + 45 * Math.cos(angle)}
            cy={100 + 45 * Math.sin(angle)}
            r="1" fill="currentColor" opacity="0.6"
          />
        </React.Fragment>
      );
    })}

    {/* Connections */}
    <path
      d={Array.from({ length: 13 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return `${i === 0 ? 'M' : 'L'} ${100 + 75 * Math.cos(angle)} ${100 + 75 * Math.sin(angle)}`;
      }).join(' ')}
      fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"
    />
    <path
      d={Array.from({ length: 13 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return `${i === 0 ? 'M' : 'L'} ${100 + 45 * Math.cos(angle)} ${100 + 45 * Math.sin(angle)}`;
      }).join(' ')}
      fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3"
    />
  </svg>
);

const ForixBusinessTypoLogo = () => (
  <div className="flex flex-col items-start w-full group-hover:text-forix-mint transition-colors duration-500 text-forix-blue">
    <img src="/forix_business_nobg.png" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX BUSINESS" />
  </div>
);

const ForixLearningTypoLogo = () => (
  <div className="flex flex-col items-start w-full group-hover:text-forix-mint transition-colors duration-500 text-forix-blue">
    <img src="/forix_learning_nobg.png" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX LEARNING" />
  </div>
);

const ForixLabTypoLogo = () => (
  <div className="flex flex-col items-start w-full group-hover:text-forix-mint transition-colors duration-500 text-forix-blue">
    <img src="/logo_lab.png" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX LAB" />
  </div>
);

const PillarCard = ({ title, desc, icon: Icon, customHeader, onClick, image }: { title?: React.ReactNode, desc: React.ReactNode, icon?: React.FC, customHeader?: React.ReactNode, onClick: () => void, image?: string }) => (
  <motion.div
    whileHover={{ backgroundColor: "#14385C", color: "#F4F2F1" }}
    onClick={onClick}
    className="group relative bg-forix-ghost/40 p-6 sm:p-8 md:p-12 flex flex-col items-start text-left transition-all duration-500 cursor-pointer border border-forix-gray/5 overflow-hidden h-full min-h-[320px] sm:min-h-[400px] md:min-h-[500px]"
  >
    {image && (
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 blur-[3px] group-hover:blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-forix-white/80 group-hover:bg-forix-blue/60 transition-all duration-1000" />
      </div>
    )}

    {!image && (
      <div className="w-full aspect-square mb-8 flex items-center justify-center relative z-10">
        {customHeader ? (
          <div className="w-full transition-colors duration-500">
            {customHeader}
          </div>
        ) : Icon ? (
          <div className="w-40 h-40 md:w-56 md:h-56 text-forix-blue group-hover:text-forix-mint transition-colors duration-500 opacity-60 group-hover:opacity-100">
            <Icon />
          </div>
        ) : null}
      </div>
    )}

    <div className="mt-auto w-full relative z-10">
      {title && (
        <div className="mb-4 transition-colors duration-500">
          {typeof title === 'string' ? (
            <h4 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase">{title}</h4>
          ) : (
            title
          )}
        </div>
      )}
      <div className="text-sm md:text-base font-light leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity duration-500 tracking-wider min-h-[60px] md:min-h-[80px]">{desc}</div>
    </div>

    {/* Bauhaus Accent */}
    <div className="absolute top-0 right-0 w-1 h-0 bg-forix-green group-hover:h-full transition-all duration-700 z-10" />
  </motion.div>
);

const IntelligenceDiamondMatrix = () => {
  const shapes = Array.from({ length: 64 });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Main Precision Shapes (Matching Image 1) */}
      {shapes.map((_, i) => {
        const initialX = (Math.random() - 0.5) * 1800;
        const initialY = (Math.random() - 0.5) * 1800;

        // Further reduced size for a subtle and elegant look
        const width = 12 + Math.random() * 8;
        const height = width * 4;

        // Alternate between Mint and Green for "un tono mas"
        const isGreen = i % 3 === 0;

        return (
          <motion.div
            key={i}
            initial={{ x: initialX, y: initialY, opacity: 0.05, rotate: 0 }}
            animate={{
              x: [initialX, initialX + (Math.random() - 0.5) * 200],
              y: [initialY, initialY + (Math.random() - 0.5) * 200],
              opacity: [0.02, isGreen ? 0.25 : 0.2, 0.02], // Reduced opacity for subtlety
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 30 + Math.random() * 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className={`absolute ${isGreen ? 'bg-forix-green/20' : 'bg-forix-mint/25'}`}
            style={{
              width,
              height,
              clipPath: "polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%)",
            }}
          />
        );
      })}

      {/* Subtle rotating rings to add depth */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute w-[85%] h-[85%] border border-forix-mint/5 rounded-none border-dashed opacity-10"
      />
    </div>
  );
};

const HorizontalAboutSection = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333%"]);
  const lineWidth = useTransform(scrollYProgress, [0.08, 0.96], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.92, 1], [0, 1, 1, 0.3]);

  // Background color transitions - "Painting with light" - More vibrant and aligned
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#14385C", "#1E4B7A", "#3D7072", "#2A2A2A", "#14385C", "#050505"]
  );

  // Dynamic light glow following the scroll - more intense and focused
  const lightGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(216,225,224,0.2) 0%, transparent 60%)",
      "radial-gradient(circle at 75% 50%, rgba(216,225,224,0.25) 0%, transparent 70%)",
      "radial-gradient(circle at 95% 50%, rgba(216,225,224,0.2) 0%, transparent 60%)"
    ]
  );

  const features = [
    {
      id: "01",
      title: "\u201CPorque en un mundo que olvida lo que dices, nosotros recordamos lo que sientes...\u201D",
      desc: ""
    },
    {
      id: "02",
      title: "\u201C...cambiamos la lógica del negocio por la magia de la hospitalidad irracional...\u201D",
      desc: ""
    },
    {
      id: "03",
      title: "\u201C...poniendo el corazón en cada detalle para que su equipo y su cliente...\u201D",
      desc: ""
    },
    {
      id: "04",
      title: "\u201C...nunca dejen de sentir que este es el lugar al que pertenecen...\u201D",
      desc: ""
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[500vh]">
      <motion.div
        style={{ backgroundColor: bgColor, backgroundImage: lightGlow }}
        className="sticky top-0 flex h-screen items-center overflow-hidden transition-colors duration-1000"
      >
        {/* Continuous line anchored to the viewport, not the moving track */}
        <motion.div
          style={{ width: lineWidth, opacity: lineOpacity }}
          className="absolute top-[76%] left-0 h-[2px] bg-forix-mint z-0 pointer-events-none origin-left shadow-[0_0_50px_rgba(216,225,224,1),0_0_20px_rgba(216,225,224,0.6)] md:top-[77%]"
        >
          <div className="absolute top-1/2 left-0 h-[1px] w-screen -translate-y-1/2 bg-white/12 pointer-events-none" />
          <motion.div
            style={{ left: "100%" }}
            className="absolute top-1/2 -translate-y-1/2 w-24 h-24 bg-forix-mint/30 blur-2xl rounded-full"
          />
          <motion.div
            style={{ left: "100%" }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-forix-mint blur-[2px] rounded-full shadow-[0_0_20px_#D8E1E0]"
          />
        </motion.div>

        <motion.div style={{ x }} className="flex relative">

          {/* INTRO SLIDE (Style of Image 2) */}
          <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center px-6">
            {/* Technological Background - Diamond Matrix */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
              <div className="w-[120vh] h-[120vh]">
                <IntelligenceDiamondMatrix />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative z-10 flex flex-col items-center"
            >
              <h2 className="flex flex-col items-center mb-8 sm:mb-12">
                <span className="text-forix-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Redefinimos la
                </span>
                <span className="font-signature font-light text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.4] z-10 py-4 sm:py-6 !text-forix-green">
                  Hospitalidad
                </span>
                <span className="text-forix-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mt-2 sm:mt-4">
                  estratégica.
                </span>
              </h2>

              <div className="relative w-full flex flex-col items-center">
                <p className="text-forix-mint/80 text-base sm:text-xl md:text-[1.9rem] font-light leading-relaxed max-w-4xl mt-6 sm:mt-12">
                  Somos un ecosistema boutique de transformación humana y empresarial enfocado en hospitalidad, restauración, turismo y negocios experienciales.
                </p>
              </div>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/10" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/10" />
          </div>

          {/* FEATURE SLIDES (Style of Image 1) */}
          {features.map((f, i) => (
            <div key={i} className="relative h-screen w-screen flex items-center justify-center px-4 sm:px-8 md:px-24">
              {/* Subtle Background Diamonds for Features - Stronger effect as requested */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
                <div className="w-full h-full">
                  <IntelligenceDiamondMatrix />
                </div>
              </div>

              <div className="max-w-5xl w-full relative z-10">
                {/* Content Side - Centered and Minimalist */}
                <div className="flex flex-col items-center text-center">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`text-forix-white mb-6 sm:mb-10 leading-[1.05] max-w-[20ch] italic ${f.desc ? 'font-bold text-3xl sm:text-5xl md:text-7xl tracking-tighter uppercase' : 'font-light text-[1.6rem] sm:text-[2.6rem] md:text-[3.5rem] lg:text-[4.35rem] tracking-tight'}`}
                  >
                    {f.title}
                  </motion.h3>

                  {f.desc && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-xl md:text-2xl text-forix-mint/80 font-light leading-relaxed max-w-2xl"
                    >
                      {f.desc}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 w-24 h-[1px] bg-forix-mint/40"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* FINAL CTA SLIDE */}
          <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center px-6">
            {/* Background Diamonds for CTA - Subtle and elegant */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
              <div className="w-full h-full">
                <IntelligenceDiamondMatrix />
              </div>
            </div>

            <h2 className="relative z-10 text-forix-white text-2xl sm:text-4xl md:text-6xl font-bold mb-8 sm:mb-12 tracking-tighter">
              ¿Listo para elevar <br /> su estándar?
            </h2>

            {/* Matching the line from the image */}
            <div className="relative z-10 w-full max-w-4xl h-[1px] bg-white/20 mb-16" />

            <SecondaryButton
              onClick={() => setCurrentView('nosotros')}
              className="relative z-10 border-forix-mint text-forix-mint hover:bg-forix-mint hover:text-forix-blue"
            >
              Conoce más sobre nosotros
            </SecondaryButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ForixSymbol = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    {[...Array(4)].map((_, i) => (
      <svg key={i} viewBox="0 0 10 100" className="h-full w-auto fill-currentColor">
        <path d="M0 0 H10 L5 50 L10 100 H0 L5 50 Z" />
      </svg>
    ))}
  </div>
);

const DifferentiatingPhraseSection = () => {
  // 3 lines as specified
  const lines = [
    { text: '"La Hospitalidad es un placer egoísta,', boldWords: ['HOSPITALIDAD', 'PLACER'] },
    { text: 'hacer que los demás se sientan bien,', boldWords: [] },
    { text: 'te hace feliz."', boldWords: ['FELIZ'] },
  ];

  const getWordStyle = (word: string, boldWords: string[]) => {
    const cleanWord = word.toUpperCase().replace(/[,.""\u201C\u201D]/g, "");
    if (boldWords.includes(cleanWord)) return "text-forix-white font-semibold tracking-tight font-sans";
    return "text-forix-white/70 font-light tracking-[0.14em] font-sans";
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      },
    },
  };

  return (
    <section className="py-20 bg-forix-blue relative overflow-hidden flex items-center justify-center min-h-[55vh]">
      {/* Subtle Large Geometric Figures on the Left */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none flex items-center justify-start pl-4 md:pl-12 z-0">
        <div className="flex gap-6 md:gap-10 items-center h-full">
          {[
            { color: 'bg-forix-mint', opacity: 0.4, delay: 0 },
            { color: 'bg-forix-green', opacity: 0.35, delay: 0.4 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: i % 2 === 0 ? 40 : -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: item.opacity }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: item.delay, ease: "easeOut" }}
              className={`w-14 md:w-24 h-[140%] ${item.color}`}
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 52.5% 50%, 100% 100%, 0% 100%, 47.5% 50%)" }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-y-3 md:gap-y-5 max-w-4xl mx-auto"
        >
          {lines.map((line, lineIdx) => (
            <motion.p
              key={lineIdx}
              variants={lineVariants}
              className="flex flex-wrap justify-center gap-x-2 md:gap-x-4"
            >
              {line.text.split(" ").map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className={`text-lg sm:text-2xl md:text-4xl lg:text-5xl tracking-tight leading-relaxed italic ${getWordStyle(word, line.boldWords)}`}
                >
                  {word}
                </span>
              ))}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-16 h-[1px] w-24 bg-forix-mint/30 mx-auto"
        />
      </div>
    </section>
  );
};

const ImmersivePhotoSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale the center image to fully cover the screen
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [1, 3.8]);
  const skewX = useTransform(scrollYProgress, [0.1, 0.9], [0, 2]);
  const centerFilter = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.5],
    ["grayscale(100%) saturate(0)", "grayscale(60%) saturate(0.4)", "grayscale(0%) saturate(1)"]
  );

  // Fade and scale side images away
  const sideOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);
  const sideScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 0.9]);
  const sideY = useTransform(scrollYProgress, [0.1, 0.35], [0, -20]);
  const collageImageClass = "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700";
  const galleryTileClass = "relative group overflow-hidden border border-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]";

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#050505] overflow-visible">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#040404] to-black" />
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="hidden md:grid grid-cols-[1.1fr_0.95fr_1.25fr_1.25fr_0.95fr_0.9fr] grid-rows-12 gap-[4px] p-[4px] w-full h-screen max-w-full">
            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-1 row-start-1 row-span-8`}
            >
              <img src="/foto 2.png" alt="Forix business" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-1 row-start-9 row-span-4`}
            >
              <img src="/gallery/SSS00129_VSCO.JPG" alt="Forix discussion scene" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-2 row-start-1 row-span-3`}
            >
              <img src="/gallery/SSS00108_VSCO.JPG" alt="Forix presentation laptop" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-2 row-start-4 row-span-5`}
            >
              <img src="/gallery/HERO ABOUT UDS.JPG" alt="Forix 2022 presentation" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-2 row-start-9 row-span-4`}
            >
              <img src="/gallery/FORIX LAB.JPG" alt="Forix phone experience" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ scale, skewX }}
              className="relative z-20 col-start-3 col-span-2 row-start-1 row-span-12 group overflow-hidden border border-white/20 shadow-[0_0_120px_rgba(0,0,0,0.95),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            >
              <motion.img
                src="/gallery/business.JPG"
                alt="Forix signature portrait"
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: centerFilter }}
              />

              <motion.div
                style={{ opacity: sideOpacity }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none"
              />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-5 row-start-1 row-span-3`}
            >
              <img src="/gallery/HERO SERV.JPG" alt="Forix service presentation" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-5 row-start-4 row-span-5`}
            >
              <img src="/gallery/HERO SERVICIES.JPG" alt="Forix service desk overview" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-5 row-start-9 row-span-4`}
            >
              <img src="/metric_300.jpg" alt="Forix metrics" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-6 row-start-1 row-span-6`}
            >
              <img src="/gallery/HERO MAIN.JPG" alt="Forix tabletop composition" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className={`${galleryTileClass} col-start-6 row-start-7 row-span-6`}
            >
              <img src="/gallery/SSS00146_VSCO.JPG" alt="Forix signed card portrait" className={collageImageClass} />
            </motion.div>
          </div>

          <div className="grid md:hidden grid-cols-2 grid-rows-6 gap-[4px] p-[4px] w-full h-screen max-w-full">
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={`${galleryTileClass} row-span-2`}>
              <img src="/foto 2.png" alt="Forix business" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={galleryTileClass}>
              <img src="/gallery/SSS00108_VSCO.JPG" alt="Forix presentation laptop" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ scale, skewX }} className="relative row-span-2 group overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
              <motion.img
                src="/gallery/business.JPG"
                alt="Forix signature portrait"
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: centerFilter }}
              />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={`${galleryTileClass} row-span-2`}>
              <img src="/gallery/HERO SERVICIES.JPG" alt="Forix service desk overview" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={galleryTileClass}>
              <img src="/gallery/HERO MAIN.JPG" alt="Forix tabletop composition" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={galleryTileClass}>
              <img src="/gallery/SSS00146_VSCO.JPG" alt="Forix signed card portrait" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={galleryTileClass}>
              <img src="/gallery/FORIX LAB.JPG" alt="Forix phone experience" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className={galleryTileClass}>
              <img src="/metric_300.jpg" alt="Forix metrics" className={collageImageClass} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeView = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  const companies = [
    "Hotel Qhawarina",
    "El Camino Spanish School",
    "Coffee Bike",
    "Verbalia Spanish School",
    "Visu Club",
    "Villa",
    "La Casa del Silpancho",
    "Mercamax",
    "Encinas Legis Group",
    "Trendy Marketing Digital"
  ];

  return (
    <>
      <Hero />

      {/* SOCIAL PROOF + METRICS - Unified section with gradient from hero */}
      <section className="relative overflow-hidden">
        {/* Gradient transition from hero black to blue */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-forix-blue to-forix-blue" />

        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-forix-green/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-forix-mint/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Social Proof */}
        <div className="relative z-10 pt-40 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="container-custom mb-12 text-center"
          >
            <span className="text-forix-green text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Confianza Demostrada</span>
            <h2 className="text-forix-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Empresas que elevaron su estándar</h2>
          </motion.div>

          <div className="relative w-full flex overflow-x-hidden py-6">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#14385C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#14385C] to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {[...companies, ...companies, ...companies].map((company, idx) => (
                <span key={idx} className="mx-10 text-sm md:text-base font-bold text-white/50 uppercase tracking-[0.4em] hover:text-forix-green transition-colors duration-500">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="relative z-10 pb-28">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
              {[
                {
                  end: 20,
                  prefix: "+",
                  label: "Ecosistemas de servicio diseñados",
                  sublabel: "Metodología 4i*X aplicada"
                },
                {
                  end: 300,
                  prefix: "+",
                  label: "Líderes y equipos transformados",
                  sublabel: "En hospitalidad y CXM"
                },
                {
                  end: 100,
                  suffix: "%",
                  label: "Implementación del Método FORIX",
                  sublabel: "Compromiso total de entrega"
                }
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="relative bg-forix-blue/40 backdrop-blur-xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center group"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-forix-green/10 to-transparent pointer-events-none" />

                  <motion.div
                    className="relative z-10 text-5xl sm:text-7xl md:text-9xl font-serif font-light tracking-tighter mb-2"
                    animate={{ color: ['#3D7072', '#D8E1E0', '#3D7072'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                  >
                    <AnimatedNumber end={metric.end} prefix={metric.prefix} suffix={metric.suffix} />
                  </motion.div>

                  <div className="relative z-10 w-8 h-[2px] bg-forix-green/30 my-6 group-hover:w-16 group-hover:bg-forix-green transition-all duration-700" />

                  <p className="relative z-10 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] text-forix-white/80 font-bold mb-2 leading-relaxed">
                    {metric.label}
                  </p>
                  <p className="relative z-10 text-[11px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-forix-mint/50 font-light">
                    {metric.sublabel}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS SUMMARY */}
      <section className="py-24 bg-forix-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-forix-blue text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-4">Nuestros Pilares</h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-forix-blue leading-tight">
                Arquitectura de <span className="font-signature font-light text-3xl sm:text-5xl md:text-6xl">Excelencia</span> Estratégica.
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 mb-16">
            {[
              {
                num: "01",
                icon: Briefcase,
                logo: <ForixBusinessTypoLogo />,
                tagline: "The Masterplan",
                items: ["Mystery Shopping", "Ingeniería de atmósfera comercial", "Arquitectura de protocolos de servicio"]
              },
              {
                num: "02",
                icon: GraduationCap,
                logo: <ForixLearningTypoLogo />,
                tagline: "Formación de Elite",
                items: ["Certificación en cultura de anfitrión", "Programa de liderazgo en gestión de experiencia", "Workshop de codificación de identidad de servicio"]
              },
              {
                num: "03",
                icon: BarChart3,
                logo: <ForixLabTypoLogo />,
                tagline: "Inteligencia Aplicada",
                items: ["Sistema de inteligencia de experiencia de cliente", "Diagnóstico de rentabilidad experiencial", "Dashboards de performance CX"]
              }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                onClick={() => setCurrentView('servicios')}
                className="group relative cursor-pointer border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0 border-forix-blue/10 px-6 sm:px-8 md:px-10 py-8 sm:py-12 md:py-16 hover:bg-forix-blue transition-all duration-700"
              >
                {/* Number */}
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] text-forix-green group-hover:text-forix-mint transition-colors duration-500 uppercase">
                  {pillar.num} — {pillar.tagline}
                </span>

                {/* Icon */}
                <div className="my-10 md:my-14 relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-forix-blue/15 group-hover:border-forix-mint/30 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                    <pillar.icon size={32} strokeWidth={1.2} className="text-forix-blue group-hover:text-forix-mint transition-colors duration-500" />
                  </div>
                  {/* Decorative line */}
                  <div className="absolute top-1/2 left-[calc(100%+12px)] w-12 h-[1px] bg-forix-blue/10 group-hover:bg-forix-mint/30 group-hover:w-20 transition-all duration-700 hidden md:block" />
                </div>

                {/* Logo */}
                <div className="mb-6">
                  {pillar.logo}
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {pillar.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="w-[3px] h-[3px] rounded-full bg-forix-green group-hover:bg-forix-mint mt-2 shrink-0 transition-colors duration-500" />
                      <p className="text-base sm:text-lg font-light text-forix-blue/60 group-hover:text-forix-white/70 tracking-wide leading-relaxed transition-colors duration-500">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-forix-green group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <SecondaryButton onClick={() => setCurrentView('servicios')}>Explorar Servicios Detallados</SecondaryButton>
          </div>
        </div>
      </section>

      <HorizontalAboutSection setCurrentView={setCurrentView} />

      <DifferentiatingPhraseSection />

      <ImmersivePhotoSection />

      {/* ARTICULOS SUMMARY */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-forix-blue text-xs font-bold tracking-[0.4em] uppercase">Artículos</h2>
            <button onClick={() => setCurrentView('articulos')} className="text-forix-green text-xs font-bold uppercase tracking-widest flex items-center gap-2">Ver Todo <ArrowRight size={14} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MARKDOWN_ARTICLES.slice(0, 3).map((article, i) => {
              const icons = [Activity, Compass, Users];
              const IconComponent = icons[i] || Activity;
              const shortSummaries = [
                'Por qué la deserción invisible destruye más valor que cualquier crisis visible.',
                'El salto de lo transaccional al vínculo emocional como ventaja competitiva.',
                'Estructura, cultura y talento al servicio de una experiencia que fideliza.'
              ];
              return (
                <motion.div
                  key={i}
                  onClick={() => setCurrentView(getArticleView(article.slug))}
                  className="group relative p-6 sm:p-10 md:p-12 border border-forix-mint/40 shadow-[0_0_0_1px_rgba(20,56,92,0.05)] transition-all duration-500 hover:bg-forix-blue hover:text-forix-white cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-forix-green">{article.category}</span>
                    <IconComponent size={20} strokeWidth={1.5} className="text-forix-green group-hover:text-forix-mint transition-colors duration-500" />
                  </div>
                  <h4 className="text-xl sm:text-[26px] md:text-[30px] font-bold text-forix-blue group-hover:text-forix-white mb-4 leading-tight transition-colors duration-500">{article.title}</h4>
                  <p className="text-sm sm:text-[17px] md:text-[18px] text-forix-gray/60 group-hover:text-forix-white/70 font-light mb-6 sm:mb-8 leading-relaxed transition-colors duration-500">{shortSummaries[i]}</p>
                  <div className="mt-auto flex items-center gap-2 text-forix-green group-hover:text-forix-mint text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                    Leer artículo <ArrowRight size={12} />
                  </div>
                  <div className="pointer-events-none absolute inset-[14px] border border-forix-blue/8 transition-colors duration-500 group-hover:border-white/15" />
                  <div className="absolute top-0 right-0 w-1 h-0 bg-forix-green group-hover:h-full transition-all duration-700" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const renderView = () => {
    if (currentView.startsWith('articulo:')) {
      const article = MARKDOWN_ARTICLES.find((entry) => getArticleView(entry.slug) === currentView);
      if (article) {
        return <ArticleDetailView article={article} setCurrentView={setCurrentView} />;
      }
    }

    switch (currentView) {
      case 'servicios':
        return <Services />;
      case 'nosotros':
        return <About />;
      case 'articulos':
        return <Resources setCurrentView={setCurrentView} />;
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main>
        {renderView()}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
