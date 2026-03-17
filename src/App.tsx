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
  Briefcase
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
const ArticleCard = ({ category, title, subtitle, summary, readingTime, index = 0, onClick }: { category: string, title: string, subtitle: string, summary: string, readingTime: string, index?: number, onClick?: () => void, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={onClick}
    className="bg-white border border-forix-gray/10 group transition-all duration-500 hover:bg-forix-blue hover:text-forix-white cursor-pointer overflow-hidden relative p-10 flex flex-col justify-between h-full"
  >
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-forix-green">{category}</span>
        <span className="w-8 h-[1px] bg-forix-mint" />
        <span className="text-[10px] uppercase font-medium tracking-[0.1em] text-forix-gray/40 group-hover:text-forix-white/50 transition-colors duration-500">{readingTime}</span>
      </div>
      <h4 className="text-[24px] font-medium text-forix-blue group-hover:text-forix-white mb-4 leading-tight tracking-tight transition-colors duration-500">{title}</h4>
      <p className="text-xs uppercase tracking-[0.25em] text-forix-gray/40 group-hover:text-forix-mint/70 transition-colors duration-500 mb-5">{subtitle}</p>
      <p className="text-[16px] font-light text-forix-gray/70 group-hover:text-forix-white/70 leading-relaxed mb-10 transition-colors duration-500">{summary}</p>
    </div>
    <div className="relative z-10 flex items-center gap-2 text-forix-green text-xs font-bold uppercase tracking-widest group-hover:text-forix-mint transition-colors duration-500">
      Leer Artículo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </div>
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
    { name: "CX Tools", id: "articulos" },
    { name: "Sesión Estratégica", id: "contacto" }
  ];

  const directLinks = [
    { name: "Soluciones", id: "servicios" },
    { name: "Método FORIX", id: "nosotros" },
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
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${isScrolled ? 'py-2 bg-forix-white/90 backdrop-blur-md border-b border-forix-mint/20' : 'py-5 bg-transparent'}`}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo Left - hidden on home page when not scrolled */}
          <div
            className={`flex items-center cursor-pointer shrink-0 transition-opacity duration-500 ${currentView === 'home' && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setCurrentView('home')}
          >
            <img src="/logo_navbar.png" className="h-4 md:h-6 w-auto" alt="FORIX GROUP" />
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
                  className={`fixed top-4 right-4 md:top-6 md:right-6 z-[70] ${isScrolled ? 'bg-forix-blue/95 backdrop-blur-md shadow-2xl border border-white/10' : 'bg-transparent border border-white/15'} rounded-none cursor-pointer group transition-all duration-500 flex flex-col overflow-hidden ${isScrolled ? 'p-1.5 px-3 py-2' : 'p-4 md:p-6 min-w-[180px] md:min-w-[250px]'}`}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkClick('contacto');
                          }}
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
                  className="fixed top-4 right-4 md:top-6 md:right-6 p-8 md:p-10 rounded-none shadow-2xl min-w-[300px] md:min-w-[360px] border border-white/10 z-[70]"
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
                        className={`text-left text-2xl md:text-3xl font-sans font-light tracking-tighter transition-all duration-500 hover:translate-x-2 group flex items-center gap-2.5 ${currentView === link.id ? 'text-white font-normal' : 'text-white/70 hover:text-white'}`}
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
  <div className="flex items-center select-none">
    <img src="/logo_hero.png" className="w-[100vw] max-w-4xl h-auto px-6 md:px-0" alt="FORIX GROUP" />
  </div>
);

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 md:px-12 lg:px-24 overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <HeroLogo />
        </motion.div>

        {/* Subtitle centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-forix-mint text-base md:text-xl font-light leading-relaxed tracking-[0.2em] uppercase text-center max-w-2xl">
            Consultora boutique especializada en<br />
            hospitalidad & customer experience
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
          className="text-forix-white hover:text-forix-green transition-colors duration-300 text-sm md:text-base tracking-[0.25em] uppercase flex items-center gap-3 cursor-pointer border border-white/20 hover:border-forix-green/40 px-6 py-3"
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
  titleClassName = "text-6xl md:text-8xl lg:text-9xl",
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
      <div className="sticky top-0 h-[85vh] w-full flex flex-col justify-end pb-24 overflow-hidden">
        {/* Background Image if provided */}
        {backgroundImage && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
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
                className="flex items-center gap-3 mb-6"
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
                className="text-xl md:text-2xl font-light leading-relaxed max-w-md"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-12 left-12 w-24 h-[1px] bg-white/10" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-r border-b border-white/5" />
      </div>
    </section>
  );
};

