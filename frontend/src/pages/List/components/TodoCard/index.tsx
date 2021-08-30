import { Todo } from "../../types";
import { Container, Header, Content, Footer, DoneButton } from "./styles";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import ResizableTextArea from "react-textarea-autosize";
import { useCallback, useEffect } from "react";
interface IProps {
  todo: Todo;
  onUpdate: (data: Todo) => void;
}

const Card = ({ todo, onUpdate }: IProps) => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Todo>();
  const watcher = watch();

  const submitForm = useCallback(
    (formData: Todo = getValues()) => {
      if (todo.done) return;
      api
        .put(`/todos/${todo.id}`, formData)
        .then(({ data }: any) => {
          onUpdate(data); // Atualizar objeto no array
          reset(data); // atualizar valores do formulario
        })
        .catch((err: any) => {
          console.log(err.data);
        });
    },
    [getValues, onUpdate, reset, todo]
  );
  const MarkAsDone = useCallback(
    (formData) => {
      submitForm({ ...formData, done: true });
    },
    [submitForm]
  );
  useEffect(() => {
    if (!isDirty) return; // se o formulário não for modificado, não enviar
    const timeout = setTimeout(() => {
      const form = getValues();
      submitForm({ ...todo, ...form });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [watcher, isDirty, submitForm]);

  useEffect(() => {
    if (!isDirty) return;
    window.addEventListener("beforeunload", () => submitForm()); // submeter formulário editado ao fechar a página
    return () => {
      window.removeEventListener("beforeunload", () => submitForm());
    };
  }, [isDirty]);
  return (
    <Container done={todo.done} onSubmit={handleSubmit(MarkAsDone)}>
      {(!todo.done || todo.title) && (
        <Header>
          <ResizableTextArea
            {...register("title")}
            defaultValue={todo.title || ""}
            placeholder="Add a title to your todo"
          />
        </Header>
      )}
      {(!todo.done || todo.description) && (
        <Content>
          <ResizableTextArea
            {...register("description")}
            defaultValue={todo.description || ""}
            placeholder="Add a description to your todo"
          />
        </Content>
      )}
      <Footer>
        {!todo.done && <DoneButton>Marcar como Feito</DoneButton>}
      </Footer>
    </Container>
  );
};
export default Card;
