import "./login.css";

export default function Login() {
  return (
    <div className="main-window">
      <div className="title">
        <h2>Please log in</h2>
      </div>
      <div className="card">
        <form action="">
          <div className="input-section">
            <label htmlFor="nr_matricol">Număr Matricol</label>
            <input type="text" id="nr_matricol" />
          </div>
          <div className="input-section">
            <label htmlFor="password">Parolă</label>
            <input type="password" id="password" />
          </div>
          <div className="login-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
