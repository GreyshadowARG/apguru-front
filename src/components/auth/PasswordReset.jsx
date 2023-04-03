import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "api/auth/sendPasswordLink",
      JSON.stringify({ email }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status === 201) {
      setEmail("");
      setMessage(true);
    } else{
      setEmail("");
    }
  }

  return (
    <div className="main_container">
      <br />
      <br />
      <br />
      <section className="authentication_section">
        <h2>Ingresa tu email</h2>
        {!message && (
          <>
            <p>
              Utiliza la dirección de correo con la que te registraste en el
              sistema.
            </p>
            <br/>
            <form>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={setVal}
                value={email}
                required
              />
              <button className="ingresar_button" onClick={sendLink}>
                Enviar email
              </button>
            </form>
          </>
        )}
        {message && (
          <>
            <p id="color-pink">
              Email enviado. Revisa tu casilla de correo con un link que te
              permitirá resetear tu contraseña. El mismo será válido por 2
              minutos.
            </p>
            <br/>
            <Link className="volver_button" to="/login">
              Volver
            </Link>
          </>
        )}
      </section>
    </div>
  );
}

export default PasswordReset;
