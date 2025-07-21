### Cómo hacer el despliegue de los microservicios

Para ejecutar los microservicios de manera local, sigue los pasos a continuación:

#### 1. Instalación de dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina. Luego, realiza los siguientes pasos para cada microservicio:

1. Navega al directorio del microservicio:
   ```bash
   cd <user-service>
   cd <publication-service>
   
2. Instala las dependencias necesarias utilizando el siguiente comando:
   ```bash
   npm install
   
#### 2. Ejecución del servicio

   Una vez instaladas las dependencias, puedes ejecutar el microservicio con el siguiente comando:
   ```bash
   npm run dev
   ````


# 🚀 Cómo hacer el despliegue de los microservicios en Docker Desktop

Antes de ejecutar los microservicios, accede a la carpeta del frontend (`UI`) y ejecuta los siguientes comandos en la terminal:

```bash
npm install
```

Luego, compila el proyecto Angular en modo producción:

```bash
ng build --configuration=production
```

Esto generará una carpeta `dist/` requerida para el despliegue del frontend.

---

## 🐳 Despliegue con Docker Compose

Desde la **raíz del proyecto** (por ejemplo, `social_networ`), ejecuta el siguiente comando:

```bash
docker compose up --build
```

Esto construirá las imágenes de los servicios y levantará los contenedores necesarios.

---

## ⚠️ Si aparece un error como este:

```bash
 => ERROR [frontend-service build 4/5] RUN npm install                                99.6s 
...
npm ERR! code ECONNRESET
npm ERR! network This is a problem related to network connectivity.
...
```

Este error normalmente se debe a problemas de red o un proxy mal configurado.

**Solución:**  
Vuelve a ejecutar el mismo comando:

```bash
docker compose up --build
```

Generalmente con un segundo intento se soluciona. Si no hay errores, puedes ignorar este paso.

---

## 📦 Verifica en Docker Desktop

Abre **Docker Desktop** y revisa que los contenedores estén activos:

![Contenedores activos en Docker Desktop](https://github.com/user-attachments/assets/e1baf927-664f-434a-8f86-1b64d176acd0)

Si ves que alguno aparece detenido, intenta iniciarlo manualmente desde la interfaz. Es normal que tarde un poco si se están ejecutando scripts de `seed`.

---

## 🌐 Accede al frontend

Una vez que todos los servicios estén encendidos correctamente, abre tu navegador y visita:

```
http://localhost:4200/login
```

Ahí podrás acceder al formulario de login y comenzar a usar la aplicación.

