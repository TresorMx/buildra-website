# BUILDRA — Instructivo de instalación

Guía paso a paso para levantar el proyecto en local, conectarlo a Go High Level
y desplegarlo a producción.

---

## 1. Requisitos previos

- **Node.js 20 o superior** (probado con 22). Verifica con `node -v`.
- **npm 10 o superior**. Verifica con `npm -v`.
- Editor (VS Code recomendado).
- Una cuenta en **Vercel** para deploy (gratis para empezar).
- Una cuenta en **Go High Level** con permisos para crear Workflows.

---

## 2. Instalación local

Desde la carpeta `buildra-final/`:

```bash
# 1. Instala dependencias
npm install

# 2. Copia el archivo de ejemplo de variables de entorno
cp .env.example .env.local
```

Abre `.env.local` y rellena al menos:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # cámbialo a tu dominio cuando despliegues
GHL_WEBHOOK_URL=                              # lo configuras en el paso 4
NEXT_PUBLIC_WHATSAPP_NUMBER=529981543151      # tu número en formato E.164 sin "+"
NEXT_PUBLIC_PHONE_E164=+529981543151
NEXT_PUBLIC_PHONE_DISPLAY=+52 998 154 3151
NEXT_PUBLIC_EMAIL=hello@buildra.mx

# Redes (opcional pero recomendado)
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/tu-empresa
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/tu-usuario
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/tu-pagina
```

Levanta el dev server:

```bash
npm run dev
```

Abre <http://localhost:3000>. Si algo truena, revisa la sección **Troubleshooting**
abajo.

---

## 3. Archivos que tú tienes que subir

Todos los assets de marca y fotos van en sus rutas exactas. Next.js los detecta
automáticamente — no hay que tocar código.

### Imágenes del sitio (carpeta `public/`)

| Archivo                   | Ruta                            | Notas |
|---------------------------|---------------------------------|---|
| Foto del hero             | `public/herosectionlaksmi.jpg`  | B&W con 25% opacidad se aplica vía CSS |
| Foto del banner CTA       | `public/ctabanner.jpg`          | También se vuelve B&W |
| Portafolio — Tzalam 13    | `public/tzalam.jpg`             | Aspect 4:5 recomendado |
| Portafolio — Laksmil 12   | `public/laksmi.jpg`             | Aspect 4:5 recomendado |
| Portafolio — Lluvia de Oro 11 | `public/lluviadeoro11.jpg`  | Aspect 4:5 recomendado |
| Brochure descargable      | `public/brochure-buildra.pdf`   | Lo descarga desde /gracias |

Si falta alguna foto, la sección no se rompe — cae elegante a un gradiente
oscuro. Puedes lanzar sin todas las fotos y agregarlas después.

### Iconos y SEO (carpeta `app/`)

Next.js usa convenciones de nombres en `app/`. Estos archivos no se importan ni
se referencian en ningún sitio: con sólo existir con el nombre correcto,
aparecen automáticamente en el `<head>` y en los meta de Open Graph.

| Archivo                    | Ruta                       | Tamaño recomendado |
|----------------------------|----------------------------|-------|
| Favicon clásico            | `app/favicon.ico`          | 32×32 multi-res |
| Icon PNG (opcional)        | `app/icon.png`             | 512×512 PNG |
| Apple touch icon           | `app/apple-icon.png`       | 180×180 PNG |
| Imagen de compartir (WA/FB)| `app/opengraph-image.jpg`  | 1200×630 JPG |
| Imagen de Twitter (opcional)| `app/twitter-image.jpg`   | 1200×600 JPG |

Para generar el favicon multi-resolución te recomiendo <https://realfavicongenerator.net>.

---

## 4. Conectar Go High Level

1. Entra a GHL → **Automation → Workflows → New Workflow**.
2. Como trigger, elige **Webhook → Inbound Webhook**. Copia la URL que te
   genera.
3. Pega esa URL en `.env.local`:

   ```bash
   GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
   ```

4. (Opcional pero recomendado) define un secreto compartido:

   ```bash
   GHL_WEBHOOK_SECRET=algo_largo_y_aleatorio
   ```

   El secreto se manda en el header `x-buildra-secret`. En GHL puedes validarlo
   con un "If/Else" antes de crear el contacto.
5. En el mismo Workflow, agrega los pasos que necesites: **Create Contact**,
   asignarlo al pipeline correcto, mandar un email de bienvenida, notificación
   al equipo de ventas, etc.

   El payload que recibe GHL trae todo esto:

   ```json
   {
     "name": "María García",
     "email": "maria@example.com",
     "phone": "+5219985551234",
     "projectType": "casa-nueva",
     "location": "cancun",
     "budget": "5-10M",
     "timing": "1-3",
     "message": "...",
     "lang": "es",
     "source": "buildra-landing",
     "submittedAt": "2026-05-17T12:34:56.000Z",
     "utm": { "utm_source": "...", "utm_medium": "..." },
     "page": "https://buildra.mx/",
     "userAgent": "...",
     "ip": "203.0.113.42"
   }
   ```

6. Reinicia el dev server (`Ctrl+C` y `npm run dev` de nuevo) para que tome la
   variable nueva, llena el formulario en local y verifica que llegue a GHL.

---

## 5. Deploy a producción (Vercel)

### Primera vez

1. Crea un repo en GitHub/GitLab y sube el proyecto.
2. Entra a <https://vercel.com/new> e importa el repo.
3. En **Environment Variables**, copia todas las variables de tu `.env.local`.
   IMPORTANTE: `GHL_WEBHOOK_URL` y `GHL_WEBHOOK_SECRET` van como variables
   **server-only** (no las marques como Public).
4. Click **Deploy**.
5. Cuando termine, asigna tu dominio en **Settings → Domains** y apunta el DNS
   según las instrucciones de Vercel.
6. Actualiza `NEXT_PUBLIC_SITE_URL=https://buildra.mx` (tu dominio real) en
   Vercel y haz redeploy. Esto es necesario para que el sitemap, los
   canonicals y la metadata usen el dominio correcto.

