type BookTS = {
    id: string;
    title: string;
    author: string;
  };
  
  function generateRandomId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
  
  const books: BookTS[] = [
    {
      id: generateRandomId(),
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      id: generateRandomId(),
      title: "City of Glass",
      author: "Paul Auster",
    },
  ];
  
  export default {
    Query: {
      books: () => {
        console.log("COUCOU");
        return books;
      },
      findBook: (parent: any, args: any) => {
        return books.find((b) => b.id === args.id);
      },
    },
    Mutation: {
      addBook: (parent: any, args: any, context: any, infos: any) => {
        console.log("PARENT", parent);
        console.log("ARGS", args);
        console.log("CONTEXT", context);
        console.log("INFOS", infos);
        // 4 positions : 1ere parent,  2eme position les arguments, 3eme position: le contexte, 4eme: infos
        const book = {
          id: generateRandomId(),
          title: args.data.title,
          author: args.data.author,
        };
        books.push(book);
  
        return book;
      },
      deleteBook: (parent: any, args: any) => {
        console.log(args.id);
        // GraphQL importe peu, à nous de faire la logique de suppression
        const index = books.findIndex((b) => b.id === args.id);
        if (index === -1) {
          throw new Error("Le livre n'a pas été trouvé");
        }
  
        books.splice(index, 1);
        return books;
      },
    },
  };
  