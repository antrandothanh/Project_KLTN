import React, {useState} from 'react'
import styles from "../styles/SignIn.module.css";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignIn = () => {
    navigate("/manager/")
  }

  return (
    <div className={styles.signInForm}>
      <div className={styles.title}>Đăng nhập</div>
      <div className={styles.inputSection}>
        <label>Email</label>
        <input type="email" />
      </div>
      <div className={styles.inputSection}>
        <label>Mật khẩu</label>
        <input type={showPassword ? "text" : "password"} />
      </div>
      <div className={styles.showPasswordSection}>
        <input className="form-check-input" type="checkbox" checked={showPassword} onChange={handleShowPassword} id="checkDefault" />
        <label className="form-check-label" for="checkDefault">
          Hiện mật khẩu.
        </label>
      </div>
      <div className={styles.buttonSection}>
        <button onClick={handleSignIn}>Đăng nhập</button>
      </div>
      <div>
        Quên mật khẩu? <a className={styles.link} href='#'>Ấn vào đây để khôi phục.</a>
      </div>
    </div>
  )
}

export default SignIn;