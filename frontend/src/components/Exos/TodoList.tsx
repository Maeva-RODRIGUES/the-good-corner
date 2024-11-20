// Composant : Exercice1.tsx

import { useState } from "react";

type ListItemType = {
  id: string;
  title: string;
};

export default function ToDoList() {
  const [list, setList] = useState<ListItemType[]>([]);
  const [toDo, setToDo] = useState<string>("");
  const [editList, setEdit] = useState<number | null>(null); // Indice de la tâche en édition, null si aucune


  const handleToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };
 // Ajouter ou modifier une tâche
 const handleAddToList = () => {
  if (editList !== null) {
    // Si on est en mode édition (editIndex n'est pas null), on met à jour la tâche
    setList((prevValues) =>
      prevValues.map((todo, index) =>
        index === editList ? { ...todo, title: toDo } : todo
      )
    );
    setEdit(null); // Quitter le mode édition
  } else {
    // Sinon, ajouter une nouvelle tâche
    setList((prevValues) => [
      ...prevValues,
      { id: String(Math.random()), title: toDo },
    ]);
  }
  setToDo(""); // Réinitialiser le champ de texte
};

  // -----------------------------------------------------------
  // Supprime une tâche de la liste en utilisant l'index
  const deleteFromList = (index: number) => {
    // On filtre la liste et on garde toutes les tâches sauf celle dont l'index correspond à celui passé en paramètre - prevValues est la liste avant la modification, fournie automatiquement par React.
    setList((prevValues) => prevValues.filter((_, i) => i !== index));
    // Ici, le "_" est utilisé car la variable "todo" (élément de la liste) n'est pas utilisée,
    // nous ne nous intéressons qu'à l'index (i) pour filtrer l'élément à supprimer.
  };

  //-------------------------------------------------------------------

  //Editer une tâche 
  const editFromList = (index: number) => {
    setToDo(list[index].title); // Remplir le champ de saisie avec le titre de la tâche à éditer
    setEdit(index); // Mettre l'index de la tâche en cours d'édition
  };

    // Annuler l'édition et réinitialiser l'état
    const cancelEdit = () => {
      setToDo(""); // Réinitialiser le champ de saisie
      setEdit(null); // Quitter le mode édition
    };


  return (
    <div>
      <input
        placeholder="Ajouter une tache"
        type="text"
        onChange={handleToDo}
        value={toDo}
      />
      {/* Le texte du bouton change en fonction de l'état (édition ou ajout) */}
      <button onClick={handleAddToList}>
        {editList !== null ? "Éditer" : "Ajouter"}
      </button>

      {list.length === 0 ? (
        <p>La liste est vide</p>
      ) : (
        <ul>
        {list.map((todo, index) => (
          <li key={todo.id}>
            {todo.title}

            {/* Désactivation du bouton "Supprimer" si une tâche est en mode édition */}
              <button
                onClick={() => deleteFromList(index)}
                disabled={editList !== null}
              >
                Supprimer
                </button>

            {/* Bouton "Modifier" pour mettre en mode édition */}
              <button onClick={() =>
                  editList === index ? cancelEdit() : editFromList(index)
                }
              >
                {editList === index ? "Annuler" : "Modifier"}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}