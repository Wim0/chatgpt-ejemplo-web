//Para poder guardar los comentarios
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const comentario = document.querySelector('#comentario').value;

    const firebaseConfig = {
        apiKey: "AIzaSyAlcCuGWisPalWxkiMUdQ-sabaddCOjdXQ",
        authDomain: "chatgpt-ejemplo-web.firebaseapp.com",
        projectId: "chatgpt-ejemplo-web",
        storageBucket: "chatgpt-ejemplo-web.appspot.com",
        messagingSenderId: "561045361208",
        appId: "1:561045361208:web:dd48ed0d4587bd4ef40ccd"
    };
    firebase.initializeApp(firebaseConfig);

    // Escribir el comentario en la colección "comentarios"
    const db = firebase.firestore();
    db.collection("comentarios").add({
        nombre: nombre,
        comentario: comentario
    })
        .then((docRef) => {
            console.log("Comentario almacenado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error al almacenar comentario: ", error);
        });

    // Resetear el formulario
    formulario.reset();
});
