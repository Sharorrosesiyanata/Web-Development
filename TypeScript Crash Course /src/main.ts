// Variables

const a = "1";

console.log("aaa", a);

let hello: string = "world";

// Functions

const getFullName = (name: string, surname: string): string => {
  return name + " " + surname;
};

console.log(getFullName("Moster", "Lessons"));

// Interfaces

/*interface UserInterface {
    name: string;
    age?: number;
    getMessage(): string
}

const user: UserInterface = {
    name: 'Monster',
    age: 30,
    getMessage() {
        return 'hello' + name;
    },
};

const user2: UserInterface = {
    name: "Phil"
}


const user: {name: string; age: number} = {
    name: 'Nyakallo',
    age: 11,
};*/

// Types and Unions

// Union Operator

let username: string = "alex";

let pageName: string | number = "1";

let errorMessage: string | null = null;

//let user3: UserInterface | null = null;

//Type Alliases in typescript

/*type ID = string;
type PopularTag = string;

interface UserInterface {
  id: ID;
  name: string;
  surname: string;
}

const PopularTags: PopularTag[] = ["dragon", "coffe"];*/

//Unions + type alliases

//type MaybePopularTag = PopularTag | null;

//const dragonsTag: MaybePopularTag = "dragon";

//Any/Void/Never/Unknown

//Void

const doSomething = (): void => {
  console.log("doSomething");
};

//Any

let foo: any = "foo";
console.log(foo.bar());

//Never

const playSomething = (): never => {
  throw "never";
};

//Unknown

let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
//let s2: string = vUnknown;

//Type Assertion

let s2: string = vUnknown as string;

let pageNumber: String = "1";
let numericPageNumber: number = pageNumber as unknown as number;

//Working with the Dom
//working with input data
/*const someElement = document.querySelector('.foo') as HTMLInputElement;

console.log('someElement', someElement.value);*/

//adding listerners

const someElement = document.querySelector(".foo");

someElement.addEventListener("blur", (event) => {
  const target = event.target as HTMLInputElement;
  console.log("event", target.value);
});

//creating classes

/*class User {
    protected firstName: string;
    private lastName: string;
    readonly unchangeableName: string

   constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullname(): string {
        return this.firstName + " " + this.lastName;
    }
}

const user = new User("Monster", "lessons");*/

//Generic interfaces and functions

const addId = <T extends object>(obj: T) => {
  //the T is Generic which is used as a data type
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

interface UserInterface<T> {
  name: string;
  data: T;
}

const user: UserInterface<{ meta: string }> = {
  name: "jack",
  data: {
    meta: "foo",
  },
};

const user2: UserInterface<string[]> = {
  name: "John",
  data: ["foo", "bar", "baz"],
};

//const result = addId<UserInterface>(user);
//console.log("result", result);

//Enums

const statuses = {
  notStarted: 0,
  inProgress: 1,
  done: 2,
};

console.log(statuses.inProgress);

enum Status {
    notStarted,
    InProgress,
    Done
}

console.log(Status.InProgress)