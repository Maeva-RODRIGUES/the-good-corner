import axios from "axios";


type UsersTS = {
    id: string;
    name: string;
    email: string;
    address: AddressTS;
    phone: string;
    website: string;
    company: CompanyTS;

  }

  type AddressTS = {
    street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: GeoTS;
  }

  type GeoTS = {
    lat: string;
    lng: string;
  }

type CompanyTS = {
    name: string;
    catchPhrase: string;
    bs: string;
}

const users: UsersTS[] = [];

const fetchUsers = async () => {
    const result = await axios.get<UsersTS[]>("https://jsonplaceholder.typicode.com/users");
    console.log("RESULT", result.data);
    users.push(...result.data);
};

fetchUsers();

export default {
    Query:  {
        users: () => {
            console.log("HOLA");
            return users;
        },
    },
};