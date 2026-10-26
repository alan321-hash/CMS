const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {

  nav.classList.toggle(
    'scrolled',
    window.scrollY > 20
  );

});


const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold:.12
  }

);


document
  .querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
    import {
      getAuth,
      GoogleAuthProvider,
      signInWithPopup,
      signOut
    } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
    import {
      getFirestore,
      doc,
      setDoc,
      updateDoc,
      getDoc
    } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAnMcJrBMsOmleeTnIsBRInurnzaLm0huU",
      authDomain: "cms1-72ecb.firebaseapp.com",
      projectId: "cms1-72ecb",
      storageBucket: "cms1-72ecb.firebasestorage.app",
      messagingSenderId: "522505945463",
      appId: "1:522505945463:web:7a39acb740131506f42172"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();

    window.iniciarSesionGoogle = async function () {
      try {
        const resultado = await signInWithPopup(auth, provider);
        const usuario = resultado.user;

        await setDoc(doc(db, "usuarios", usuario.uid), {
          nombre: usuario.displayName,
          email: usuario.email,
          foto: usuario.photoURL,
          activo: true
        }, { merge: true });

        console.log("Usuario autenticado:", usuario.email);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    };

    window.cerrarSesion = async function () {
      await signOut(auth);
      console.log("Sesión cerrada");
    };

    window.modificarUsuario = async function() {
  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Primero iniciá sesión con Google.");
    return;
  }

  const nuevoNombre = prompt("Ingresá el nuevo nombre:");

  if (!nuevoNombre) return;

  await updateDoc(doc(db, "usuarios", usuario.uid), {
    nombre: nuevoNombre
  });

  alert("Usuario modificado correctamente.");
};

window.bajaUsuario = async function() {
  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Primero iniciá sesión con Google.");
    return;
  }

  await updateDoc(doc(db, "usuarios", usuario.uid), {
    activo: false
  });

  alert("Usuario dado de baja.");
};
// ==========================================
// Integración Directa con Telegram
// ==========================================

// Función principal para enviar notificaciones a Telegram
async function enviarNotificacionTelegram(mensaje) {
  const tokenBot = "8882065236:AAGB0MWA_GYKc2kdyQmwThtotgb7KC1Toyw";
  const chatId = "8031996071";

  const url = `https://api.telegram.org/bot${tokenBot}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📢 *Aviso CMS Colegial*\n\n${mensaje}`,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();

    if (data.ok) {
      console.log("✅ Notificación enviada a Telegram con éxito");
    } else {
      console.error("❌ Error devuelto por Telegram:", data);
    }
  } catch (error) {
    console.error("❌ Error de conexión al intentar enviar a Telegram:", error);
  }
}

// Mensaje de prueba automático al cargar el sitio en el navegador
enviarNotificacionTelegram("¡Hola! La integración directa desde el CMS a Telegram se ha configurado correctamente.");