### Despliegues siguientes

Cada `git push` a la rama principal hace deploy automático. Cada PR recibe su
propio preview URL.

---

## 6. Checklist post-launch para SEO

Una vez que el sitio esté vivo en `https://buildra.mx`:

1. **Google Search Console** — <https://search.google.com/search-console>
   - Verifica la propiedad del dominio.
   - Envía el sitemap: `https://buildra.mx/sitemap.xml` (Next lo genera solo).
   - Solicita indexación de la home.
2. **Google Business Profile** — <https://business.google.com>
   - Reclama / crea el perfil de BUILDRA en Cancún.
   - Llena dirección, teléfono, horario, fotos del portafolio, categorías
     ("Contratista general", "Empresa constructora").
   - Esto es lo que más mueve la aguja para "Constructora Cancún" / "Arquitectos
     Cancún" porque te mete al **map pack**.
3. **Bing Webmaster Tools** (opcional) — <https://www.bing.com/webmasters>.
4. Comparte el dominio en WhatsApp para verificar que la **OG image** se vea
   bien. Si necesitas refrescar el cache, usa el debugger de Facebook:
   <https://developers.facebook.com/tools/debug/>.
5. Verifica los datos estructurados con
   <https://search.google.com/test/rich-results> — debería aparecer
   `LocalBusiness`, `Organization`, `WebSite`.

---

## 7. Comandos útiles

| Comando              | Qué hace |
|----------------------|----------|
| `npm run dev`        | Levanta el servidor de desarrollo en :3000 |
| `npm run build`      | Build de producción |
| `npm start`          | Sirve el build de producción local |
| `npm run lint`       | Corre el linter de Next |
| `npm run typecheck`  | Type check con TypeScript |

---

## 8. Estructura del proyecto (referencia rápida)

