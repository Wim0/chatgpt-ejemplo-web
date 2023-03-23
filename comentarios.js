const formulario = document.querySelector('#formulario');

//Para poder guardar los comentarios
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const comentario = document.querySelector('#comentario').value;

    const data = {
        nombre: nombre,
        comentario: comentario
    };

    fetch('https://chatgpt-ejemplo-web-default-rtdb.firebaseio.com/comentarios.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});

//Configuracion para envia los comentarios a firebase
function enviarComentario(nombre, comentario) {
    // Configurar la conexión a Firebase
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
}
