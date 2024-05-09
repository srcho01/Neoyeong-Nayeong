import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from './LoginTextButton.module.css';

const LoginTextButton = () => {
    const navigate = useNavigate();

    const onLoginTextButtonClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h11} onClick={onLoginTextButtonClick}> 로그인 </h1>
        </div>
    );
};

export default LoginTextButton;