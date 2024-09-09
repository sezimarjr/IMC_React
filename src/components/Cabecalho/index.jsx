import { useState } from "react";
import styles from "./Cabecalho.module.css";

const Cabecalho = () => {
  let [infoVisible, setInfoVisible] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          Calculadora de{" "}
          <span
            onClick={() => setInfoVisible(!infoVisible)}
            className={styles.enhance}
            title="O que é o IMC?"
          >
            IMC
          </span>
        </h1>

        {infoVisible && (
          <div className={styles.header__description}>
            <p>💡</p>
            <p>
              O índice de massa corpórea é um valor obtido através de uma
              correlação matemática entre o peso e a altura de um indivíduo. Seu
              resultado, em kg/m², é largamente utilizado para avaliar o seu
              peso ideal.
            </p>
          </div>
        )}
      </header>
    </>
  );
};

export default Cabecalho;
