import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json());

const tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer projeto", concluida: true }
];

app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({
      erro: "Título é obrigatório."
    });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const indice = tarefas.findIndex(tarefa => tarefa.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  tarefas.splice(indice, 1);

  res.status(200).json({
    mensagem: "Tarefa excluída com sucesso."
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
app.patch("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});