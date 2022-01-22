class Person{
    constructor(name = "noname", age = 20, city = "", eye = "", language = ""){
        this.name = name;
        this.age = age;
        this.city = city;
        this.eyeColor = eye;
        this.language = language;
    }
    toJSON(){
        return{
            name: this.name,
            age: this.age,
            city: this.city,
            eyeColor: this.eyeColor,
            language: this.language,
        }
    }
    toString(){
        return JSON.stringify(this.toJSON(), null, 2);
        
    }
}

function people (name, last, age, city, eye){
    this.firstname = name,
    this.lastname = last,
    this.age = age,
    this.city = city,
    this.eyeColor = eye
}

module.exports = {Person, people}

