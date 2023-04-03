import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

function ForgotPassword() {
  const { id, token } = useParams();

  const history = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const userValid = async () => {
    const res = await axios.get(`api/auth/forgotPassword/${id}/${token}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 201) {
      console.log("usuario valido");
    } else {
      history("*");
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `api/auth/changePassword/${id}/${token}`,
      JSON.stringify({ password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status === 201) {
      setPassword("");
      setMessage(true);
    } else {
      setPassword("");
    }
  };

  useEffect(() => {
    userValid();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="main_container">
      <br />
      <br />
      <br />
      <div className="landing_container">
        <section className="authentication_section">
          {!message && (
            <>
              <h2>Ingresa tu nueva contraseña</h2>
              <form>
                <label htmlFor="password">Nueva contraseña: </label>
                <input
                  type="password"
                  autoComplete="off"
                  onChange={setVal}
                  value={password}
                  required
                />
                <br />
                <button className="ingresar_button" onClick={sendPassword}>
                  Ingresar
                </button>
              </form>
            </>
          )}
          {message && (
            <>
              <p id="color-pink">
                La contraseña ha sido modificada. A partir de ahora deberas usar tu nueva contraseña para ingresar.
              </p>
              <br />
              <br />
              <br />
              <Link className="register_button" to="/login">
                Volver
              </Link>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default ForgotPassword;
