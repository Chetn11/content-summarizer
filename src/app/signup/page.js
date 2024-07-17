
import styles from './Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Signup</h2>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required  placeholder='Enter Your Name'/>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required  placeholder='Enter Your Email'/>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder='Enter Your Password'/>
          </div>
          <button type="submit" className={styles.button}>Signup</button>
        </form>
        <p className={styles.login}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
