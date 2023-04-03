import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios.js";

// imagenes
import abGuruLogo from "../../assets/images/abguru_logo.png";

// Nombre y apellido
const NAME_REGEX = /^[a-zA-Z ,.'-]/;

// Password:
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).(?=.*[!@#$%]).{8,24}$/;

// Documento identidad
const ID_REGEX = /[0-9]$/;

// Email:
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;


// URL
const REGISTER_URL = "http://localhost:3500/api/register/newUser";
//const REGISTER_URL = "https://aybgurusrewards.com/api/register/newUser";
//const REGISTER_URL = "https://abgururewards.herokuapp.com/api/register/newUser";

export default function Register() {
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [identityNumber, setIdentityNumber] = useState("");
  const [validIdentityNumber, setValidIdentityNumber] = useState(false);
  const [identityNumberFocus, setIdentityNumberFocus] = useState(false);

  const [address, setAdress] = useState("");
  const [validAdress, setValidAdress] = useState(false);
  const [addressFocus, setAdressFocus] = useState(false);

  const [postalCode, setPostalCode] = useState("");
  const [validPostalCode, setValidPostalCode] = useState(false);
  const [postalCodeFocus, setPostalCodeFocus] = useState(false);

  const [country, setCountry] = useState("");
  const [validCountry, setValidCountry] = useState(false);
  const [countryFocus, setCountryFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [phoneNum, setPhoneNum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneNumFocus] = useState(false);

  const [reachBy, setReachBy] = useState("");

  const [pointsEarned, setPointsEarned] = useState("0");

  const [eliteNights, setEliteNights] = useState("0");

  const [AB_Prize, setAB_Prize] = useState([]);

  const [famTripChance, setFamTripChance] = useState("No");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [terms, setTerms] = useState(false);

  // nombre valido?
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  // apellido valido?
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  // email valido?
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // password valido - ambos pass coinciden?
  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  // identityNumber valido?
  useEffect(() => {
    const result = ID_REGEX.test(identityNumber);
    setValidIdentityNumber(result);
  }, [identityNumber]);

  // adress valido?
  useEffect(() => {
    const result = NAME_REGEX.test(address);
    setValidAdress(result);
  }, [address]);

  // postalCode valido?
  useEffect(() => {
    const result = ID_REGEX.test(postalCode);
    setValidPostalCode(result);
  }, [postalCode]);

  // country valido?
  useEffect(() => {
    const result = NAME_REGEX.test(country);
    setValidCountry(result);
  }, [country]);

  // city valido?
  useEffect(() => {
    const result = NAME_REGEX.test(city);
    setValidCity(result);
  }, [city]);

  // phoneNum valido?
  useEffect(() => {
    const result = ID_REGEX.test(phoneNum);
    setValidPhoneNum(result);
  }, [phoneNum]);

  // mensaje de error
  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    email,
    password,
    matchPassword,
    identityNumber,
    address,
    postalCode,
    country,
    city,
    phoneNum,
    reachBy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PASS_REGEX.test(password);
    const v5 = ID_REGEX.test(identityNumber);
    const v6 = NAME_REGEX.test(address);
    const v7 = ID_REGEX.test(postalCode);
    const v8 = NAME_REGEX.test(country);
    const v9 = NAME_REGEX.test(city);
    const v10 = ID_REGEX.test(phoneNum);
    const v11 = reachBy;
    const v12 = pointsEarned;
    const v13 = eliteNights;
    const v14 = AB_Prize;
    const v15 = famTripChance;
    if (
      !v1 ||
      !v2 ||
      !v3 ||
      !v4 ||
      !v5 ||
      !v5 ||
      !v6 ||
      !v7 ||
      !v8 ||
      !v9 ||
      !v10 ||
      !v11 ||
      !v12 ||
      !v13 ||
      !v14 ||
      !v15
    ) {
      setErrMsg("Entrada no valida");
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          identityNumber,
          address,
          postalCode,
          country,
          city,
          phoneNum,
          reachBy,
          pointsEarned,
          eliteNights,
          AB_Prize,
          famTripChance,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setIdentityNumber("");
      setAdress("");
      setPostalCode("");
      setCountry("");
      setCity("");
      setPhoneNum("");
      setReachBy("");
      setPointsEarned("0");
      setEliteNights("0");
      setAB_Prize("None");
      setFamTripChance("No");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="landing_container">
          <div className="logo_header">
            <img src={abGuruLogo} alt="" />
          </div>
          <section>
            <h2 id="color-pink">Registro exitoso!</h2>
            <p>
              <a href="/">Ingresar</a>
            </p>
          </section>
        </div>
      ) : (
        <div className="landing_container">
          <div className="logo_header">
            <img src={abGuruLogo} alt="" />
          </div>

          <section className="section_container">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">
                Nombre:
                <span className={validFirstName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="lastName">
                Apellido:
                <span className={validLastName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validLastName || !lastName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>
              <label htmlFor="email">
                Correo electrónico:
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras, números, guiones y guiones bajos.
              </p>

              <label htmlFor="password">
                Contraseña:
                <span className={validPassword ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPassword || !password ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe incluir mayúsculas y minúsculas, un número y un caracter
                especial.
                <br />
                Caracteres especiales permitidos:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_password">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe coincidir con la primer constraseña.
              </p>

              <label htmlFor="identityNumber">
                Documento de identidad:
                <span className={validIdentityNumber ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validIdentityNumber || !identityNumber ? "hide" : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="identityNumber"
                autoComplete="off"
                onChange={(e) => setIdentityNumber(e.target.value)}
                required
                aria-invalid={validIdentityNumber ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setIdentityNumberFocus(true)}
                onBlur={() => setIdentityNumberFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  identityNumberFocus && identityNumber && !validIdentityNumber
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="address">
                Domicilio:
                <span className={validAdress ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validAdress || !address ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="adress"
                autoComplete="off"
                onChange={(e) => setAdress(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setAdressFocus(true)}
                onBlur={() => setAdressFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  addressFocus && address && !validAdress
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="postalCode">
                Código postal:
                <span className={validPostalCode ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPostalCode || !postalCode ? "hide" : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="postalCode"
                autoComplete="off"
                onChange={(e) => setPostalCode(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPostalCodeFocus(true)}
                onBlur={() => setPostalCodeFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  postalCodeFocus && postalCode && !validPostalCode
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="country">
                País:
                <span className={validCountry ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validCountry || !country ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="country"
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setCountryFocus(true)}
                onBlur={() => setCountryFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  countryFocus && country && !validCountry
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="city">
                Ciudad:
                <span className={validCity ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validCity || !city ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="city"
                autoComplete="off"
                onChange={(e) => setCity(e.target.value)}
                required
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  cityFocus && city && !validCity ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="phoneNum">
                Teléfono de contacto:
                <span className={validPhoneNum ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPhoneNum || !phoneNum ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="phoneNum"
                autoComplete="off"
                onChange={(e) => setPhoneNum(e.target.value)}
                required
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPhoneNumFocus(true)}
                onBlur={() => setPhoneNumFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  phoneNumFocus && phoneNum && !validPhoneNum
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="reachBy">¿Cómo nos conociste?</label>
              <br />
              <select
                id="reachBy"
                value={reachBy}
                onChange={(e) => {
                  setReachBy(e.target.value);
                }}
                name="reachBy"
              >
                <option value="">-- Elige una opción --</option>
                <option value="newsletter">Newsletter</option>
                <option value="redes_sociales">Redes sociales</option>
                <option value="capacitaciones">Capacitaciones A&B</option>
                <option value="invitacion_mayoristas">
                  Invitación mayoristas
                </option>
                <option value="otro">Otra</option>
              </select>
              <br/>
              {terms && (
                <div className="terms_container">
                  <section className="section_container">
                    <h2>Términos y condiciones</h2>
                    <div className="terms_text">
                      <p id="text-bold">
                        Le damos la bienvenida al Programa de Rewards para
                        Antigua y Barbuda: “A&B GURÚS”
                      </p>
                      <br />
                      <br />
                      <p>
                        Al registrarse en A&B GURÚS usted acepta lo siguiente:
                      </p>
                      <br />
                      <br />
                      <ol>
                        <li>
                          <p>
                            Para registrarse en “A&B GURÚS”, usted debe ser un
                            agente de viajes oficial individual o empleado de
                            una agencia de viajes minorista siempre y cuando
                            cumpla con las condiciones del presente documento.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            En el caso de ser miembro de una agencia minorista,
                            deberá informar datos completos de la misma, como
                            así también del Operador Mayorista responsable o a
                            través de quien efectuó su reserva.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            En el caso de ser empleado de una agencia mayorista,
                            usted no podrá participar del presente salvo que la
                            venta se realice directamente al pasajero.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Su nombre de usuario corresponde a la dirección de
                            correo electrónico válida que nos proporcione.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Los datos de su correo electrónico no se
                            transmitirán a terceros, salvo que sean proveedores
                            u hoteles participantes del Programa “A&B GURÚS”.
                            Los proveedores a cuyos programas de recompensas
                            esté suscrito se podrán comunicar con usted por
                            correo electrónico con fines de marketing directo.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            El perfil con sus datos personales deberá estar
                            siempre actualizado para poder acceder a la
                            recompensa que le corresponda. Usted es responsable
                            de la veracidad y actualización de los datos
                            proporcionados.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Al registrarse en el programa, acepta que el hotel
                            participante de la promoción utilice sus datos para
                            comunicarse con usted a través de los canales
                            proporcionados.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Para acceder a las recompensas del Programa de
                            Rewards “A&B GURÚS” es de carácter obligatorio
                            haberse registrado previamente en el Campus Virtual
                            de EM y haber completado el curso de experto
                            recibiendo el certificado oficial correspondiente.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Al suscribirse al programa “A&B GURÚS” usted acepta
                            los términos y condiciones de ese programa.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Los términos y condiciones se han redactado en
                            idioma español.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Es su responsabilidad mantenerse informado en cuanto
                            a las actualizaciones en los términos y condiciones
                            del programa, ya que pueden sufrir cambios
                            ocasionalmente.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Los valores y criterios de las recompensas pueden
                            cambiar en cualquier momento. Cualquier cambio en
                            las recompensas se indicará claramente en la página
                            de inicio del programa correspondiente.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Su compromiso con el programa “A&B GURÚS” y su
                            acuerdo de recompensas es entre usted y el proveedor
                            u hotel participante. EM Marketing & Communication
                            se deslinda de toda responsabilidad en cuanto a
                            compromisos entre el agente de viajes y el proveedor
                            participante.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            EM Marketing & Communication no acepta ninguna
                            responsabilidad por cualquier negligencia o falta de
                            pago de las recompensas adeudadas por parte de
                            cualquier proveedor participante del programa “A&B
                            GURÚS”.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Los puntos obtenidos por el registro de sus ventas
                            estarán visibles en el programa y podrá consultarlos
                            en la plataforma con su usuario y contraseña hasta
                            el momento de canjearlos. Es su exclusiva
                            responsabilidad canjear sus puntos dentro del plazo
                            temporal establecido por el Programa “A&B GURÚS”.
                            Fuera de ese plazo no será posible reclamar
                            recompensa alguna.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            “A&B GURÚS” Programa de Rewards se reserva el
                            derecho de verificar su situación laboral y la
                            validez de sus reservas en cualquier momento.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            En el caso de que finalice el programa de
                            recompensas “A&B GURÚS”, las recompensas listas para
                            ser canjeadas estarán disponibles durante el resto
                            del año calendario. Si no se canjean antes de la
                            fecha límite estipulada en el programa, se perderán
                            al vencer ese período.
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Al registrarse en “A&B GURÚS” Programa de Rewards,
                            usted autoriza que las fotos y los vídeos de su
                            perfil o su participación en cualquier evento
                            virtual o real sean tomados y distribuidos en el
                            contexto de la promoción de, sus proveedores y sus
                            eventos. Si no está satisfecho con esto, envíe un
                            correo electrónico a gurus@aybgurusrewards.com
                          </p>
                        </li>
                        <br />
                        <br />
                        <li>
                          <p>
                            Protección de datos personales: La información y los
                            datos personales proporcionados con el agente
                            suscriptor al Programa “A&B GURÚS” («Datos
                            personales») son procesados por EM Marketing &
                            Communication como controlador de datos, según lo
                            definido por el RGPD y la Ley de Protección de Datos
                            25326. Dicho procesamiento de datos está
                            estrictamente limitado a la membresía del programa
                            “A&B GURÚS”, el pago de recompensas y las
                            comunicaciones directamente relacionadas con los
                            programas y eventos de recompensas. La información
                            personal recopilada en el formulario de registro
                            está destinada a Antigua & Barbuda Tourism Authority
                            y a su representante EM Marketing & Communication,
                            que se reserva el derecho de usarla en el contexto
                            del programa “A&B GURÚS” La información recopilada y
                            anonimizada puede utilizarse con fines estadísticos
                            y analíticos.
                          </p>
                          <br />
                          <br />
                          <p>
                            El suscriptor al programa “A&B GURÚS” tiene derecho
                            a:
                          </p>
                          <br />
                          <ol>
                            <li>Solicitud de acceso a sus datos.</li>
                            <li>
                              Modificación y/o rectificación de datos inexactos.
                            </li>
                            <li>Eliminación (derecho al olvido).</li>
                            <li>Limitar el procesamiento de sus datos.</li>
                            <li>
                              Oponerse al tratamiento de su información y datos
                              personales.
                            </li>
                            <li>
                              Retirar el consentimiento en cualquier momento
                              para dejar de recibir las comunicaciones
                              previamente aceptadas.
                            </li>
                            <li>
                              El agente puede ejercer lo anterior escribiendo a:
                              <a href="mailto:gurus@aybgurusrewards.com">
                                gurus@aybgurusrewards.com
                              </a>
                            </li>
                          </ol>
                        </li>
                        <br />
                        <li>
                          <p>Responsabilidad:</p>
                          <p>
                            Antigua & Barbuda Tourism Authority y a su
                            representante EM Marketing & Communication no
                            aceptan ninguna responsabilidad u obligación en caso
                            de uso indebido de un programa de recompensas o el
                            uso de un programa de recompensas por parte de un
                            tercero no autorizado.
                            <br />
                            <br />
                            El agente debe mantener la confidencialidad de su
                            nombre de usuario y contraseña, y es responsable de
                            cualquier uso de esas credenciales por parte de
                            terceros y de cualquier acción realizada mediante el
                            uso de las mismas.
                            <br />
                            <br />
                            Si el agente tiene razones para creer que la
                            confidencialidad de su nombre de usuario o
                            contraseña se ha visto comprometida, debe
                            comunicarse de inmediato al mail{" "}
                            <a href="mailto:gurus@aybgurusrewards.com">
                              gurus@aybgurusrewards.com
                            </a>{" "}
                            y solicitar unas credenciales nuevas.
                            <br />
                            <br />
                            “A&B GURÚS” Programa de Rewards se reserva el
                            derecho de tomar las medidas que considere
                            apropiadas en caso de uso fraudulento o incorrecto
                            del sitio web o de los programas de recompensas para
                            proveedores.
                            <br />
                            <br />
                            Cualquier incumplimiento de estos términos y
                            condiciones, o cualquier falsificación de la
                            información proporcionada conducirán automáticamente
                            a la terminación de la membresía del agente y la
                            cancelación de sus recompensas.
                            <br />
                            <br />
                            Antigua & Barbuda Tourism Authority y EM Marketing &
                            Communication no se hacen responsable de ningún
                            virus, malware, troyanos u otro software malicioso
                            que pueda transmitirse durante el uso del sitio web
                            o en los correos electrónicos enviados en relación
                            con el programa “A&B GURÜS”. Los agentes tienen la
                            responsabilidad de tener el firewall y el software
                            antivirus necesarios para prevenir tales
                            infecciones.
                            <br />
                            <br />
                            Antigua & Barbuda Tourism Authority y EM Marketing &
                            Communication no se hacen responsables de las
                            recompensas adeudadas por los proveedores del
                            programa “A&B GURÜS” como así también tienen derecho
                            en cualquier momento a decidir libremente si
                            modificar o complementar los términos. Del mismo
                            modo, se reservan el derecho a interrumpir,
                            modificar o finalizar el programa de recompensas.
                            <br />
                            <br />
                            En este sentido, EM Marketing & Communication
                            informará a los agentes de cualquier modificación
                            realizada publicando estas modificaciones en el
                            sitio web. Cualquier enmienda introducida se
                            aplicará a los agentes.
                            <br />
                            <br />
                            Ninguna enmienda, incluida la terminación del
                            programa de recompensas dará derecho al agente a una
                            compensación.
                          </p>
                        </li>
                      </ol>
                    </div>
                  </section>
                </div>
              )}
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  aria-describedby="uidnote"
                  required
                />
                <label>
                  <button
                    className="terms_open_button"
                    onClick={()=>{setTerms(!terms)}}          
                  >
                    Acepto los terminos y condiciones del Programa de Rewards
                    para Antigua y Barbuda: “A&B GURÚS”.
                  </button>
                </label>
              </div>
              <br />
              <button
                className="login_button"
                disabled={
                  !validEmail || !validPassword || !validMatch ? true : false
                }
              >
                Registrar
              </button>
            </form>
            <br />
            <p>
              Ya estas registrado?
              <br />
              <button className="login_button">
                <a href="/">Ingresar</a>
              </button>
            </p>
          </section>
          <br />
        </div>
      )}
    </>
  );
}
