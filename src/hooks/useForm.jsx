import { useState } from "react";

export function useForm(steps) {
  // steps: array de componentes-formulários
  const [currentStep, setCurrentStep] = useState(0); //etapa atual

  function changeStep(i, e) {
    if (e) e.preventDefault();

    // se etapa menor que zero ou maior que o número de etapas
    if (i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }

  return {
    currentStep,
    currentComponent: steps[currentStep], // componente atual
    changeStep,
    isLastStep: currentStep + 1 === steps.length ? true : false, // é a última etapa do array?
    isFirstStep: currentStep === 0 ? true : false,
  };
}