```
buildra-final/
├── app/
│   ├── layout.tsx              ← metadata global + providers
│   ├── page.tsx                ← home (compone todas las secciones)
│   ├── globals.css             ← tokens base
│   ├── sitemap.ts              ← genera /sitemap.xml automático
│   ├── robots.ts               ← genera /robots.txt automático
│   ├── favicon.ico             ← lo subes tú
│   ├── icon.png                ← lo subes tú (opcional)
│   ├── apple-icon.png          ← lo subes tú (opcional)
│   ├── opengraph-image.jpg     ← lo subes tú
│   ├── api/lead/route.ts       ← endpoint que forwardea a GHL
│   └── gracias/page.tsx        ← thank-you page
├── components/
│   ├── nav.tsx                 ← header
│   ├── hero.tsx
│   ├── trust-strip.tsx
│   ├── proceso.tsx             ← sticky scroll (tema claro)
│   ├── cta-banner.tsx          ← banner 420px con foto
│   ├── servicios.tsx
│   ├── portafolio.tsx
│   ├── footer.tsx
│   ├── form/lead-form.tsx      ← formulario multi-step
│   ├── thank-you-view.tsx      ← contenido de /gracias
│   ├── whatsapp-float.tsx
│   ├── mobile-sticky.tsx
│   ├── lenis-provider.tsx      ← smooth scroll
│   ├── seo/json-ld.tsx         ← structured data
│   └── ui/
│       ├── buildra-logo.tsx
│       ├── magnetic-button.tsx
│       ├── number-counter.tsx
│       └── reveal.tsx
├── lib/
│   ├── content.ts              ← TODOS los textos ES/EN
│   ├── i18n.tsx                ← provider de idioma
│   ├── utils.ts
│   └── validations.ts          ← schemas Zod
├── public/                     ← fotos del sitio + brochure
├── .env.example                ← plantilla de variables
└── tailwind.config.js
```

Donde quieras tocar copy → `lib/content.ts`. Donde quieras tocar colores →
`tailwind.config.js`. Cualquier otra cosa cae en `components/`.

---

## 9. Troubleshooting

### "Cannot find module ts-interface-checker"
La instalación de `node_modules` se corrompió. Solución:
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Module not found: geist/font/sans"
Te faltó `npm install`. Corre `npm install` y vuelve a `npm run dev`.

### El formulario manda 200 pero no llega a GHL
1. Verifica que `GHL_WEBHOOK_URL` esté seteado en `.env.local` (en local) y en
   Vercel (en producción).
2. Reinicia el dev server después de cambiar `.env.local`.
3. Mira los logs del servidor: si dice
   `[buildra/lead] GHL_WEBHOOK_URL not set — skipping forward` significa que la
   variable no se cargó.
4. Mete un `console.log(payload)` antes del `fetch(webhook, …)` en
   `app/api/lead/route.ts` para ver qué se está enviando.

### La OG image no aparece al compartir en WhatsApp
WhatsApp y Facebook cachean agresivo. Usa
<https://developers.facebook.com/tools/debug/> para refrescar el cache. Si
acabas de cambiar el dominio, también espera 5–10 minutos.

### El logo se ve "cortado" por arriba o por abajo
El SVG ya tiene su viewBox extendido para incluir el halo difuminado. Si lo
reemplazas con otra versión, asegúrate de que el viewBox sea
`0 -32.2 783.2 239` o similar.

### Errores de tipo en `npm run build` después de cambios
```bash
npm run typecheck
```
te dice exactamente qué línea revisar antes de hacer build.

---

## 10. ¿Qué falta para que esté 100%?

- [ ] Subir las 5 imágenes en `public/` (hero, banner, 3 proyectos)
- [ ] Subir el brochure PDF en `public/brochure-buildra.pdf`
- [ ] Subir favicon + OG image en `app/`
- [ ] Crear el webhook en GHL y meter su URL en `.env`
- [ ] Apuntar el dominio a Vercel
- [ ] Verificar Search Console + crear Google Business Profile
- [ ] (Opcional) Conectar Google Analytics 4 — pídeme y lo agrego en 2 minutos

Cualquier cosa que se rompa, paste el error completo y lo destrabamos.
