# 🎨 Presets de Color

Esta carpeta contiene presets de color predefinidos que puedes usar para personalizar rápidamente la apariencia de tu aplicación.

## 📋 Presets Disponibles

### 1. **Warm** (`_warm.scss`) 🔥
**Uso ideal:** E-commerce, lifestyle, apps consumer  
**Personalidad:** Energética, juvenil, cálida  
**Colores:**
- Primary: `#ff6b35` (Coral/Naranja quemado)
- Secondary: `#f7931e` (Amarillo dorado)
- Accent: `#c1121f` (Rojo intenso)

### 2. **Neon** (`_neon.scss`) ⚡
**Uso ideal:** Gaming, startups tech, crypto/web3  
**Personalidad:** Futurista, cyberpunk, tech-forward  
**Colores:**
- Primary: `#00f5ff` (Cyan eléctrico)
- Secondary: `#ff2a6d` (Magenta neón)
- Accent: `#05ffa1` (Verde neón)

### 3. **Dopamine** (`_dopamine.scss`) 🌈
**Uso ideal:** Apps educativas, wellness, creatividad  
**Personalidad:** Optimista, alegre, maximalista  
**Colores:**
- Primary: `#84cc16` (Lime brillante)
- Secondary: `#f59e0b` (Amber vivo)
- Accent: `#ec4899` (Pink intenso)

### 4. **Corporate** (`_corporate.scss`) 💼
**Uso ideal:** Empresas, banca, seguros, B2B  
**Personalidad:** Profesional, confiable, tradicional  
**Colores:**
- Primary: `#2563eb` (Azul corporativo)
- Secondary: `#64748b` (Slate neutral)
- Accent: `#8b5cf6` (Púrpura profesional)

### 5. **Minimal** (`_minimal.scss`) ✨
**Uso ideal:** Portfolios, blogs, estudios de diseño  
**Personalidad:** Elegante, refinado, minimalista  
**Colores:**
- Primary: `#18181b` (Zinc/Casi negro)
- Secondary: `#71717a` (Zinc medio)
- Accent: `#a855f7` (Púrpura vibrante)

---

## 🚀 Cómo Usar un Preset

### Método 1: Importar en `_colors.scss` (Recomendado)

1. Abre `src/styles/_colors.scss`
2. **ANTES** de la línea 1, agrega el import del preset:

```scss
// Importar preset de color (comentar/descomentar el que quieras usar)
@import "presets/warm";
// @import "presets/neon";
// @import "presets/dopamine";
// @import "presets/corporate";
// @import "presets/minimal";

// Luego continúa con el resto del archivo...
@import "functions";

// Colores base (ahora usa los del preset si se importó)
$color-primary: #0d9488 !default; // etc...
```

3. **Guarda** el archivo y el proyecto se reconstruirá automáticamente

### Método 2: Sobrescribir variables directamente

Si solo quieres cambiar algunos colores, modifica directamente en `_colors.scss`:

```scss
// Cambiar solo el primary y accent
$color-primary: #ff6b35;  // Coral del preset Warm
$color-accent: #c1121f;   // Rojo del preset Warm
```

---

## 🎨 Vista Previa de Presets

### Warm 🔥
![Warm Preview](https://via.placeholder.com/400x60/ff6b35/ffffff?text=Warm+Preset)

### Neon ⚡
![Neon Preview](https://via.placeholder.com/400x60/00f5ff/000000?text=Neon+Preset)

### Dopamine 🌈
![Dopamine Preview](https://via.placeholder.com/400x60/84cc16/ffffff?text=Dopamine+Preset)

### Corporate 💼
![Corporate Preview](https://via.placeholder.com/400x60/2563eb/ffffff?text=Corporate+Preset)

### Minimal ✨
![Minimal Preview](https://via.placeholder.com/400x60/18181b/ffffff?text=Minimal+Preset)

---

## ⚙️ Personalización Avanzada

### Crear tu Propio Preset

1. Crea un nuevo archivo en `src/styles/presets/_mipreset.scss`
2. Define tus colores usando la misma estructura:

```scss
// ==========================================
// PRESET: MI PRESET PERSONALIZADO
// ==========================================

$color-primary: #yourcolor !default;
$color-secondary: #yourcolor !default;
$color-accent: #yourcolor !default;

// Colores semánticos
$color-success: #yourcolor !default;
$color-info: #yourcolor !default;
$color-warning: #yourcolor !default;
$color-danger: #yourcolor !default;

// Dark theme versions
$color-primary-dark: #yourcolor !default;
$color-secondary-dark: #yourcolor !default;
$color-accent-dark: #yourcolor !default;

$color-success-dark: #yourcolor !default;
$color-info-dark: #yourcolor !default;
$color-warning-dark: #yourcolor !default;
$color-danger-dark: #yourcolor !default;
```

3. Impórtalo en `_colors.scss`

---

## 🔄 Cambiar de Preset en Tiempo de Desarrollo

Para probar diferentes presets rápidamente:

1. Abre `_colors.scss`
2. Comenta/descomenta los imports de presets:

```scss
// @import "presets/warm";      // ← Comentado (no se usa)
@import "presets/neon";          // ← Activo
// @import "presets/dopamine";  // ← Comentado
```

3. Guarda y el hot-reload aplicará los cambios automáticamente

---

## 📝 Notas Importantes

- ⚠️ **Solo puede estar activo UN preset a la vez**
- ✅ El `!default` permite sobrescribir colores específicos después de importar
- 🎨 Los presets incluyen versiones dark optimizadas para contraste
- 🔧 Puedes mezclar presets (importar uno y sobrescribir colores específicos)

---

## 🆘 Troubleshooting

### El preset no se aplica

1. Verifica que el import esté **antes** de las definiciones de variables en `_colors.scss`
2. Asegúrate de que no hay otros imports de presets activos al mismo tiempo
3. Verifica que el servidor de desarrollo esté corriendo (`npm start`)

### Los colores se ven mezclados

Probablemente tienes múltiples presets importados. Comenta todos menos el que quieres usar.

### Quiero volver al preset original (Teal/Purple)

Simplemente comenta todos los imports de presets en `_colors.scss`:

```scss
// @import "presets/warm";
// @import "presets/neon";
// ... etc
```

---

## 📧 Soporte

¿Tienes dudas o quieres un preset personalizado? Abre un issue en el repositorio.
