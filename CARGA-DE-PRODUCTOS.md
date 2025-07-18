> Quiero reemplazar completamente el catálogo actual de productos en esta landing page de e-commerce. Los productos actuales son provisorios: **elimínalos todos por completo** antes de continuar.
> *Nota importante:* eliminar los productos actuales **no significa eliminar la página genérica de detalle de producto** ni su estructura. Elementos estáticos como la guía de detalles, cuidados, y otros datos que no están en el CSV deben mantenerse para todos los productos. La estructura base de la página de detalle debe conservarse igual, solo se actualizarán los datos específicos de cada producto según el CSV.
>
> Luego, carga los **83 productos definitivos** desde el archivo CSV que adjunto y también incluyo al final de este prompt en formato raw.
>
> El CSV contiene las siguientes columnas:
>
> * **Código de referencia**
> * **Nombre del producto**
> * **Descripción**
> * **Talles disponibles** (puede estar vacío si el producto no tiene talles)
> * **Colores**
> * **Precio lista**
> * **Precio efectivo**
> * **Fotos cargadas** (`true` o `false`)
> * **Link carpeta de Drive** → ⚠️ Esta columna contiene el **nombre del archivo base de la imagen** (sin extensión ni numeración si hay múltiples imágenes). Úsala como referencia para buscar imágenes.
>
> ---
>
> ### Reglas y especificaciones a cumplir:
>
> ✅ **1. Reemplazo total:**
>
> * Elimina todos los productos actuales del frontend.
> * *Pero mantén intacta la estructura estática y base de la página de detalle del producto*, incluyendo cualquier contenido común como guía de detalles, cuidados, instrucciones, etc.
>
> ✅ **2. Carga desde el CSV:**
>
> * Crea un nuevo producto por cada fila del archivo.
> * Si la columna "Talles disponibles" está vacía, genera una página de producto **sin selector de talles**.
> * Si tiene valores (como “S, M, L”), incluye un selector con esas opciones.
>
> ✅ **3. Imágenes del producto:**
>
> * Si “Fotos cargadas” es `true`, busca una o más imágenes del producto en la siguiente carpeta del proyecto:
>
>   ```
>   /public/Productos/
>   ```
> * Las imágenes pueden tener extensiones variadas: `.jpg`, `.jpeg`, `.png`, `.pdf`, etc.
> * Usá el valor en la columna “Link carpeta de Drive” como **nombre base del archivo** (sin extensión ni numeración). Por ejemplo, si dice `AB1234`, se deben buscar archivos como:
>
>   * `AB1234.jpg`, `AB1234.jpeg`, `AB1234.png`, `AB1234.pdf`, etc.
>   * También variantes con numeración: `AB1234 (1).jpg`, `AB1234 (2).jpeg`, etc.
> * Si no se encuentran archivos por nombre base, buscar por el **nombre del producto** como alternativa.
>
> ✅ **4. Jerarquía de imágenes y visualización:**
>
> * Si hay **múltiples imágenes** para un producto:
>
>   * La **primera imagen encontrada** se usará como imagen principal en la **card del catálogo**.
>   * La **segunda imagen** (si existe) se mostrará como imagen de **hover** en la card del catálogo.
>   * En el **detalle del producto**, la primera será la imagen activa, y las demás estarán en una **galería lateral**.
> * Si solo hay una imagen, usarla como principal sin hover ni galería.
> * Si “Fotos cargadas” es `false`, no mostrar ninguna imagen.
>
> ✅ **5. Estructura visual:**
>
> * El diseño debe ser limpio, responsive y funcional tanto en desktop como en mobile.
> * Si el CSV incluye categorías (no obligatorio), organizá los productos en base a eso. Si no hay categorías, ignorá ese aspecto.
>
> ✅ \*\*6. La columna “Link carpeta de Drive” ahora **sí debe usarse** como referencia del nombre base del archivo de imagen.
>
> ---
>
> El CSV está **adjunto** y también se encuentra a continuación, al final de este prompt, en formato raw.

---

> ✅ **7. Asociación dinámica entre colores e imágenes:**
>
> * Hay casos en los que **un mismo producto (mismo código de referencia y mismo nombre)** tiene **imágenes diferentes según el color**.
> * Estas imágenes deben estar asociadas activamente a los colores correspondientes en la página de **detalle del producto**.
> * El comportamiento debe ser el siguiente:
>
>   * Al seleccionar un color diferente en el selector de color, se deben mostrar automáticamente las imágenes correspondientes a ese color.
>   * A su vez, **si el usuario selecciona una miniatura de una imagen lateral** (por ejemplo, en la galería a la izquierda de la imagen principal) que corresponde a otro color, **también debe actualizarse automáticamente el selector de color** en el panel derecho.
>   * Es decir, el cambio de color debe actualizar las imágenes, y el cambio de imagen debe actualizar el color.
> * Debe haber un color **por defecto**, que será el primero que aparezca en el CSV por orden para ese producto.
> * Desde el principio, deben mostrarse las miniaturas de **todas las imágenes disponibles**, agrupadas por color.
> * La experiencia tiene que ser fluida y bidireccional: cambiar el color cambia las imágenes, y cambiar la imagen (si está vinculada a otro color) cambia automáticamente el color activo.

---

> ✅ **8. Detección automática de categoría del producto:**
>
> * El CSV **no incluye explícitamente una columna de categoría** (como "remera", "pantalón", "buzo", etc.).
> * Sin embargo, esta categoría debe **ser detectada automáticamente** a partir del **nombre del producto**.
> * Una vez identificada, la categoría debe implementarse correctamente para:
>
>   * Organizar visualmente el catálogo si corresponde (por ejemplo, filtros o secciones).
>   * Mantener coherencia estructural en el frontend, como URLs amigables, breadcrumbs, o tags visibles si los hay.
> * Ejemplos:
>
>   * Si el nombre del producto contiene "remera oversize", debe categorizarse como **remera**.
>   * Si el nombre dice “pantalón cargo” o “short”, debe ir bajo **pantalón**.
>   * "Buzo canguro" o “hoodie” debe ser **buzo**.
> * Esta lógica puede adaptarse a sinónimos y expresiones comunes.

---

> ✅ **9. División entre sección masculina y femenina:**
>
> * Dentro del CSV hay una **fila intermedia** que contiene únicamente el texto:
>
>   ```
>   sección femenina
>   ```
> * Esa fila **no representa un producto**, sino que actúa como marcador. Todo lo que aparece **después** de esa fila corresponde a la **sección femenina**, y todo lo que aparece **antes** corresponde a la **sección masculina**.
> * La ropa femenina comienza específicamente con el producto cuyo **código de referencia es `4023115D`**.
> * Esta división debe utilizarse para:
>
>   * Organizar visualmente el catálogo si hay un filtro o selector por género.
>   * Etiquetar correctamente los productos en sus respectivos contextos.
>   * Asegurar consistencia en la navegación o agrupación de productos.

---