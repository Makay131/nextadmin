import styles from "@/app/ui/login/login.module.css"
import LoginForm from "../ui/login/loginForm/loginForm"

export default function LoginPage() {
    return (
        <div className={styles.container}>
           <LoginForm /> 
        </div>
    )
}
