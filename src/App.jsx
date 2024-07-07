// components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import Thanks from "./components/Thanks";
import Steps from "./components/Steps";

// hooks
import { useForm } from "./hooks/useForm";
import { useState } from "react";

import "./App.css";

function App() {
  const formTemplate = {
    name: "",
    email: "",
    review: "",
    comment: "",
  };

  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value }; //retorna um objeto com a propriedades do estado anterior de data com a propriedade [key] atualizada com o valor value
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler}></UserForm>,
    <ReviewForm
      data={data}
      updateFieldHandler={updateFieldHandler}
    ></ReviewForm>,
    <Thanks data={data}></Thanks>,
  ]; // variável armazena os formulários-componentes, assim é possível exibir o componente de acordo com o seu index

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com sua compra, utilize o formulário abaixo para
          avaliar o produto
        </p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep}></Steps>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious></GrFormPrevious>
                <span>Voltar</span>
              </button>
            )}
            {isLastStep ? (
              <button type="button">
                <span>Enviar</span>
                <FiSend></FiSend>
              </button>
            ) : (
              <button type="submit">
                <span>Avançar</span>
                <GrFormNext></GrFormNext>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
