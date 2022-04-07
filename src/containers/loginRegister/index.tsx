import { ReactElement } from "react";

interface IContainerLoginECadastroProps {
  children: ReactElement
}

export default function containerLoginECadastro (props: IContainerLoginECadastroProps) {
  return (
  <>
    {props.children}
  </>
  )
}