const SectionHero = ({ title, subtitle, description }: { title: string, subtitle: string, description: string }) => {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center bg-forix-gray pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
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
          <h1 className="text-forix-white text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mb-8 max-w-4xl">
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
      <div className="sticky top-0 h-[85vh] w-full flex flex-col justify-end pb-24 overflow-hidden">
        {/* New Hero Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero_servicios.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                style={{ color: titleColor }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter uppercase"
              >
                {title}
              </motion.h1>
            </div>

            <div className="lg:col-span-4 flex flex-col pb-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.div style={{ backgroundColor: subtitleColor }} className="w-2 h-2 rounded-full" />
                <motion.span style={{ color: subtitleColor }} className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase">
                  {subtitle}
                </motion.span>
              </motion.div>

              <motion.p
                style={{ color: descColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-xl md:text-2xl font-light leading-relaxed max-w-md"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-12 left-12 w-24 h-[1px] bg-white/10" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-r border-b border-white/5" />
      </div>
    </section>
  );
};

const StackedServiceItem = ({ title, desc, index, icon: Icon }: { title: string, desc: string, index: number, key?: React.Key, icon?: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }> }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Fade as it scrolls out to "lose relevance"
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="sticky top-0 min-h-[70vh] md:min-h-[60vh] flex flex-col justify-center bg-forix-white border-t border-forix-blue/10 py-20 px-6 md:px-12 lg:px-24"
      style={{ top: `${index * 20}px` }}
    >
      <motion.div
        style={{ opacity }}
        className="container-custom grid md:grid-cols-12 gap-12 items-start"
      >
        <div className="md:col-span-5">
          {Icon && (
            <div className="mb-6">
              <Icon size={28} strokeWidth={1} className="text-forix-blue" />
            </div>
          )}
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[0.9] uppercase tracking-tighter text-forix-blue">
            {title}
          </h4>
        </div>
        <div className="md:col-span-7">
          <div className="max-w-2xl space-y-6">
            {desc.split('. ').map((sentence, i, arr) => (
              <p
                key={i}
                className="text-xl md:text-2xl font-light leading-relaxed text-forix-gray"
              >
                {sentence}{i < arr.length - 1 ? '.' : ''}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const pillars = [
    {
      name: "FORIX BUSINESS",
      logo: "/forix_business_nobg.png",
      subtitle: "The Masterplan",
      lema: "Arquitectura de la distinción",
      items: [
        {
          title: "Mistery Shopping",
          icon: ScanEye,
          desc: "Auditoría de guante blanco. A través de una inmersión encubierta de alta precisión, decodificamos cada micro-momento de la verdad en su establecimiento. No evaluamos tareas, mapeamos la respuesta emocional y el cumplimiento estético de su promesa de marca. Es el espejo más honesto y sofisticado para quienes exigen la perfección absoluta en cada detalle."
        },
        {
          title: "Diseño sensorial y auditoría de calidad",
          icon: AudioLines,
          desc: "Curamos la música, los aromas y la iluminación de tu negocio para que el ambiente 'venda' por sí solo. Creamos una atmósfera donde el cliente se sienta cómodo, valorado y dispuesto a invertir más tiempo y dinero."
        },
        {
          title: "Protocolos de Servicio & Hospitalidad",
          icon: BookOpen,
          desc: "Escribimos el guión exclusivo de tu empresa. Definimos cómo saluda tu equipo, cómo resuelve problemas y cómo cuenta la historia de tu marca a través de pequeños detalles que emocionan."
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
          title: "Certificación en ADN de anfitriones",
          icon: Fingerprint,
          desc: "Un entrenamiento intensivo donde el personal deja de ser 'empleado' para convertirse en 'anfitrión'. Enseñamos el arte de leer al cliente, el lenguaje corporal de la excelencia y cómo crear momentos que la gente nunca olvide."
        },
        {
          title: "Mentorías para líderes de excelencia",
          icon: Compass,
          desc: "Acompañamiento estratégico para los que toman las decisiones. Trabajamos en cómo inspirar al equipo (Marca Empleadora) y cómo supervisar la calidad sin ser un jefe tradicional, sino un mentor de cultura."
        },
        {
          title: "Talleres de diseño y manuales de autor",
          icon: PenTool,
          desc: "Sesiones dinámicas de trabajo (Workshops) donde definimos los pequeños detalles que hacen grande a la marca. El resultado es un Manual de Servicio que no termina en un estante, sino que es la guía viva de trabajo diario."
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
          title: "Ecosistema de métricas y emociones",
          icon: Activity,
          desc: "96 de cada 100 clientes insatisfechos nunca presentan una queja; simplemente se retiran en silencio. Esta \"hemorragia silenciosa\" erosiona las ganancias y frena el crecimiento real, ya que la contabilidad tradicional solo registra el dinero que entra, no el que se pierde por quienes no vuelven."
        }
      ]
    }
  ];
  const collageImageClass = "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700";

  return (
    <div className="bg-forix-white">
      <ServicesHero
        title="Soluciones"
        subtitle="Excelencia Estratégica"
        description="Arquitectura de distinción y auditoría de alta precisión para elevar el estándar de su organización."
      />

      <section className="pb-32">
        {pillars.map((pillar, pIdx) => (
          <div key={pIdx} className="relative">
            {/* Pillar Header */}
            <div className="sticky top-0 z-20 bg-forix-white/90 backdrop-blur-md border-b border-forix-blue/10 py-12 px-6 md:px-12 lg:px-24">
              <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-forix-green text-xs font-bold tracking-[0.5em] uppercase mb-4">{pillar.subtitle}</h2>
                    <img src={pillar.logo} className="h-10 md:h-12 lg:h-14 w-auto mb-2" alt={pillar.name} />
                  </div>
                  <p className="font-signature text-3xl md:text-4xl italic text-forix-green">"{pillar.lema}"</p>
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
    "Coffe Bike",
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

const AnimatedText = ({ segments }: { segments: { text: string, bold?: boolean, italic?: boolean }[] }) => {
  const words: { word: string, bold?: boolean, italic?: boolean }[] = [];

  segments.forEach(segment => {
    const parts = segment.text.split(/(\s+)/);
    parts.forEach(part => {
      if (part.length > 0) {
        words.push({ word: part, bold: segment.bold, italic: segment.italic });
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
            className={`inline-block ${item.bold ? 'font-bold' : ''} ${item.italic === false ? 'not-italic' : ''}`}
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
      <section id="about" className="pt-24 pb-0 bg-forix-white overflow-hidden">
        <div className="container-custom">
          {/* Liderazgo Section */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-7xl font-bold text-forix-blue mb-6 tracking-tighter">La filosofía del estándar</h2>
              <h3 className="text-xl md:text-2xl font-light text-forix-gray mb-10 leading-relaxed max-w-xl">
                Para Mauricio, la excelencia no es un objetivo aspiracional, sino el requisito mínimo de operación. Su gestión en <span className="font-bold text-forix-blue">FORIX GROUP</span> se basa en la convicción de que la diferencia entre una empresa común y una marca líder reside en la <span className="font-bold text-forix-blue">intencionalidad del detalle</span>. No cree en soluciones genéricas, sino en el rigor técnico que protege el prestigio de cada organización.
              </h3>

              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-forix-gray font-light leading-relaxed max-w-xl">
                  Su labor es transformar la hospitalidad de un concepto abstracto a una herramienta de ingeniería financiera. Bajo su liderazgo, <span className="font-bold text-forix-blue">FORIX</span> se convierte en el aliado que detiene la erosión del negocio y asegura que el éxito sea un sistema replicable, no un golpe de suerte.
                </p>
              </div>
            </div>

            {/* Right Placeholder Box with Design Elements */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
                {/* Geometric Pattern - Top Right */}
                <div className="absolute -top-10 -right-10 w-20 h-20 z-20 opacity-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-forix-blue">
                    <path d="M 0 0 L 12 0 L 6 50 L 12 100 L 0 100 L 6 50 Z" fill="currentColor" />
                    <path d="M 28 0 L 40 0 L 34 50 L 40 100 L 28 100 L 34 50 Z" fill="currentColor" />
                    <path d="M 56 0 L 68 0 L 62 50 L 68 100 L 56 100 L 62 50 Z" fill="currentColor" />
                    <path d="M 84 0 L 96 0 L 90 50 L 96 100 L 84 100 L 90 50 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Placeholder Box instead of Photo */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-10"
                  style={{ backgroundImage: 'radial-gradient(circle, #14385C 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <img src="/about_mauricio.jpg" alt="Mauricio Vacaflores" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white bg-forix-blue/80 px-2 py-1">Mauricio Vacaflores</span>
                </div>

                {/* Signature Box - Bottom Right */}
                <div className="absolute -bottom-12 -right-8 lg:-right-16 z-30">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <img src="/Mauricio Vacaflores.png" alt="Firma Mauricio Vacaflores" className="h-16 w-auto object-contain drop-shadow-lg" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information (From PDF) */}
          <div className="grid lg:grid-cols-12 gap-12 pt-24 border-t border-forix-blue/5">
            <div className="lg:col-span-4">
              <h2 className="text-forix-blue text-xs font-bold tracking-[0.4em] uppercase mb-8">Propósito & Esencia</h2>
              <div className="w-12 h-[1px] bg-forix-green mb-12" />

              {/* New Photo Container - Adapted to theme */}
              <div className="relative group">
                <div className="w-full bg-forix-ghost/50 border border-forix-blue/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #14385C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <img
                    src="/about_essence.jpg"
                    alt="Propósito"
                    className="w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-forix-blue/30" />
                  <div className="absolute bottom-4 right-4 font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    Forix Essence / 01
                  </div>
                </div>
                {/* Accent line */}
                <div className="absolute -bottom-4 -left-4 w-24 h-[1px] bg-forix-mint/50" />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-8">
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-forix-blue leading-tight italic">
                  <AnimatedText segments={[
                    { text: '"La hospitalidad es un placer egoísta. Hacer que los demás se sientan ' },
                    { text: 'bien', bold: true, italic: false },
                    { text: ' te hace ' },
                    { text: 'feliz', bold: true, italic: false },
                    { text: '."' }
                  ]} />
                </p>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-forix-gray font-light leading-relaxed">
                    En <span className="font-medium text-forix-blue">FORIX GROUP</span>, fusionamos neurociencia aplicada con la alta hospitalidad para transformar organizaciones en símbolos de excelencia.
                  </p>
                  <p className="text-xl md:text-2xl text-forix-gray font-light leading-relaxed">
                    Somos un ecosistema boutique de transformación humana y empresarial enfocado en hospitalidad, restauración, turismo y negocios experienciales. Diseñamos nuestro propio método como parte de nuestro compromiso empresarial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Método FORIX - Full width centered */}
          <div className="py-24 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-16">
              <h4 className="text-black text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">Método FORIX</h4>
              <p className="text-black font-bold text-3xl md:text-4xl tracking-widest">4i * X</p>
            </div>

            <div className="relative max-w-4xl mx-auto w-full px-4 md:px-6">
              <div className="grid grid-cols-4 gap-2 md:gap-4 relative">
                {[
                  { name: "Investigación" },
                  { name: "Innovación" },
                  { name: "Inmersión" },
                  { name: "Iteración" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 group cursor-default">
                    <div className="w-8 h-28 md:w-12 md:h-52">
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
                    <span className="text-[10px] md:text-lg font-light text-forix-gray transition-colors duration-300 group-hover:text-black mt-2 text-center">{step.name}</span>
                  </div>
                ))}
              </div>

              {/* Dotted Line */}
              <div className="w-full h-[1px] border-t border-dotted border-black/50 mt-4" />

              {/* Bottom Labels */}
              <div className="flex justify-center gap-10 md:gap-20 mt-6">
                <span className="text-xs md:text-lg uppercase tracking-[0.2em] text-black font-medium">EXPERIENCIA</span>
                <span className="text-xs md:text-lg uppercase tracking-[0.2em] text-black font-medium">EXCELENCIA</span>
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
      <section id="articulos" className="section-spacing bg-forix-gray">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-forix-mint text-xs font-bold tracking-[0.3em] uppercase mb-4">Perspectivas para Directivos</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-forix-mint">
                Que No se Conforman <br /> <span className="font-signature font-light text-white">con el Promedio.</span>
              </h3>
              <p className="text-lg text-forix-gray font-light mt-6">
                Análisis de alto nivel sobre CXM, neurociencia aplicada y cultura organizacional.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((a, i) => <ArticleCard key={a.slug} index={i} {...a} onClick={() => setCurrentView(getArticleView(a.slug))} />)}
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

          <div className="grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-16">
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
                <h1 className="text-4xl md:text-6xl font-bold text-forix-blue tracking-tight leading-[0.95] mb-6">{article.title}</h1>
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
  const [contactPhone, setContactPhone] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles] = useState(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 2,
    size: 4 + Math.random() * 8,
    color: ['#14385C', '#3D7072', '#D8E1E0', '#2ecc71', '#14385C'][Math.floor(Math.random() * 5)],
  })));

  const questions = [
    {
      id: 1,
      title: "¿Del 1 al 10, qué tan consistente es la experiencia que recibe un cliente en su empresa, sin importar quién lo atienda o en qué sucursal esté?",
      type: "scale",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      id: 2,
      title: "¿Cuál de estos desafíos le quita el sueño hoy mismo?",
      type: "choice",
      options: [
        "Mis clientes me comparan solo por precio.",
        "Tengo procesos, pero a mi equipo le falta 'alma' y compromiso.",
        "Atraigo clientes, pero no logro que vuelvan o recomienden.",
        "Siento que mi marca se ha vuelto genérica ante la competencia."
      ]
    },
    {
      id: 3,
      title: "¿Tiene detectado cuánta rentabilidad está perdiendo mensualmente por clientes que se van insatisfechos y no regresan?",
      type: "choice",
      options: [
        "Sí, lo tengo medido",
        "Tengo una idea, pero no el dato exacto",
        "No tengo forma de medirlo hoy"
      ]
    },
    {
      id: 4,
      title: "Si hoy mismo usted dejará de supervisar la operación, ¿la cultura de servicio se mantendría intacta o empezaría a degradarse?",
      type: "choice",
      options: [
        "Se mantendría intacta",
        "Empezaría a degradarse poco a poco",
        "Se degradaría rápidamente"
      ]
    },
    {
      id: 5,
      title: "¿Está listo para redefinir sus estándares y convertir la hospitalidad en su mayor ventaja competitiva, aunque esto implique transformar la mentalidad de toda su organización?",
      type: "choice",
      options: [
        "Sí, estoy listo",
        "Necesito más información"
      ]
    }
  ];

  // Total steps: questions + contact info step
  const totalSteps = questions.length + 1;
  const isContactStep = step === questions.length;
  const isCompleted = step > questions.length;

  const handleAnswer = (answer: string | number) => {
    setAnswers({ ...answers, [step]: answer });
    setTimeout(() => setStep(step + 1), 300);
  };

  const saveDiagnostic = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: contactName,
      phone: contactPhone,
      answers: questions.map((q, i) => ({
        question: q.title,
        answer: answers[i] ?? ''
      }))
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('forix_diagnostics') || '[]');
    existing.push(entry);
    localStorage.setItem('forix_diagnostics', JSON.stringify(existing));

    setStep(step + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#F4F4F4] flex items-center justify-center p-6 md:p-24 overflow-y-auto"
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
        <div className="absolute bottom-8 right-8 w-32 md:w-56 opacity-10 pointer-events-none z-0">
          <svg viewBox="0 0 220 360" className="w-full h-auto" fill="#3D7072" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L40,0 L25,180 L40,360 L0,360 L15,180 Z" />
            <path d="M60,0 L100,0 L85,180 L100,360 L60,360 L75,180 Z" />
            <path d="M120,0 L160,0 L145,180 L160,360 L120,360 L135,180 Z" />
            <path d="M180,0 L220,0 L205,180 L220,360 L180,360 L195,180 Z" />
          </svg>
        </div>

        <button onClick={() => { onClose(); setStep(0); setAnswers({}); setContactName(''); setContactPhone(''); }} className="absolute top-6 right-6 md:top-12 md:right-12 text-forix-blue hover:text-forix-green transition-colors z-10">
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

        <div className="max-w-4xl w-full relative z-10">
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
                <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8">
                  PREGUNTA {step + 1} DE {questions.length}
                </p>
                <h3 className="text-3xl md:text-5xl font-light text-[#14385C] leading-[1.3] mb-16 max-w-3xl">
                  {questions[step].title}
                </h3>

                {questions[step].type === 'scale' && (
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-black/10 bg-transparent text-xl font-light text-[#14385C] hover:bg-white hover:border-transparent hover:shadow-lg transition-all duration-300"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {questions[step].type === 'choice' && (
                  <div className="space-y-4">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left p-6 md:p-8 border border-black/10 bg-transparent text-lg md:text-xl font-light text-[#14385C] hover:bg-white hover:border-transparent hover:shadow-lg transition-all duration-300 group flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ArrowRight size={20} className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#3D7072]" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact info step */}
            {isContactStep && !isCompleted && (
              <motion.div
                key="contact-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[#3D7072] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8">
                  ÚLTIMO PASO
                </p>
                <h3 className="text-3xl md:text-5xl font-light text-[#14385C] leading-[1.3] mb-6 max-w-3xl">
                  Para enviarle los resultados, necesitamos sus datos de contacto.
                </h3>
                <p className="text-lg text-forix-gray font-light mb-12">
                  Su información se mantendrá estrictamente confidencial.
                </p>

                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Nombre completo</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ej: Mauricio Vacaflores"
                      className="w-full p-5 border border-black/10 bg-transparent text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D7072] mb-2 block">Número de celular</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Ej: +591 70000000"
                      className="w-full p-5 border border-black/10 bg-transparent text-lg font-light text-[#14385C] placeholder:text-black/20 focus:outline-none focus:border-[#3D7072] transition-colors duration-300"
                    />
                  </div>
                  <PrimaryButton
                    onClick={saveDiagnostic}
                    className={`text-lg py-5 px-12 w-full mt-4 ${!contactName || !contactPhone ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    ENVIAR DIAGNÓSTICO
                  </PrimaryButton>
                </div>
              </motion.div>
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
                  className="text-4xl md:text-5xl font-bold text-forix-blue mb-6"
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
                      window.open('https://wa.me/59170000000?text=Hola, completé el diagnóstico FORIX y me gustaría agendar una sesión estratégica.', '_blank');
                      onClose();
                      setStep(0);
                      setAnswers({});
                      setContactName('');
                      setContactPhone('');
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
    <section id="contacto" className="py-32 bg-[#F4F4F4] overflow-hidden relative min-h-[60vh] flex items-center justify-center">
      {/* Brand Pattern Background - New Logo Watermark */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'url("/contact_bg.png")',
        backgroundSize: '120px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center'
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <h2 className="text-forix-blue text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-8">Sesión Estratégica</h2>

        <h3 className="text-4xl md:text-6xl font-bold text-forix-blue mb-6 leading-tight tracking-tight max-w-4xl">
          ¿Cuánto le cuesta el silencio de los clientes que no regresan?
        </h3>

        <p className="text-lg md:text-xl text-forix-gray/70 font-light mb-16 max-w-2xl leading-relaxed">
          Transforme la lealtad en su activo más rentable, no en un costo de marketing.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-forix-green text-white px-8 py-5 md:px-12 md:py-6 font-medium tracking-[0.15em] uppercase text-sm md:text-base transition-all duration-300 hover:bg-forix-blue flex items-center gap-4 group shadow-lg hover:shadow-xl"
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
    <footer className="bg-forix-white py-16 border-t border-forix-mint">
      <div className="container-custom flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex items-center">
            <img src="/logo_navbar.png" className="h-8 w-auto" alt="FORIX GROUP" />
          </div>

          <div className="flex gap-4 md:gap-10 items-center">
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
    <img src="/forix_business_nobg.png" className="h-10 md:h-12 lg:h-16 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX BUSINESS" />
  </div>
);

const ForixLearningTypoLogo = () => (
  <div className="flex flex-col items-start w-full group-hover:text-forix-mint transition-colors duration-500 text-forix-blue">
    <img src="/forix_learning_nobg.png" className="h-10 md:h-12 lg:h-16 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX LEARNING" />
  </div>
);

const ForixLabTypoLogo = () => (
  <div className="flex flex-col items-start w-full group-hover:text-forix-mint transition-colors duration-500 text-forix-blue">
    <img src="/logo_lab.png" className="h-10 md:h-12 lg:h-16 w-auto transition-all duration-500 group-hover:brightness-0 group-hover:invert" alt="FORIX LAB" />
  </div>
);

const PillarCard = ({ title, desc, icon: Icon, customHeader, onClick, image }: { title?: React.ReactNode, desc: React.ReactNode, icon?: React.FC, customHeader?: React.ReactNode, onClick: () => void, image?: string }) => (
  <motion.div
    whileHover={{ backgroundColor: "#14385C", color: "#F4F2F1" }}
    onClick={onClick}
    className="group relative bg-forix-ghost/40 p-8 md:p-12 flex flex-col items-start text-left transition-all duration-500 cursor-pointer border border-forix-gray/5 overflow-hidden h-full min-h-[400px] md:min-h-[500px]"
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

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
      title: "Porque en un mundo que olvida lo que dices, nosotros recordamos lo que sientes",
      subtitle: "Neuro-Frameworks",
      desc: ""
    },
    {
      id: "02",
      title: "Cambiamos la lógica del negocio por la magia de la hospitalidad irracional",
      subtitle: "Impacto Medible",
      desc: ""
    },
    {
      id: "03",
      title: "Poniendo el corazón en cada detalle para que su equipo y su cliente",
      subtitle: "Adaptabilidad Elite",
      desc: ""
    },
    {
      id: "04",
      title: "Nunca dejen de sentir que este es el lugar al que pertenecen.",
      subtitle: "Mentoría Senior",
      desc: ""
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[500vh]">
      <motion.div
        style={{ backgroundColor: bgColor, backgroundImage: lightGlow }}
        className="sticky top-0 flex h-screen items-center overflow-hidden transition-colors duration-1000"
      >
        <motion.div style={{ x }} className="flex relative">
          {/* Continuous Connection Line (Horizontal) - Animated with Intense Glow & Flare */}
          <motion.div
            style={{ width: lineWidth, opacity: lineOpacity }}
            className="absolute top-1/2 left-[50vw] h-[2px] bg-forix-mint z-0 pointer-events-none origin-left shadow-[0_0_50px_rgba(216,225,224,1),0_0_20px_rgba(216,225,224,0.6)]"
          >
            {/* Traveling Flare */}
            <motion.div
              style={{ left: "100%" }}
              className="absolute top-1/2 -translate-y-1/2 w-24 h-24 bg-forix-mint/30 blur-2xl rounded-full"
            />
            <motion.div
              style={{ left: "100%" }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-forix-mint blur-[2px] rounded-full shadow-[0_0_20px_#D8E1E0]"
            />
          </motion.div>

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
              <h2 className="flex flex-col items-center mb-12">
                <span className="text-forix-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Redefinimos la
                </span>
                <span className="font-signature font-light text-6xl md:text-8xl lg:text-9xl leading-[0.4] z-10 py-6 !text-forix-green">
                  Hospitalidad
                </span>
                <span className="text-forix-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mt-4">
                  estratégica.
                </span>
              </h2>

              <div className="relative w-full flex flex-col items-center">
                <p className="text-forix-mint/70 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mt-12">
                  Somos una consultora boutique que fusiona la neurociencia aplicada con la gestión de experiencia (CXM) para generar conciencia empresarial.
                </p>
              </div>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/10" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/10" />
          </div>

          {/* FEATURE SLIDES (Style of Image 1) */}
          {features.map((f, i) => (
            <div key={i} className="relative h-screen w-screen flex items-center justify-center px-12 md:px-24">
              {/* Subtle Background Diamonds for Features - Stronger effect as requested */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
                <div className="w-full h-full">
                  <IntelligenceDiamondMatrix />
                </div>
              </div>

              <div className="max-w-4xl w-full relative z-10">
                {/* Content Side - Centered and Minimalist */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <span className="text-forix-mint text-sm font-bold tracking-[0.5em] uppercase">
                      {f.id} — {f.subtitle}
                    </span>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`font-bold text-forix-white mb-10 leading-tight max-w-3xl ${f.desc ? 'text-5xl md:text-7xl tracking-tighter uppercase' : 'text-2xl md:text-4xl tracking-tight'}`}
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

            <h2 className="relative z-10 text-forix-white text-4xl md:text-6xl font-bold mb-12 tracking-tighter">
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
  const phrase = "\"LA HOSPITALIDAD ES UN PLACER EGOÍSTA. HACER QUE LOS DEMÁS SE SIENTAN BIEN TE HACE FELIZ.\"";

  // Define which words get which style
  const getWordStyle = (word: string) => {
    const cleanWord = word.toUpperCase().replace(/[,."]/g, "");
    if (["BIEN", "FELIZ"].includes(cleanWord)) return "text-forix-white font-bold tracking-tight font-sans";
    return "text-forix-white/70 font-light tracking-[0.2em] font-sans";
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      scale: 1.2,
      y: 10
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      },
    },
  };

  const words = phrase.split(" ");

  return (
    <section className="py-16 bg-forix-blue relative overflow-hidden flex items-center justify-center min-h-[50vh]">
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
          className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 gap-y-4 max-w-4xl mx-auto"
        >
          {words.map((word, wordIdx) => (
            <motion.span
              key={wordIdx}
              variants={letterVariants}
              className={`text-xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed whitespace-nowrap ${getWordStyle(word)}`}
            >
              {word}
            </motion.span>
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

  // Fade and scale side images away
  const sideOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);
  const sideScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 0.9]);
  const sideY = useTransform(scrollYProgress, [0.1, 0.35], [0, -20]);
  const techLabels = [
    { id: "01", coord: "47.3769Â° N, 8.5417Â° E", iso: "ISO 100", shutter: "1/2000" },
    { id: "02", coord: "35.6762Â° N, 139.6503Â° E", iso: "ISO 400", shutter: "1/500" },
    { id: "03", coord: "40.7128Â° N, 74.0060Â° W", iso: "ISO 200", shutter: "1/1000" },
    { id: "04", coord: "51.5074Â° N, 0.1278Â° W", iso: "ISO 800", shutter: "1/250" },
    { id: "05", coord: "48.8566Â° N, 2.3522Â° E", iso: "ISO 100", shutter: "1/4000" },
  ];
  const collageImageClass = "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700";

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
              className="relative col-start-1 row-start-1 row-span-8 group overflow-hidden border border-white/10"
            >
              <img src="/foto 2.png" alt="Forix business" className={collageImageClass} />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                {techLabels[0].coord}
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-1 row-start-9 row-span-4 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/SSS00129_VSCO.JPG" alt="Forix discussion scene" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-2 row-start-1 row-span-3 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/SSS00108_VSCO.JPG" alt="Forix presentation laptop" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-2 row-start-4 row-span-5 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/HERO ABOUT UDS.JPG" alt="Forix 2022 presentation" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-2 row-start-9 row-span-4 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/FORIX LAB.JPG" alt="Forix phone experience" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ scale, skewX }}
              className="relative z-20 col-start-3 col-span-2 row-start-1 row-span-12 group overflow-hidden border border-white/15 shadow-[0_0_120px_rgba(0,0,0,0.95)]"
            >
              <img src="/gallery/business.JPG" alt="Forix signature portrait" className={collageImageClass} />

              <motion.div
                style={{ opacity: sideOpacity }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-8 left-8 border-l border-t border-white/30 w-12 h-12" />
                <div className="absolute top-8 right-8 border-r border-t border-white/30 w-12 h-12" />
                <div className="absolute bottom-8 left-8 border-l border-b border-white/30 w-12 h-12" />
                <div className="absolute bottom-8 right-8 border-r border-b border-white/30 w-12 h-12" />
                <div className="absolute top-1/2 left-8 -translate-y-1/2 font-mono text-[10px] text-white/40 vertical-rl tracking-widest uppercase">
                  Forix Visual Archive
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 font-mono text-[10px] text-white/60 uppercase tracking-[0.2em]">
                  <span>{techLabels[2].coord}</span>
                  <span>{techLabels[2].iso}</span>
                  <span>{techLabels[2].shutter}</span>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: sideOpacity }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none"
              />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-5 row-start-1 row-span-3 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/HERO SERV.JPG" alt="Forix service presentation" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-5 row-start-4 row-span-5 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/HERO SERVICIES.JPG" alt="Forix service desk overview" className={collageImageClass} />
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-5 row-start-9 row-span-4 group overflow-hidden border border-white/10"
            >
              <img src="/metric_300.jpg" alt="Forix metrics" className={collageImageClass} />
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/50">
                {techLabels[3].iso}
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-6 row-start-1 row-span-6 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/HERO MAIN.JPG" alt="Forix tabletop composition" className={collageImageClass} />
              <div className="absolute top-4 right-4 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                {techLabels[4].coord}
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
              className="relative col-start-6 row-start-7 row-span-6 group overflow-hidden border border-white/10"
            >
              <img src="/gallery/SSS00146_VSCO.JPG" alt="Forix signed card portrait" className={collageImageClass} />
            </motion.div>
          </div>

          <div className="grid md:hidden grid-cols-2 grid-rows-6 gap-[4px] p-[4px] w-full h-screen max-w-full">
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative row-span-2 group overflow-hidden border border-white/10">
              <img src="/foto 2.png" alt="Forix business" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative group overflow-hidden border border-white/10">
              <img src="/gallery/SSS00108_VSCO.JPG" alt="Forix presentation laptop" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ scale, skewX }} className="relative row-span-2 group overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
              <img src="/gallery/business.JPG" alt="Forix signature portrait" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative row-span-2 group overflow-hidden border border-white/10">
              <img src="/gallery/HERO SERVICIES.JPG" alt="Forix service desk overview" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative group overflow-hidden border border-white/10">
              <img src="/gallery/HERO MAIN.JPG" alt="Forix tabletop composition" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative group overflow-hidden border border-white/10">
              <img src="/gallery/SSS00146_VSCO.JPG" alt="Forix signed card portrait" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative group overflow-hidden border border-white/10">
              <img src="/gallery/FORIX LAB.JPG" alt="Forix phone experience" className={collageImageClass} />
            </motion.div>
            <motion.div style={{ opacity: sideOpacity, scale: sideScale, y: sideY }} className="relative group overflow-hidden border border-white/10">
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
    "Coffe Bike",
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
            <h2 className="text-forix-white text-3xl md:text-4xl font-bold tracking-tight">Empresas que elevaron su estándar</h2>
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
                  className="relative bg-forix-blue/40 backdrop-blur-xl p-12 md:p-16 flex flex-col items-center text-center group"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-forix-green/10 to-transparent pointer-events-none" />

                  <motion.div
                    className="relative z-10 text-6xl md:text-8xl font-serif font-light tracking-tighter mb-2"
                    animate={{ color: ['#3D7072', '#D8E1E0', '#3D7072'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                  >
                    <AnimatedNumber end={metric.end} prefix={metric.prefix} suffix={metric.suffix} />
                  </motion.div>

                  <div className="relative z-10 w-8 h-[2px] bg-forix-green/30 my-6 group-hover:w-16 group-hover:bg-forix-green transition-all duration-700" />

                  <p className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-forix-white/80 font-bold mb-2 leading-relaxed">
                    {metric.label}
                  </p>
                  <p className="relative z-10 text-[10px] tracking-[0.2em] text-forix-mint/40 font-light">
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
              <h2 className="text-forix-blue text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4">Nuestros Pilares</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-forix-blue leading-tight">
                Arquitectura de <span className="font-signature font-light text-5xl md:text-6xl">Excelencia</span> Estratégica.
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
                items: ["Neuro-Mapping misterioso", "Diseño sensorial y auditoría de calidad", "Protocolos de servicio & hospitalidad"]
              },
              {
                num: "02",
                icon: GraduationCap,
                logo: <ForixLearningTypoLogo />,
                tagline: "Formación de Elite",
                items: ["Certificación en ADN de anfitriones", "Mentorías para líderes de excelencia", "Talleres de diseño y manuales de autor"]
              },
              {
                num: "03",
                icon: BarChart3,
                logo: <ForixLabTypoLogo />,
                tagline: "Inteligencia Aplicada",
                items: ["Ecosistema de métricas y emociones", "Análisis predictivo de experiencia", "Dashboards de performance CX"]
              }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                onClick={() => setCurrentView('servicios')}
                className="group relative cursor-pointer border-r last:border-r-0 border-forix-blue/10 px-8 md:px-10 py-12 md:py-16 hover:bg-forix-blue transition-all duration-700"
              >
                {/* Number */}
                <span className="text-[10px] font-bold tracking-[0.3em] text-forix-green group-hover:text-forix-mint transition-colors duration-500 uppercase">
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
                      <p className="text-sm font-light text-forix-blue/60 group-hover:text-forix-white/70 tracking-wide leading-relaxed transition-colors duration-500">
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
      <section className="py-24 bg-forix-white">
        <div className="container-custom">
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
                  className="group relative p-10 border border-forix-mint/30 transition-all duration-500 hover:bg-forix-blue hover:text-forix-white cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-forix-green">{article.category}</span>
                    <IconComponent size={20} strokeWidth={1.5} className="text-forix-green group-hover:text-forix-mint transition-colors duration-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-forix-blue group-hover:text-forix-white mb-4 leading-tight transition-colors duration-500">{article.title}</h4>
                  <p className="text-sm text-forix-gray/60 group-hover:text-forix-white/70 font-light mb-8 leading-relaxed transition-colors duration-500">{shortSummaries[i]}</p>
                  <div className="mt-auto flex items-center gap-2 text-forix-green group-hover:text-forix-mint text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                    Leer artículo <ArrowRight size={12} />
                  </div>
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
