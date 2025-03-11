// Variables
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var a = "1";
console.log("aaa", a);
var hello = "world";
// Functions
var getFullName = function (name, surname) {
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
var username = "alex";
var pageName = "1";
var errorMessage = null;
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
var doSomething = function () {
    console.log("doSomething");
};
//Any
var foo = "foo";
console.log(foo.bar());
//Never
var playSomething = function () {
    throw "never";
};
//Unknown
var vAny = 10;
var vUnknown = 10;
var s1 = vAny;
//let s2: string = vUnknown;
//Type Assertion
var s2 = vUnknown;
var pageNumber = "1";
var numericPageNumber = pageNumber;
//Working with the Dom
//working with input data
/*const someElement = document.querySelector('.foo') as HTMLInputElement;

console.log('someElement', someElement.value);*/
//adding listerners
var someElement = document.querySelector(".foo");
someElement.addEventListener("blur", function (event) {
    var target = event.target;
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
var addId = function (obj) {
    //the T is Generic which is used as a data type
    var id = Math.random().toString(16);
    return __assign(__assign({}, obj), { id: id });
};
var user = {
    name: "jack",
    data: {
        meta: "foo",
    },
};
var user2 = {
    name: "John",
    data: ["foo", "bar", "baz"],
};
//const result = addId<UserInterface>(user);
//console.log("result", result);
//Enums
var statuses = {
    notStarted: 0,
    inProgress: 1,
    done: 2,
};
console.log(statuses.inProgress);
var Status;
(function (Status) {
    Status[Status["notStarted"] = 0] = "notStarted";
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Done"] = 2] = "Done";
})(Status || (Status = {}));
console.log(Status.InProgress);
