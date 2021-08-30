import { Todo } from "../../types";
import { Container, Header, Content, Footer } from "./styles";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import ResizableTextArea from "react-textarea-autosize";
import { useCallback, useEffect, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { toast } from "react-toastify";

interface IProps {
  addToList: (data: Todo) => void;
}

const Card = ({ addToList }: IProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Todo>();
  const ref = useRef<HTMLDivElement>(null);
  const submitForm = useCallback(() => {
    if (!isDirty) return; // se nao tiver sido modificado não envie
    const formData = getValues();
    api
      .post(`/todos/`, formData)
      .then(({ data }: any) => {
        addToList(data); // Atualizar objeto no array
        toast.success(`Successfully created todo`);
        reset({
          title: "",
          description: "",
        }); // atualizar valores do formulario
      })
      .catch((err: any) => {
        toast.error(`An error ocurred. Try again later`);
      });
  }, [isDirty, getValues, addToList, reset]);
  useEffect(() => {
    if (!isDirty) return;
    window.addEventListener("beforeunload", () => submitForm()); // submeter formulário editado ao fechar a página
    return () => {
      window.removeEventListener("beforeunload", () => submitForm());
    };
  }, [isDirty, submitForm]);
  useOnClickOutside(ref, submitForm);
  return (
    <div ref={ref}>
      <Container onSubmit={handleSubmit(submitForm)}>
        <Header>
          <ResizableTextArea
            {...register("title")}
            defaultValue={""}
            placeholder="Create a new todo"
          />
        </Header>
        <Content>
          <ResizableTextArea
            {...register("description")}
            defaultValue={""}
            placeholder="Add a description to your todo"
          />
        </Content>
        <Footer></Footer>
      </Container>
    </div>
  );
};
export default Card;
