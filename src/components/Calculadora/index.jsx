import { useState } from "react";
import styles from "./Calculadora.module.css";
import { useEffect } from "react";

const Calculadora = () => {
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [IMC, setIMC] = useState(0);
  const [estadoIMC, setEstadoIMC] = useState("não calculado");
  const [erroIMC, setErroIMC] = useState(true);
  const [erroMSG, setErroMSG] = useState(
    "Preencha os campos acima para calcular o seu IMC."
  );

  const [tableVisible, setTableVisible] = useState(false);

  function calculaIMC() {
    return (peso / (((altura / 100) * altura) / 100)).toFixed(1);
  }

  // atualiza valor do IMC assim que peso ou altura forem alterados
  // valida os dados de peso e altura
  useEffect(() => {
    if (
      (peso == 0 && altura == 0) ||
      peso == "" ||
      altura == "" ||
      IMC == "NaN"
    ) {
      setErroIMC(true);
      setErroMSG("Preencha os campos acima para calcular o seu IMC.");
      return;
    } else if (altura < 30) {
      setErroIMC(true);
      setErroMSG("Atenção: a altura deve ser preenchida em centímetros.");
      return;
    }

    setErroIMC(false);
    setIMC(calculaIMC());
  }, [peso, altura]);

  // atualiza a interpretação do IMC
  useEffect(() => {
    let novoEstado = "";

    if (IMC <= 16.9) {
      novoEstado = "muito abaixo do peso";
    } else if (IMC <= 18.4) {
      novoEstado = "abaixo do peso";
    } else if (IMC <= 24.9) {
      novoEstado = "peso normal";
    } else if (IMC <= 29.9) {
      novoEstado = "acima do peso";
    } else if (IMC <= 34.9) {
      novoEstado = "obseidade grau I";
    } else if (IMC <= 39.9) {
      novoEstado = "obseidade grau II";
    } else if (IMC >= 40) {
      novoEstado = "obseidade grau III";
    }

    setEstadoIMC(novoEstado);
  }, [IMC]);

  return (
    <>
      <section className={styles.calculator}>
        <form className={styles.form}>
          <p>Por favor, insira seus dados:</p>

          <div className={styles.formGrid}>
            <label className={styles.formLabel} for="peso">
              Peso (kg)
            </label>
            <input
              onKeyUp={(e) => setPeso(parseInt(e.target.value))}
              className={styles.formInput}
              type="number"
              id="peso"
            />

            <label className={styles.formLabel} for="altura">
              Altura (cm)
            </label>
            <input
              onKeyUp={(e) => setAltura(parseInt(e.target.value))}
              className={styles.formInput}
              type="number"
              id="altura"
            />
          </div>
        </form>

        <div className={styles.resultado}>
          {erroIMC ? (
            <p>{erroMSG}</p>
          ) : (
            <>
              <p>O seu IMC calculado é de</p>
              <p>
                <span className={styles.resultadoIMC}>{IMC}</span>:{" "}
                <span className={styles.resultadoIMC}>{estadoIMC}</span>
                <span
                  onClick={() => setTableVisible(!tableVisible)}
                  className={styles.imcTable}
                  title="Veja a tabela completa."
                >
                  🔎
                </span>
              </p>
            </>
          )}
        </div>

        {tableVisible && (
          <ul className={styles.tabela}>
            <li className={styles.row}>
              <p className={styles.title}>IMC (kg/m 2)</p>
              <p className={styles.title}>classificação</p>
            </li>

            <li className={styles.row}>
              <p>menor que 16,9</p>
              <p>muito abaixo do peso</p>
            </li>

            <li className={styles.row}>
              <p>17 a 18,4</p>
              <p>abaixo do peso</p>
            </li>

            <li className={styles.row}>
              <p>18,5 a 24,9</p>
              <p>peso normal</p>
            </li>

            <li className={styles.row}>
              <p>25 a 29,9</p>
              <p>acima do peso</p>
            </li>

            <li className={styles.row}>
              <p>30 a 34,9</p>
              <p>obesidade grau I</p>
            </li>

            <li className={styles.row}>
              <p>35 a 40</p>
              <p>obesidade grau II</p>
            </li>

            <li className={styles.row}>
              <p>maior que 40</p>
              <p>obesidade grau III</p>
            </li>
          </ul>
        )}
      </section>
    </>
  );
};

export default Calculadora;
